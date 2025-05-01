"use client"

import { useHeader } from "@/hooks/layout/useHeader";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";

// material-ui 관련 임포트
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header() {
    const router = useRouter();

    // Custom Hook 사용
    const { role, handleLogout, AppBar, dispatch, isOpened, setOpened, isOpenedMobile, setOpenedMobile, handleModifyPage, handleAdminPage } = useHeader();
    // 모바일 페이지 체크
    const isMobile = useMediaQuery('(max-width:600px) or (max-height:600px)');

    return (
        <AppBar position="absolute" open={isMobile as boolean | undefined ? isOpenedMobile as boolean | undefined : isOpened as boolean | undefined}>
            <Toolbar
                sx={{
                    // pr: '24px',
                }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => { 
                        dispatch(setOpened({ isOpened: !isOpened }));
                        dispatch(setOpenedMobile({ isOpenedMobile: !isOpenedMobile }));
                    }}
                    sx={{
                        // marginRight: '36px',
                        ...((isMobile ? isOpenedMobile : isOpened) && { display: 'none' }),
                    }}>
                    <MenuIcon />
                </IconButton>
                {/* <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}>
                    AssetInvader
                </Typography> */}
                <Typography
                    sx={{ flexGrow: 1 }}>
                    <Button
                        variant="text"
                        size="large"
                        onClick={() => {
                            router.push('' + process.env.NEXT_PUBLIC_ROOT_URL);
                        }}
                        // href={process.env.NEXT_PUBLIC_ROOT_URL || "/"}
                        sx={{ color: grey[50] }}
                    >
                        FindMyWealth
                    </Button>
                </Typography>
                {role < 2 ? (
                    <>
                        {isMobile ? (
                            <IconButton aria-label="refresh" onClick={handleAdminPage}>
                                <ManageAccountsIcon sx={{ color: grey[50] }} />
                            </IconButton>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleAdminPage}
                                sx={{ mt: 1, mb: 1, mr: 3 }} >
                                관리자페이지
                            </Button>
                        )}
                    </>
                ) : (
                    <></>)
                }
                {isMobile ? (
                    <>
                        <IconButton aria-label="refresh" onClick={handleModifyPage}>
                            <AccountBoxIcon sx={{ color: grey[50] }} />
                        </IconButton>
                        <IconButton aria-label="refresh" onClick={handleLogout}>
                            <LogoutIcon sx={{ color: grey[50] }} />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <Button
                            variant="contained"
                            onClick={handleModifyPage}
                            sx={{ mt: 1, mb: 1, mr: 3 }}>
                            회원정보수정
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleLogout}
                            sx={{ mt: 1, mb: 1 }}>
                            로그아웃
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar >
    )
}
