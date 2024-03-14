import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 타입 정의
type LayoutState = {
    isopened: Boolean;
}

// 초기 상태 정의
const initialState: LayoutState = {
    isopened: true,
};

// createSlice를 이용한 slice 생성
const layoutSlice = createSlice({
    name: 'layout',
    initialState: initialState,
    reducers: {
        // setOpened 액션 생성 함수
        setOpened: (state, action: PayloadAction<{ isopened: Boolean }>) => {
            state.isopened = action.payload.isopened;
        },
        // 함수 추가 가능
    },
});

// 액션 및 리듀서 내보내기
// 위에 함수 추가하면 밑에 넣어줘야됨
export const { setOpened } = layoutSlice.actions;
export default layoutSlice.reducer;
