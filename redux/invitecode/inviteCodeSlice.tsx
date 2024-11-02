import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InviteCodeData } from '@/redux/invitecode/InviteCode';

// 초기 상태 정의
const initialState: InviteCodeData[] = [];

const inviteCodeSlice = createSlice({
    name: 'inviteCode',
    initialState: initialState,
    reducers: {
        // setInviteCodeList 액션 생성 함수
        setInviteCodeList: (state, action: PayloadAction<InviteCodeData[]>) => {
            const list: InviteCodeData[] = [];
            action.payload.forEach((item) => {
                list.push(item);
            });
            return list;
        },
        // 함수 추가 가능
    },
});

// 액션 및 리듀서 내보내기
export const { setInviteCodeList } = inviteCodeSlice.actions;
export default inviteCodeSlice.reducer;
