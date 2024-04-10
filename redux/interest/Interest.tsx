
// 타입 정의
export interface InterestData {
    id: number;
    asset_name: string;
    asset_acnt: string;
    amount: number;
    occurrence_date: string;
}

// 유효성 검사 타입 정의
export interface InterestValidation {
    id: number;
    asset_name: boolean;
    asset_acnt: boolean;
    amount: boolean;
    occurrence_date: boolean;
}

// 거래 내역 타입 정의
export interface AssetName {
    id: number;
    label: string;
    asset_acnt: string;
}

// 데이터 생성 함수
export function createData(
    id: number,
    asset_name: string,
    asset_acnt: string,
    amount: number,
    occurrence_date: string,
): InterestData {
    return {
        id,
        asset_name,
        asset_acnt,
        amount,
        occurrence_date,
    };
}