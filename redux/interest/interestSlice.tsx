import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InterestData } from '@/redux/interest/Interest';

// 초기 상태 정의
const initialState: InterestData[] = [];

const interestSlice = createSlice({
    name: 'interest',
    initialState: initialState,
    reducers: {
        // setInterestList 액션 생성 함수
        setInterestList: (state, action: PayloadAction<InterestData[]>) => {
            const list: InterestData[] = [];
            action.payload.forEach((item) => {
                list.push(item);
            });
            return list;
        },
        // 함수 추가 가능
    },
});

// 액션 및 리듀서 내보내기
export const { setInterestList } = interestSlice.actions;
export default interestSlice.reducer;
