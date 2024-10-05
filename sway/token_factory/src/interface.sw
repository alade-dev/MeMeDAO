library;

abi TokenFactory {
    #[storage(write)]
    fn add_asset_id(asset_id: AssetId);
}

abi Info {

    #[storage(read)]
    fn get_asset_id(index: u64) -> Option<AssetId>;

    #[storage(read)]
    fn total_asset_ids() -> u64;
}