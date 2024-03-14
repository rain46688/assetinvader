"use client"

import Link from 'next/link';
import { Box } from '@mui/system';
import { CssBaseline } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="/">
                AssetInvader
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// 상속을 받지 않으니 여기서 테마 적용
const Theme = createTheme();

export default function not_found() {
    return (
        <ThemeProvider theme={Theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <CssBaseline />
                <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
                    <Typography variant="h2" component="h1" gutterBottom>
                        404 - Not Found
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {'페이지를 찾을수 없습니다.'}
                    </Typography>
                    <Typography variant="body1" component={Link} href="/asset_type">Go back to Main.</Typography>
                </Container>
                <Box
                    component="footer"
                    sx={{
                        py: 3,
                        px: 2,
                        mt: 'auto',
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[200]
                                : theme.palette.grey[800],
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography variant="body1">
                            AssetInvader
                        </Typography>
                        <Copyright />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}
