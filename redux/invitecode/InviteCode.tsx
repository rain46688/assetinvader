
// 타입 정의
export interface InviteCodeData {
    id: number;
    member_id: number;
    user_id: string;
    code: string;
    reg_date: string;
    exp_date: string;
    use_date: string;
    use_flag: number;
}

// 데이터 생성 함수
export function createData(
    id: number,
    member_id: number,
    user_id: string,
    code: string,
    reg_date: string,
    exp_date: string,
    use_date: string,
    use_flag: number,
): InviteCodeData {
    return {
        id,
        member_id,
        user_id,
        code,
        reg_date,
        exp_date,
        use_date,
        use_flag
    };
}