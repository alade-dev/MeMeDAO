import { Src20, Memetro, MemetroFactory, TokenFactory } from "./sway-api";
import { getRandomB256 } from "fuels";
import { createAssetId } from "./utils/assetId";
import { bn, hexlify } from "fuels";

const contractId = "0x44c4813dc4f64a1dda8dc286bab9a05674328d32bf47191aaa92c850387a48ed";
const tokenFactoryId = "0x52d798e161ddff6856fa832491e55cd4e0ce64910130c5bdbbda98049530492b"

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
  const { waitForResult, contractId, waitForTransactionId } =
    await factory.deploy();

  // Retrieve the transactionId
  const transactionId = await waitForTransactionId();

  // Await its deployment
  const { contract, transactionResult } = await waitForResult();
  console.log(contract, contractId, transactionId);
  await contract.functions.constructor(assetId).call();
  const hexId = hexlify(contractId)
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

export async function buyToken(contractId, wallet, amount) {
    const daoContract = getDaoContract(contractId, wallet);
    const tokenContract = getTokenContract(wallet);
    const baseAssetId = daoContract.provider.getBaseAssetId();
    console.log(await daoContract.functions.governance_asset_id().get())
    const addressInput = { bits: tokenContract.account.address.toB256() };
    const identityInput = { Address: addressInput };
    await daoContract.functions.buy()
        .callParams({
            forward: [amount, baseAssetId],
        })
        .call();
    await tokenContract.functions.mint(identityInput, '0xcaadc5c961296450832e1f151eed1da690f11ab9ea5241d8c8c788284ccc16d0', bn(amount*100000000)).call()

}


export async function getTokens(wallet) {
  const factoryContract = getTokenFactoryContract(wallet);
  const tokenContract = getTokenContract(wallet);
  const totalTokens = await factoryContract.functions.total_asset_pairs().get();
  const tokens = [];

  for (let i = 0; i < totalTokens.value.toNumber(); i++) {
    const assetIdResponse = await factoryContract.functions.get_asset_ids(i).get();
    const token_att = await tokenContract.functions.get_asset_attributes(assetIdResponse.value[0]).get();
    tokens.push([assetIdResponse.value, token_att.value]);
  }
  console.log(tokens)
  return tokens;
}
