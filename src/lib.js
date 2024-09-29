export const CURRENT_ENVIRONMENT = process.env.VITE_DAPP_ENVIRONMENT

// The node URL is determined by the current environment too.
export const NODE_URL ='https://testnet.fuel.network/v1/graphql';

export const TESTNET_FAUCET_LINK = 'https://faucet-testnet.fuel.network/';

export const FAUCET_LINK = TESTNET_FAUCET_LINK;

export const FAUCET_PRIVATE_KEY = '0x01';

export const DOCS_URL = 'https://docs.fuel.network';

export const TESTNET_CONTRACT_ID = process.env.VITE_TESTNET_CONTRACT_ID;
