export interface AssetClassData {
    id: number;
    member_id: number;
    asset_type: string;
    asset_big_class: string;
    asset_mid_class: string;
    asset_acnt: string;
    asset_name: string;
    amount: number;
    earning_rate: number;
    reg_date: string;
    mod_date: string;
    use_flag: number;
}

export function createData(
    id: number,
    member_id: number,
    asset_type: string,
    asset_big_class: string,
    asset_mid_class: string,
    asset_acnt: string,
    asset_name: string,
    amount: number,
    earning_rate: number,
    reg_date: string,
    mod_date: string,
    use_flag: number,
): AssetClassData {
    return {
        id,
        member_id,
        asset_type,
        asset_big_class,
        asset_mid_class,
        asset_acnt,
        asset_name,
        amount,
        earning_rate,
        reg_date,
        mod_date,
        use_flag
    };
}