import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 타입 정의
type LayoutState = {
    isopened: Boolean;
    isAssetOpened: Boolean;
    isEarningOpened: Boolean;
    isDividendOpened: Boolean;
    isSpendingOpened: Boolean;
}

// 초기 상태 정의
const initialState: LayoutState = {
    isopened: true,
    isAssetOpened: false,
    isEarningOpened: false,
    isDividendOpened: false,
    isSpendingOpened: false,
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
        // setAssetOpened 액션 생성 함수
        setAssetOpened: (state, action: PayloadAction<{ isAssetOpened: Boolean }>) => {
            state.isAssetOpened = action.payload.isAssetOpened;
        },
        // setEarningOpened 액션 생성 함수
        setEarningOpened: (state, action: PayloadAction<{ isEarningOpened: Boolean }>) => {
            state.isEarningOpened = action.payload.isEarningOpened;
        },
        // setDividendOpened 액션 생성 함수
        setDividendOpened: (state, action: PayloadAction<{ isDividendOpened: Boolean }>) => {
            state.isDividendOpened = action.payload.isDividendOpened;
        },
        // setSpendingOpened 액션 생성 함수
        setSpendingOpened: (state, action: PayloadAction<{ isSpendingOpened: Boolean }>) => {
            state.isSpendingOpened = action.payload.isSpendingOpened;
        },
    },
});

// 액션 및 리듀서 내보내기
// 위에 함수 추가하면 밑에 넣어줘야됨
export const { setOpened, setAssetOpened, setEarningOpened, setDividendOpened, setSpendingOpened } = layoutSlice.actions;
export default layoutSlice.reducer;
