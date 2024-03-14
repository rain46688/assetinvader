import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 타입 정의
type UserState = {
    user_id: string;
    password: string;
}

// 초기 상태 정의
const initialState: UserState = {
    user_id: "",
    password: "",
};

// createSlice를 이용한 slice 생성
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        // setUser 액션 생성 함수
        setUser: (state, action: PayloadAction<{ user_id: string, password: string }>) => {
            state.user_id = action.payload.user_id;
            state.password = action.payload.password;
        },
        // 함수 추가 가능
    },
});

// 액션 및 리듀서 내보내기
// 위에 함수 추가하면 밑에 넣어줘야됨
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
