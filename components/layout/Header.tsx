"use client"

import { useHeader } from "@/hooks/layout/useHeader";

// material-ui 관련 임포트
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Header() {

    // Custom Hook 사용
    const { role, handleLogout, AppBar, setOpened, dispatch, isopened, handleModifyPage, handleAdminPage } = useHeader();

    return (
        <AppBar position="absolute" open={isopened as boolean | undefined}>
            <Toolbar
                sx={{
                    pr: '24px',
                }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => { dispatch(setOpened({ isopened: !isopened })) }}
                    sx={{
                        marginRight: '36px',
                        ...(isopened && { display: 'none' }),
                    }}>
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}>
                    AssetInvader
                </Typography>
                {role < 2 ? (
                    <Button
                        variant="contained"
                        onClick={handleAdminPage}
                        sx={{ mt: 1, mb: 1, mr: 3 }}>
                        관리자페이지
                    </Button>
                ) : (
                    <></>)
                }
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
            </Toolbar>
        </AppBar>
    )
}
