import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { sendPost } from "@/utils/fetch";
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setOpened } from '@/redux/layout/layoutSlice';
import { isExpirationJwtoken } from '@/utils/util';

// material-ui 관련 임포트
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export const useHeader = () => {
    
    const userouter = useRouter();
    const dispatch = useAppDispatch();
    const isopened = useAppSelector(state => state.layoutReducer.isopened);

    useEffect(() => {
        // 토큰 재발급 함수
        const refresh_jwtoken = async (user_id: string) => {
            const data = JSON.stringify({
                "user_id": user_id
            });

            const result = await sendPost(data, 'member/refresh');
            if (result.status == 'success') {
                // 재발급이가능한 경우
                sessionStorage.setItem('jtoken', result.data.jtoken);
            } else {
                // 재발급이 불가능하면 그냥 메인으로 이동
                userouter.push('' + process.env.NEXT_PUBLIC_LOGIN_URL);
            }
        }

        // 토큰이 없으면 로그인 페이지로 이동
        const jtoken = sessionStorage.getItem('jtoken');
        if (isExpirationJwtoken(''+jtoken)) {
            const user_id = sessionStorage.getItem('user_id');
            if (user_id != null) {
                // 토큰 재발급 함수 호출
                refresh_jwtoken(user_id);
            } else {
                console.log("user_id 없음");
                userouter.push('' + process.env.NEXT_PUBLIC_LOGIN_URL);
            }
        }
    }, []);

    // 로그 아웃 함수
    const handleLogout = () => {
        console.log(" === handleLogout === ");
        // token 삭제
        sessionStorage.removeItem('jtoken');
        // 세션 스토리지 삭제
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('user_id');
        // 메인으로 라우팅
        userouter.push('' + process.env.NEXT_PUBLIC_LOGIN_URL);
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

    // 함수 반환
    return { handleLogout, AppBar, setOpened, dispatch, isopened };
}
