import { Src20, Memetro, MemetroFactory, TokenFactory } from "./sway-api";
import { getRandomB256 } from "fuels";
import { createAssetId } from "./utils/assetId";
import { bn, hexlify } from "fuels";

const contractId =
  "0x44c4813dc4f64a1dda8dc286bab9a05674328d32bf47191aaa92c850387a48ed";
const tokenFactoryId =
  "0x52d798e161ddff6856fa832491e55cd4e0ce64910130c5bdbbda98049530492b";

export function getTokenContract(wallet) {
  const tokenContract = new Src20(contractId, wallet);
  return tokenContract;
}

export function getTokenFactoryContract(wallet) {
  const testContract = new TokenFactory(tokenFactoryId, wallet);
  return testContract;
}

export function getDaoContract(contractId, wallet) {
  const daoContract = new Memetro(contractId, wallet);
  return daoContract;
}

export async function deployDaoContract(wallet, assetId) {
  // Initialize the contract factory
  const factory = new MemetroFactory(wallet);
  const factoryContract = getTokenFactoryContract(wallet);

  // Deploy the contract
  const { waitForResult, contractId, waitForTransactionId } = await factory.deploy();

  // Retrieve the transactionId
  const transactionId = await waitForTransactionId();

  // Await its deployment
  const { contract, transactionResult } = await waitForResult();
  console.log(contract, contractId, transactionId);
  await contract.functions.constructor(assetId).call();
  const hexId = hexlify(contractId);
  await factoryContract.functions.add_asset_ids(assetId, hexId).call();
}

export async function setToken(contract, formData) {
  let contractCalls = [];
  const subId = getRandomB256();
  const assetId = createAssetId(subId, contractId);
  console.log(subId, assetId);
  contractCalls.push(contract.functions.set_name(assetId, formData.name));
  contractCalls.push(contract.functions.set_symbol(assetId, formData.ticker));
  contractCalls.push(contract.functions.set_decimals(assetId, bn(9)));
  //contractCalls.push(contract.functions.mint(identityInput, subId, bn(20)));
  await contract.multiCall(contractCalls).call();
  console.log(assetId, formData);
  return assetId;
}

export async function initializeContract(contract) {
  console.log(contract.account.address.toB256());
  const addressInput = { bits: contract.account.address.toB256() };
  const identityInput = { Address: addressInput };
}

export async function buyToken(contractId, assetId, wallet, amount) {
  console.log("Minting")
  const daoContract = getDaoContract(contractId, wallet);
  // const tokenContract = getTokenContract(wallet);
  // ///const recipient = { type: 'Address', value: '0xb6e7b4c6ed737c8326630741a6482554b8864719d6abedd786a83ef27b878080' }; // IdentityInput
  // const addressInput = { bits: '0xb6e7b4c6ed737c8326630741a6482554b8864719d6abedd786a83ef27b878080' };
  // const identityInput = { Address: addressInput };
  // const subId = '0xcca9e957d11037a760b37583e50d27fbdea57af59921684f671607d74038e0fa';
  // //const amount = 1000;
  // const call = await tokenContract.functions.mint(identityInput, subId, amount).call();
  // await call.waitForResult();

  try {
    // Call the buy function on the contract
    console.log(assetId.bits, amount)
    const balance = await wallet.getBalance(wallet.provider.getBaseAssetId());
    console.log('Wallet balance:', balance.toString());

    const call = await daoContract.functions
      .buy(assetId) // Pass the asset ID if needed
      .callParams({
        forward: [amount, assetId.bits],
      })
      .txParams({ variableOutputs: 1 })
      .call();

    await call.waitForResult();
    console.log("Token purchase successful");
  } catch (error) {
    console.error("Error purchasing token:", error);
  }
}

export async function getTokens(wallet) {
  const factoryContract = getTokenFactoryContract(wallet);
  const tokenContract = getTokenContract(wallet);
  const totalTokens = await factoryContract.functions.total_asset_pairs().get();
  const tokens = [];

  for (let i = 0; i < totalTokens.value.toNumber(); i++) {
    const assetIdResponse = await factoryContract.functions
      .get_asset_ids(i)
      .get();
    const token_att = await tokenContract.functions
      .get_asset_attributes(assetIdResponse.value[0])
      .get();

    const tokenInfo = {
      name: token_att.value[0],
      ticker: token_att.value[1],
      assertID: assetIdResponse.value[0],
      contractId: assetIdResponse.value[1],
    };
    tokens.push(tokenInfo);
  }

  return tokens;
}
