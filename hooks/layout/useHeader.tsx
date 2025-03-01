import { useState, useEffect } from 'react';
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setOpened, setOpenedMobile } from '@/redux/layout/layoutSlice';
import { refresh_jwtoken } from '@/utils/util';

// material-ui 관련 임포트
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export const useHeader = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isOpened = useAppSelector(state => state.layoutReducer.isOpened);
    const isOpenedMobile = useAppSelector(state => state.layoutReducer.isOpenedMobile);
    const pathname = usePathname();

    // 권한 관련
    const [role, setRole] = useState<number>(3);

    useEffect(() => {

        // 토큰 재발급 함수 호출
        refresh_jwtoken().then((res) => {
            if (res !== undefined && res.status === 'fail') {
                console.log(" === 로그아웃 처리 === ");
                // 로그아웃 처리
                handleLogout();
            }
        });

        // 인터셉터 설정
        const user_role = Number(sessionStorage.getItem('role'));
        const split_pathname = pathname.split('/')[1];
        if (split_pathname == 'description') {
            if (user_role > 2) {
                // 메인으로 라우팅
                router.push('' + process.env.NEXT_PUBLIC_ROOT_URL);
            }
        } else if (split_pathname == 'asset_transaction'
            || split_pathname == 'dividend'
            || split_pathname == 'interest'
            || split_pathname == 'cash_flow') {
            if (user_role > 3) {
                // 메인으로 라우팅
                router.push('' + process.env.NEXT_PUBLIC_ROOT_URL);
            }
        }

        setRole(user_role);
    }, []);

    // 로그 아웃 함수
    const handleLogout = () => {
        console.log(" === handleLogout === ");
        // token 삭제
        sessionStorage.removeItem('jtoken');
        // 세션 스토리지 삭제
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('targetRatio');
        // 메인으로 라우팅
        router.push('' + process.env.NEXT_PUBLIC_LOGIN_URL);
    }

    // 헤더 레이아웃 관련 함수들
    const drawerWidth: number = 240;

    interface AppBarProps extends MuiAppBarProps {
        open?: boolean;
    }

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));


    const handleModifyPage = () => {
        router.push('' + process.env.NEXT_PUBLIC_MODIFY_URL);
    };

    const handleAdminPage = () => {
        router.push('' + process.env.NEXT_PUBLIC_ADMIN_URL);
    };

    // 함수 반환
    return { role, handleLogout, AppBar, dispatch, isOpened, setOpened, isOpenedMobile, setOpenedMobile, handleModifyPage, handleAdminPage };
}
