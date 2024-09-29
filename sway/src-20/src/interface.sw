library;

use std::option::Option;
use std::{hash::Hash, storage::storage_string::*, string::String,};

abi Constructor {
    #[storage(read, write)]
    fn constructor(owner: Identity);

}

abi Set_attributes {
    #[storage(write)]
    fn set_asset_attributes(asset: AssetId, name: String, symbol: String, decimals: u8);
}