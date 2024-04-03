
// 타입 정의
export interface CashFlowData {
    id: number;
    asset_name: string;
    jan: number;
    feb: number;
    mar: number;
    apr: number;
    may: number;
    jun: number;
    jul: number;
    aug: number;
    sep: number;
    oct: number;
    nov: number;
    dec: number;
}

// 유효성 검사 타입 정의
export interface CashFlowValidation {
    id: number;
    asset_name: boolean;
    jan: boolean;
    feb: boolean;
    mar: boolean;
    apr: boolean;
    may: boolean;
    jun: boolean;
    jul: boolean;
    aug: boolean;
    sep: boolean;
    oct: boolean;
    nov: boolean;
    dec: boolean;
}

// 데이터 생성 함수
export function createData(
    id: number,
    asset_name: string,
    jan: number,
    feb: number,
    mar: number,
    apr: number,
    may: number,
    jun: number,
    jul: number,
    aug: number,
    sep: number,
    oct: number,
    nov: number,
    dec: number,
): CashFlowData {
    return {
        id,
        asset_name,
        jan,
        feb,
        mar,
        apr,
        may,
        jun,
        jul,
        aug,
        sep,
        oct,
        nov,
        dec,
    };
}