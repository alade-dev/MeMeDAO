Here is a detailed README file for the Memetro project, incorporating the SRC20 and DAO contract codebases:

---

# ![Memetro Logo](./logo.png) Memetro

Welcome to **Memetro**, a decentralized platform focused on meme-based tokens and community-driven governance. Memetro offers a decentralized ecosystem where creators, enthusiasts, and community members can launch and govern meme tokens using DAO-based decision-making processes.

Website: [Memetro](https://memetro.netlify.app)

## Overview

Memetro is a meme token platform where users can **buy** and **sell** meme coins and participate in the governance of those tokens once the DAO is initialized. The platform aims to bridge meme culture and decentralized finance by allowing token holders to vote on key decisions about each token's future, such as liquidity provisioning, staking, burning tokens, and community promotion.

### Key Features:
- **Token Creation**: Users can create meme tokens, which will be available for purchase or sale.
- **Threshold-Based DAO Activation**: After the token reaches a certain value threshold, the DAO is initialized, and the community begins governing the token's future.
- **DAO Proposals**: Community members can create and vote on proposals that affect liquidity, staking, burning, and promotion.
- **Decentralized Governance**: Decision-making for the token's growth is in the hands of the community.

## Table of Contents

1. [Project Architecture](#project-architecture)
2. [SRC20 Contract Overview](#src20-contract-overview)
3. [DAO Contract Overview](#dao-contract-overview)
4. [How Memetro Works](#how-memetro-works)
5. [How to Contribute](#how-to-contribute)
6. [Getting Started](#getting-started)
7. [License](#license)

## Project Architecture

Memetro consists of two main components:

1. **SRC20 Contract**: This contract implements the token standards and handles core token functionalities like buying, selling, and managing balances.
2. **DAO Contract**: This contract handles the governance mechanisms, proposal creation, and voting processes for decisions about the token after the DAO is initialized.

Both contracts interact to form the complete lifecycle of a token from its creation to community-driven governance.

## SRC20 Contract Overview

The **SRC20** contract follows the basic structure of a standard fungible token with added functionality specific to the Memetro project:

- **Buying and Selling**: Users can purchase and sell meme tokens during the pre-DAO phase.
- **Liquidity Threshold**: Once a token reaches a predefined liquidity threshold, it triggers the initialization of the DAO for that token.
- **Asset Management**: Handles the balances of each user in relation to their holdings in meme tokens.

### Key Functions:
- `buy()`: Allows users to buy meme coins.
- `sell()`: Allows users to sell their meme tokens.
- `constructor(meme_coin_asset: AssetId)`: Initializes the contract with the governance token.
- `deposit()`: Deposits tokens to be used for governance voting.
- `withdraw(amount: u64)`: Withdraws tokens from the governance pool.

### Storage Variables:
- `coin_balances`: Tracks the balances of each user.
- `total_value`: Tracks the total value of meme coins bought before DAO initialization.
- `meme_coin_asset`: The governance token’s asset ID.

## DAO Contract Overview

Once a token reaches its threshold value, the DAO contract takes control and allows the community to make decisions. Key decisions for each token will be made via proposals, including:

- **Liquidity Provisioning**: Deciding how much of the token's value should be allocated to liquidity pools.
- **Token Burning**: Voting on whether to burn tokens to reduce supply.
- **Staking**: Determining the terms and structure of token staking.
- **Promotion**: Voting on community-driven marketing efforts.

### Key Functions:
- `create_proposal()`: Allows users to submit a proposal for a vote.
- `vote()`: Casts a vote for a proposal.
- `execute()`: Executes the proposal once it passes the required votes.
- `unlock_votes()`: Unlocks votes after a proposal execution.

### Governance Process:
Once the DAO is initialized:
1. Users can create proposals regarding any token-related governance.
2. Users with sufficient token holdings can vote on these proposals.
3. Once the votes pass the required threshold, the proposal is executed, and actions are taken based on the outcome.

## How Memetro Works

### Step-by-Step Process:

1. **Token Creation**: A user creates a new meme token using the SRC20 contract.
2. **Buying/Selling**: The community can buy and sell the meme token.
3. **Threshold Reached**: Once the token reaches the preset liquidity threshold, the DAO is initialized.
4. **DAO Governance**: The community starts governing the token. Proposals regarding liquidity, token burning, staking, and promotion are created and voted on.
5. **Proposal Execution**: Approved proposals are executed, and the token’s future is shaped by its holders.

## How to Contribute

We welcome contributions from developers and community members alike! Here’s how you can contribute:

- **Developers**: Fork the repo, submit pull requests, and help improve the smart contracts and frontend.
- **Community Members**: Participate in the governance process by creating proposals and voting on them.

## Getting Started

To start interacting with Memetro, follow these steps:

1. **Visit the website**: [Memetro](https://memetro.netlify.app)
2. **Create a Meme Token**: Use the SRC20 contract to create your token.
3. **Buy and Sell**: Participate in the token market.
4. **Join the DAO**: Once the token reaches the threshold, participate in the decentralized governance.

### Setting Up Your Local Environment

To run the project locally:
1. Clone the repository:
    ```bash
    git clone https://github.com/username/memetro.git
    cd memetro
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Compile the smart contracts:
    ```bash
    sway build
    ```
4. Deploy contracts to your preferred blockchain testnet.

## License

Memetro is released under the MIT License. See [LICENSE](./LICENSE) for more details.

---

This README provides a structured overview of the Memetro project. You can further edit this document to adjust for any additional features or upcoming changes to the project.