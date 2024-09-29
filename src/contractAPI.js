import { Src20, Src20Factory } from "../../sway-api";
import { getRandomB256 } from "fuels";
import { createAssetId, stdString, createString } from "./utils/assetId";
import { bn } from "fuels";

const contractId =
  "0x97e62874b077a56ba536bfbd8223018e4cc96609e1af852f5177934d59b854b1";
//const contractId = '0xeb4c62a8a0068f2a9686d024e883c67f6cac19a389aef3946fd612d9beb7021b';

export function getTokenContract(wallet) {
  const testContract = new Src20(contractId, wallet);
  return testContract;
}

export async function deployTokenContract(wallet) {
  // Initialize the contract factory
  const factory = new Src20Factory(wallet);

  // Deploy the contract
  const { waitForResult, contractId, waitForTransactionId } =
    await factory.deploy();

  // Retrieve the transactionId
  const transactionId = await waitForTransactionId();

  // Await its deployment
  const { contract, transactionResult } = await waitForResult();
  console.log(contract, contractId, transactionId, transactionResult);
}

export async function setToken(contract) {
  let contractCalls = [];
  const subId = getRandomB256();
  const assetId = createAssetId(subId, contractId);
  console.log(subId, assetId);
  console.log(contract.account.address.toB256());
  const addressInput = { bits: contract.account.address.toB256() };
  const identityInput = { Address: addressInput };
  console.log(createString("TonKats"));
  const name = "MyToken";
  const symbol = "MTK";
  // contractCalls.push(contract.functions.set_name(assetId, createString(name)));
  // contractCalls.push(contract.functions.set_symbol(assetId, createString(symbol)));
  contractCalls.push(contract.functions.set_decimals(assetId, bn(9)));
  contractCalls.push(contract.functions.mint(identityInput, subId, bn(20)));
  await contract.multiCall(contractCalls).call();
  // await contract.functions.set_symbol(assetId, createString(symbol)).call()
  //await contract.functions.set_decimals(assetId, bn(9)).call()
  //await contract.functions.mint(identityInput, subId, bn(10)).call()
}
