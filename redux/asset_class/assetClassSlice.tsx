import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssetClassData } from '@/redux/asset_class/AssetClass';

// 초기 상태 정의
const initialState: AssetClassData[] = [];

const assetClassSlice = createSlice({
    name: 'asset_class',
    initialState: initialState,
    reducers: {
        // setAssetClassList 액션 생성 함수
        setAssetClassList: (state, action: PayloadAction<AssetClassData[]>) => {
            const list: AssetClassData[] = [];
            action.payload.forEach((item) => {
                list.push(item);
            });
            return list;
        },
        // 함수 추가 가능
    },
});

// 액션 및 리듀서 내보내기
export const { setAssetClassList } = assetClassSlice.actions;
export default assetClassSlice.reducer;
