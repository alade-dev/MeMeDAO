contract;

mod interface;

use std::storage::storage_map::*;
use std::hash::Hash;
use ::interface::{TokenFactory, Info};

storage {
    asset_pairs: StorageMap<u64, (AssetId, AssetId)> = StorageMap {},
    pair_count: u64 = 0,
}

impl TokenFactory for Contract {

    #[storage(write)]
    fn add_asset_ids(asset_id1: AssetId, asset_id2: AssetId) {
        let current_count = storage.pair_count.try_read().unwrap_or(0);
        storage.asset_pairs.insert(current_count, (asset_id1, asset_id2));
        storage.pair_count.write(current_count + 1);
    }
}

impl Info for Contract {

    #[storage(read)]
    fn get_asset_ids(index: u64) -> Option<(AssetId, AssetId)> {
        storage.asset_pairs.get(index).try_read()
    }

    #[storage(read)]
    fn total_asset_pairs() -> u64 {
        storage.pair_count.try_read().unwrap_or(0)
    }
}
