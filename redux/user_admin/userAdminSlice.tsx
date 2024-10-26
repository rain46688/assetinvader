import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAdminData } from '@/redux/user_admin/UserAdmin';

// 초기 상태 정의
const initialState: UserAdminData[] = [];

const userAdminSlice = createSlice({
    name: 'userAdmin',
    initialState: initialState,
    reducers: {
        // setUserAdminList 액션 생성 함수
        setUserAdminList: (state, action: PayloadAction<UserAdminData[]>) => {
            const list: UserAdminData[] = [];
            action.payload.forEach((item) => {
                list.push(item);
            });
            return list;
        },
        // 함수 추가 가능
    },
});

// 액션 및 리듀서 내보내기
export const { setUserAdminList } = userAdminSlice.actions;
export default userAdminSlice.reducer;
