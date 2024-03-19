
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
export interface AssetTransactionValidation {
    id: number;
    asset_name: boolean;
    asset_acnt: boolean;
    trns_type: boolean;
    amount: boolean;
    trns_date: boolean;
}

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