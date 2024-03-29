import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DividendData } from './Dividend';

// 초기 상태 정의
const initialState: DividendData[] = [];

const dividendSlice = createSlice({
    name: 'dividend',
    initialState: initialState,
    reducers: {
        // setDividendList 액션 생성 함수
        setDividendList: (state, action: PayloadAction<DividendData[]>) => {
            const list: DividendData[] = [];
            action.payload.forEach((item) => {
                list.push(item);
            });
            return list;
        },
        // 함수 추가 가능
    },
});

// 액션 및 리듀서 내보내기
export const { setDividendList } = dividendSlice.actions;
export default dividendSlice.reducer;
