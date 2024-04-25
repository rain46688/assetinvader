"use client"

import { Box } from '@mui/system';
import { CssBaseline } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// 상속을 받지 않으니 여기서 테마 적용
const Theme = createTheme();

export default function Loading() {
    return (
        <ThemeProvider theme={Theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}>
                <CssBaseline />
                <Container component="main" sx={{
                    mt: 30, mb: 2
                }} maxWidth="sm">
                    <Typography variant="h2" component="h1" gutterBottom>
                        Loading...
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '10vh',
                            backgroundImage: 'url(https://assetinvader.s3.ap-northeast-2.amazonaws.com/sand_timer2.gif)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'auto',
                            backgroundPosition: 'center',
                        }}
                    ></Box>
                </Container>
            </Box>
        </ThemeProvider>
    )
}