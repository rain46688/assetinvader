
// 타입 정의
export interface DividendData {
    id: number;
    asset_name: string;
    amount: number;
    occurrence_date: string,
}

// 데이터 생성 함수
export function createData(
    id: number,
    asset_name: string,
    amount: number,
    occurrence_date: string
): DividendData {
    return {
        id,
        asset_name,
        amount,
        occurrence_date,
    };
}