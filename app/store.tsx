import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// 신규 데이터 추가시 임포트 부분
import userReducer from '@/redux/user/userSlice';
import layoutReducer from '@/redux/layout/layoutSlice';
import assetReducer from '@/redux/asset_type/assetTypeSlice';
import assetClassReducer from '@/redux/asset_class/assetClassSlice';
import assetTypeReducer from '@/redux/asset_type/assetTypeSlice';
import assetTransactionReducer from '@/redux/asset_transaction/assetTransactionSlice';
import spendingReducer from '@/redux/spending/spendingSlice';
import dividendReducer from '@/redux/dividend/dividendSlice';
import cashFlowReducer from '@/redux/cash_flow/cashFlowSlice';
import interestReducer from '@/redux/interest/interestSlice';
import assetEarningReducer from '@/redux/asset_earning/assetEarningSlice';
import userAdminReducer from '@/redux/user_admin/userAdminSlice'; 
import inviteCodeReducer from '@/redux/invitecode/inviteCodeSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    layoutReducer,
    assetReducer,
    assetClassReducer,
    assetTypeReducer,
    assetTransactionReducer,
    spendingReducer,
    dividendReducer,
    cashFlowReducer,
    interestReducer,
    assetEarningReducer,
    userAdminReducer,
    inviteCodeReducer,
  },
});

// 밑에 부분은 걍 내비두기
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;