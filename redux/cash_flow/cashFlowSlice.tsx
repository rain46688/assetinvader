import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CashFlowData } from '@/redux/cash_flow/CashFlow';

// 초기 상태 정의
const initialState: CashFlowData[] = [];

const cashFlowSlice = createSlice({
    name: 'cash_flow',
    initialState: initialState,
    reducers: {
        // setCashFlowList 액션 생성 함수
        setCashFlowList: (state, action: PayloadAction<CashFlowData[]>) => {
            const list: CashFlowData[] = [];
            action.payload.forEach((item) => {
                list.push(item);
            });
            return list;
        },
        // 함수 추가 가능
    },
});

// 액션 및 리듀서 내보내기
export const { setCashFlowList } = cashFlowSlice.actions;
export default cashFlowSlice.reducer;
