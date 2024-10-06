import { Src20, Memetro, MemetroFactory, TokenFactory } from "./sway-api";
import { getRandomB256 } from "fuels";
import { createAssetId } from "./utils/assetId";
import { bn } from "fuels";

const contractId = "0x919980b4435b9320c63577c7ccde21a2af18f0bf5d7c30c833aed7a07f9485b4";
const tokenFactoryId = "0x7358a08726de4dfa936c81a1993f56acc1b7e5fb6934245da2eb87054ec569bf"

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

  // Deploy the contract
  const { waitForResult, contractId, waitForTransactionId } =
    await factory.deploy();

  // Retrieve the transactionId
  const transactionId = await waitForTransactionId();

  // Await its deployment
  const { contract, transactionResult } = await waitForResult();
  console.log(contract, contractId, transactionId, transactionResult);
  await contract.functions.constructor(assetId).call();
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

export async function getTokens() {
  const tokenContract = getTokenContract();
  const factoryContract = getTokenFactoryContract();
  const tokens = await tokenContract.functions.total_assets.get();
}