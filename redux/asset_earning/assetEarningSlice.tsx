import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssetEarningData } from '@/redux/asset_earning/AssetEarning';

// 초기 상태 정의
const initialState: AssetEarningData[] = [];

const assetEarningSlice = createSlice({
    name: 'asset_earning',
    initialState: initialState,
    reducers: {
        // setAssetEarningList 액션 생성 함수
        setAssetEarningList: (state, action: PayloadAction<AssetEarningData[]>) => {
            const list: AssetEarningData[] = [];
            action.payload.forEach((item) => {
                list.push(item);
            });
            return list;
        },
        // 함수 추가 가능
    },
});

// 액션 및 리듀서 내보내기
export const { setAssetEarningList } = assetEarningSlice.actions;
export default assetEarningSlice.reducer;
