
// 타입 정의
export interface InviteCodeData {
    id: number;
    member_id: number;
    code: string;
    reg_date: string;
    exp_date: string;
    use_date: string;
    use_flag: boolean;
}

// 데이터 생성 함수
export function createData(
    id: number,
    member_id: number,
    code: string,
    reg_date: string,
    exp_date: string,
    use_date: string,
    use_flag: boolean,
): InviteCodeData {
    return {
        id,
        member_id,
        code,
        reg_date,
        exp_date,
        use_date,
        use_flag
    };
}