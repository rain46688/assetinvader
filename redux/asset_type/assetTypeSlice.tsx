import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssetTypeData } from '@/redux/asset_type/AssetType';

// 초기 상태 정의
const initialState: AssetTypeData[] = [];

const assetTypeSlice = createSlice({
    name: 'asset_type',
    initialState: initialState,
    reducers: {
        // setAsset 액션 생성 함수
        setAssetTypeList: (state, action: PayloadAction<AssetTypeData[]>) => {
            const list: AssetTypeData[] = [];
            action.payload.forEach((item) => {
                list.push(item);
            });
            return list;
        },
        // 함수 추가 가능
    },
});

// 액션 및 리듀서 내보내기
export const { setAssetTypeList } = assetTypeSlice.actions;
export default assetTypeSlice.reducer;
