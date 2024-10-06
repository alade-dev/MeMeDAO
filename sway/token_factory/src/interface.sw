library;

abi TokenFactory {
    #[storage(write)]
    fn add_asset_ids(asset_id1: AssetId, asset_id2: b256);
}

abi Info {
    #[storage(read)]
    fn get_asset_ids(index: u64) -> Option<(AssetId, b256)>;

    #[storage(read)]
    fn total_asset_pairs() -> u64;
}
