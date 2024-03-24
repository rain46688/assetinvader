import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssetTransactionData } from '@/redux/asset_transaction/AssetTransaction';

// 초기 상태 정의
const initialState: AssetTransactionData[] = [];

const assetTransactionSlice = createSlice({
    name: 'asset_transaction',
    initialState: initialState,
    reducers: {
        // setAsset 액션 생성 함수
        setAssetTransactionList: (state, action: PayloadAction<AssetTransactionData[]>) => {
            const list: AssetTransactionData[] = [];
            action.payload.forEach((item) => {
                list.push(item);
            });
            return list;
        },
        // 함수 추가 가능
    },
});

// 액션 및 리듀서 내보내기
export const { setAssetTransactionList } = assetTransactionSlice.actions;
export default assetTransactionSlice.reducer;
