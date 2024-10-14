contract;

mod data_structures;
mod errors;
mod events;
mod interface;
mod utils;

use std::{
    asset::{
        mint, 
        transfer
    },
    auth::msg_sender,
    block::height,
    call_frames::msg_asset_id,
    context::{
        msg_amount,
        this_balance,
    },
    hash::Hash,
};

use ::data_structures::{Proposal, ProposalInfo, State, Votes};
use ::errors::{CreationError, InitializationError, ProposalError, UserError};
use ::events::{
    CreateProposalEvent,
    DepositEvent,
    ExecuteEvent,
    InitializeEvent,
    ThresholdReachedEvent,
    UnlockVotesEvent,
    VoteEvent,
    WithdrawEvent,
};
use ::interface::{Memetro, Info};
use ::utils::validate_id;

storage {
    /// The amount of governance coins a user has deposited
    coin_balances: StorageMap<Identity, u64> = StorageMap {},
    /// Information describing a proposal created via create_proposal(...)
    proposals: StorageMap<u64, ProposalInfo> = StorageMap {},
    /// Number of created proposals
    /// Used to check the validity of a proposal id
    /// Used as a unique identifier when creating proposals
    proposal_count: u64 = 0,
    /// The initialization state of the contract.
    state: State = State::NotInitialized,
    /// AssetId of the governance asset
    meme_coin_asset: AssetId = AssetId::zero(),
    /// The amount of votes a user has used on a proposal
    votes: StorageMap<(Identity, u64), Votes> = StorageMap {},
    /// Threshold value for DAO initialization (e.g., liquidity or token holders)
    threshold: u64 = 1_000_000,
    /// Total value (e.g., liquidity) before DAO initialization
    total_value: u64 = 0,
}

impl Memetro for Contract {
    #[storage(read, write)]
    fn constructor(meme_coin_asset: AssetId) {
        require(
            storage
                .state
                .read() == State::NotInitialized,
            InitializationError::CannotReinitialize,
        );

        storage.meme_coin_asset.write(meme_coin_asset);
        storage.state.write(State::NotInitialized);

        log(InitializeEvent {
            author: msg_sender().unwrap(),
            meme_coin_asset,
        })
    }

    /// Buy function: Allows users to buy meme coins before DAO initialization
    #[payable]
    #[storage(read, write)]
    fn buy(meme_coin_asset: AssetId) {
        let buyer = msg_sender().unwrap();
        let asset_id = msg_asset_id();
        let amount = msg_amount();
        let base_asset = AssetId::base();

        storage.meme_coin_asset.write(meme_coin_asset);
        
        require(base_asset == asset_id, UserError::IncorrectAssetSent);
        require(amount > 0, UserError::AmountCannotBeZero);

        // Mint the purchased amount of meme_coin_asset
        let sub_id = SubId::zero();
        mint(sub_id, amount);

        // Transfer the minted tokens to the buyer
        transfer(buyer, meme_coin_asset, amount);

        storage
            .coin_balances
            .insert(buyer, amount + storage.coin_balances.get(buyer).try_read().unwrap_or(0));

        storage.total_value.write(storage.total_value.read() + amount);

        // Check if threshold is met for DAO initialization
        if storage.total_value.read() >= storage.threshold.read() {
            storage.state.write(State::Initialized);
            log(ThresholdReachedEvent { buyer, total_value: storage.total_value.read() });
        }
    }

    /// Sell function: Allows users to sell meme coins before DAO initialization
    #[storage(read, write)]
    fn sell(amount: u64) {
        require(storage.state.read() == State::NotInitialized, InitializationError::ContractNotInitialized);
        let seller = msg_sender().unwrap();
        let current_balance = storage.coin_balances.get(seller).try_read().unwrap_or(0);
        require(amount <= current_balance, UserError::InsufficientBalance);

        // Update balance and transfer funds back to the seller
        storage.coin_balances.insert(seller, current_balance - amount);
        transfer(seller, storage.meme_coin_asset.read(), amount);
    }

    #[storage(read, write)]
    fn create_proposal(
        acceptance_percentage: u64,
        duration: u64,
        proposal_transaction: Proposal,
    ) {
        require(0 < duration, CreationError::DurationCannotBeZero);
        require(
            0 < acceptance_percentage && acceptance_percentage <= 100,
            CreationError::InvalidAcceptancePercentage,
        );

        let author = msg_sender().unwrap();
        let proposal = ProposalInfo::new(
            acceptance_percentage,
            author,
            duration,
            proposal_transaction,
        );
        storage
            .proposals
            .insert(storage.proposal_count.read(), proposal);
        storage
            .proposal_count
            .write(storage.proposal_count.read() + 1);

        log(CreateProposalEvent {
            proposal_info: proposal,
            id: storage.proposal_count.read() - 1,
        });
    }

    #[payable]
    #[storage(read, write)]
    fn deposit() {
        require(
            storage
                .state
                .read() == State::Initialized,
            InitializationError::ContractNotInitialized,
        );
        require(
            storage
                .meme_coin_asset
                .read() == msg_asset_id(),
            UserError::IncorrectAssetSent,
        );
        require(0 < msg_amount(), UserError::AmountCannotBeZero);

        let user = msg_sender().unwrap();

        storage
            .coin_balances
            .insert(
                user,
                msg_amount() + storage
                    .coin_balances
                    .get(user)
                    .try_read()
                    .unwrap_or(0),
            );

        log(DepositEvent {
            amount: msg_amount(),
            user,
        });
    }

    #[storage(read, write)]
    fn withdraw(amount: u64) {
        require(0 < amount, UserError::AmountCannotBeZero);
        let user = msg_sender().unwrap();

        let prev_balance = storage.coin_balances.get(user).try_read().unwrap_or(0);
        require(amount <= prev_balance, UserError::InsufficientBalance);

        storage.coin_balances.insert(user, prev_balance - amount);

        // Transfer the asset back to the user
        transfer(user, storage.meme_coin_asset.read(), amount);

        log(WithdrawEvent { amount, user })
    }

    #[storage(read, write)]
    fn vote(approve: bool, proposal_id: u64, vote_amount: u64) {
        validate_id(proposal_id, storage.proposal_count.read());
        require(0 < vote_amount, UserError::VoteAmountCannotBeZero);

        let mut proposal = storage.proposals.get(proposal_id).try_read().unwrap();
        require(
            proposal
                .deadline >= height()
                .as_u64(),
            ProposalError::ProposalExpired,
        );

        let user = msg_sender().unwrap();
        let user_balance = storage.coin_balances.get(user).try_read().unwrap_or(0);

        require(vote_amount <= user_balance, UserError::InsufficientBalance);

        let mut votes = storage.votes.get((user, proposal_id)).try_read().unwrap_or(Votes::default());
        if approve {
            proposal.yes_votes += vote_amount;
            votes.yes_votes += vote_amount;
        } else {
            proposal.no_votes += vote_amount;
            votes.no_votes += vote_amount;
        };

        storage.coin_balances.insert(user, user_balance - vote_amount);
        storage.votes.insert((user, proposal_id), votes);
        storage.proposals.insert(proposal_id, proposal);

        log(VoteEvent {
            id: proposal_id,
            user,
            vote_amount,
        });
    }

    #[storage(read, write)]
    fn execute(proposal_id: u64) {
        validate_id(proposal_id, storage.proposal_count.read());

        let mut proposal = storage.proposals.get(proposal_id).try_read().unwrap();
        require(!proposal.executed, ProposalError::ProposalExecuted);
        require(
            proposal
                .deadline < height()
                .as_u64(),
            ProposalError::ProposalStillActive,
        );

        let acceptance_percentage = proposal.yes_votes * 100 / (proposal.yes_votes + proposal.no_votes);
        require(
            proposal
                .acceptance_percentage <= acceptance_percentage,
            ProposalError::InsufficientApprovals,
        );

        proposal.executed = true;
        storage.proposals.insert(proposal_id, proposal);

        asm(
            call_data: proposal.proposal_transaction.call_data,
            amount: proposal.proposal_transaction.amount,
            asset: proposal.proposal_transaction.asset,
            gas: proposal.proposal_transaction.gas,
        ) {
            call call_data amount asset gas;
        }

        // Users can now convert their votes back into assets
        log(ExecuteEvent {
            user: msg_sender().unwrap(),
            acceptance_percentage,
            id: proposal_id,
        })
    }

    #[storage(read, write)]
    fn unlock_votes(proposal_id: u64) {
        validate_id(proposal_id, storage.proposal_count.read());

        let proposal = storage.proposals.get(proposal_id).try_read().unwrap();
        require(
            proposal
                .deadline < height()
                .as_u64(),
            ProposalError::ProposalStillActive,
        );

        let user = msg_sender().unwrap();
        let votes = storage.votes.get((user, proposal_id)).try_read().unwrap_or(Votes::default());

        storage.votes.insert((user, proposal_id), Votes::default());

        let vote_amount = votes.yes_votes + votes.no_votes;
        storage
            .coin_balances
            .insert(
                user,
                storage
                    .coin_balances
                    .get(user)
                    .try_read()
                    .unwrap_or(0) + vote_amount,
            );

        log(UnlockVotesEvent {
            id: proposal_id,
            user,
            vote_amount,
        });
    }
}

impl Info for Contract {
    #[storage(read)]
    fn balance() -> u64 {
        this_balance(storage.meme_coin_asset.read())
    }

    #[storage(read)]
    fn user_balance(user: Identity) -> u64 {
        storage.coin_balances.get(user).try_read().unwrap_or(0)
    }

    #[storage(read)]
    fn user_votes(proposal_id: u64, user: Identity) -> Votes {
        validate_id(proposal_id, storage.proposal_count.read());
        storage.votes.get((user, proposal_id)).try_read().unwrap_or(Votes::default())
    }

    #[storage(read)]
    fn proposal(proposal_id: u64) -> ProposalInfo {
        validate_id(proposal_id, storage.proposal_count.read());
        storage.proposals.get(proposal_id).try_read().unwrap()
    }

    #[storage(read)]
    fn governance_asset_id() -> AssetId {
        require(
            storage
                .state
                .read() == State::Initialized,
            InitializationError::ContractNotInitialized,
        );
        storage.meme_coin_asset.read()
    }

    #[storage(read)]
    fn proposal_count() -> u64 {
        storage.proposal_count.read()
    }
}
