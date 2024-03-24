
// 타입 정의
export interface SpendingData {
    id: number;
    spnd_date: string;
    spnd_type: string;
    description: string;
    amount: number;
}

// 유효성 검사 타입 정의
export interface SpendingValidation {
    id: number;
    spnd_date: boolean;
    spnd_type: boolean;
    description: boolean;
    amount: boolean;
}

// 데이터 생성 함수
export function createData(
    id: number,
    spnd_date: string,
    spnd_type: string,
    description: string,
    amount: number,
): SpendingData {
    return {
        id,
        spnd_date,
        spnd_type,
        description,
        amount,
    };
}