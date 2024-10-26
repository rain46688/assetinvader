
// 타입 정의
export interface UserAdminData {
    id: number;
    user_id: string;
    role: number;
    locked: number;
    reg_date: string;
    mod_date: string;
    visit_date: string;
    accept_date: string;
}

// 데이터 생성 함수
export function createData(
    id: number,
    user_id: string,
    role: number,
    locked: number,
    reg_date: string,
    mod_date: string,
    visit_date: string,
    accept_date: string
): UserAdminData {
    return {
        id,
        user_id,
        role,
        locked,
        reg_date,
        mod_date,
        visit_date,
        accept_date
    };
}