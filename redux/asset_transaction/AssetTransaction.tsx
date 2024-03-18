
// 타입 정의
export interface AssetTransactionData {
    id: number;
    asset_name: string;
    asset_acnt: string;
    trns_type: string;
    amount: number;
    trns_date: string;
}

// 유효성 검사 타입 정의
// export interface AssetTypeValidation {
//     id: number;
//     asset_acnt: boolean;
//     asset_name: boolean;
//     amount: boolean;
//     earning_rate: boolean;
// }

// 데이터 생성 함수
export function createData(
    id: number,
    asset_name: string,
    asset_acnt: string,
    trns_type: string,
    amount: number,
    trns_date: string,
): AssetTransactionData {
    return {
        id,
        asset_name,
        asset_acnt,
        trns_type,
        amount,
        trns_date,
    };
}