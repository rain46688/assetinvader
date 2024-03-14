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
    const { handleLogout, AppBar, setOpened, dispatch, isopened } = useHeader();

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
                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleLogout}
                    sx={{ mt: 1, mb: 1 }}>
                    logout
                </Button>
            </Toolbar>
        </AppBar>
    )
}
