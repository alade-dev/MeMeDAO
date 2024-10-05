import { Src20, Memetro, MemetroFactory } from "./sway-api";
import { getRandomB256 } from "fuels";
import { createAssetId } from "./utils/assetId";
import { bn } from "fuels";

const contractId = "0x5b2d725584d9d22489a525fc432bae17137e2740e67241dadc5998636ae9e7f6";
//const contractId = '0xeb4c62a8a0068f2a9686d024e883c67f6cac19a389aef3946fd612d9beb7021b';

export function getTokenContract(wallet) {
  const testContract = new Src20(contractId, wallet);
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
//0x8dceb621baf9b06d6df8f7160e3c20b5ae2bf0b933920a92e78ee8a546939588 {bits: '0xae27e13c21cd096f7ff809af576fe9895338106f377b7032a435ae0916f447ca'} 0xbdd07a8f06b2191a2e9e670d94fc112a2ada7a3d38764954ed7891ed1a18c7dc' '0xad8879ed88e19382468d15c9d6dfc5e9c1697aa48de6094e459a820a14b1284a
//0xcaadc5c961296450832e1f151eed1da690f11ab9ea5241d8c8c788284ccc16d0 {bits: '0xf399e5a19cb271c733db215f6d44328c6c58d76eabfb97ab243799442e2f4b1c'} 0x7e38cb145219c4b6ea97aa5647fa35351d183e045cb3386da374f57983a56dd3