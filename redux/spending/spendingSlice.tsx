import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SpendingData } from '@/redux/spending/Spending';

// 초기 상태 정의
const initialState: SpendingData[] = [];

const spendingSlice = createSlice({
    name: 'spending',
    initialState: initialState,
    reducers: {
        // setAsset 액션 생성 함수
        setSpendingList: (state, action: PayloadAction<SpendingData[]>) => {
            const list: SpendingData[] = [];
            action.payload.forEach((item) => {
                list.push(item);
            });
            return list;
        },
        // 함수 추가 가능
    },
});

// 액션 및 리듀서 내보내기
export const { setSpendingList } = spendingSlice.actions;
export default spendingSlice.reducer;
