
// 타입 정의
export interface AssetTypeData {
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

// 유효성 검사 타입 정의
export interface AssetTypeValidation {
    id: number;
    asset_acnt: boolean;
    asset_name: boolean;
    amount: boolean;
    earning_rate: boolean;
}

// 데이터 생성 함수
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
): AssetTypeData {
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