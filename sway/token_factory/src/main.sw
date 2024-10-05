contract;

mod interface;

use std::storage::storage_vec::*;
use std::hash::Hash;
use ::interface::{TokenFactory, Info};

storage {
    asset_ids: StorageVec<AssetId> = StorageVec {},
}

impl TokenFactory for Contract {

    #[storage(write)]
    fn add_asset_id(asset_id: AssetId) {
        storage.asset_ids.push(asset_id);
    }
}

impl Info for Contract {

    #[storage(read)]
    fn get_asset_id(index: u64) -> Option<AssetId> {
        match storage.asset_ids.get(index) {
            Some(key) => key.try_read(),
            None => None,
        }
    }

    #[storage(read)]
    fn total_asset_ids() -> u64 {
        storage.asset_ids.len()
    }
}