import { TestContract } from "./sway-api";

export function getTokenContract(wallet) {
    const testContract = new TestContract(contractId, wallet);
    return testContract
}