import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setOpened, setAssetOpened, setEarningOpened, setDividendOpened, setSpendingOpened, setOpenedMobile } from '@/redux/layout/layoutSlice';

// material-ui 관련 임포트
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

export const useNavbar = () => {
    const drawerWidth: number = 240;
    const dispatch = useAppDispatch();
    const isOpened = useAppSelector(state => state.layoutReducer.isOpened);
    const isOpenedMobile = useAppSelector(state => state.layoutReducer.isOpenedMobile);
    const isAssetOpened = useAppSelector(state => state.layoutReducer.isAssetOpened);
    const isEarningOpened = useAppSelector(state => state.layoutReducer.isEarningOpened);
    const isDividendOpened = useAppSelector(state => state.layoutReducer.isDividendOpened);
    const isSpendingOpened = useAppSelector(state => state.layoutReducer.isSpendingOpened);

    // 권한 관련
    const [role, setRole] = useState<number>(3);

    // 데이터 가져오기
    useEffect(() => {
        // 세션 스토리지에 저장된 role값 가져오기
        setRole(Number(sessionStorage.getItem('role')));
    }, []);

    const CustomDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: drawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                boxSizing: 'border-box',
                ...(!open && {
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    width: theme.spacing(7),
                    [theme.breakpoints.up('sm')]: {
                        width: theme.spacing(9),
                    },
                }),
            },
        }),
    );

    // 함수 반환
    return { 
        role,
        CustomDrawer, 
        dispatch, 
        isOpened, setOpened,
        isOpenedMobile, setOpenedMobile,
        isAssetOpened, setAssetOpened, 
        isEarningOpened, setEarningOpened,
        isDividendOpened, setDividendOpened,
        isSpendingOpened, setSpendingOpened
    };
}