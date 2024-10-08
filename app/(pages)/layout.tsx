"use client"

import * as React from 'react';
import { ReactNode } from 'react';
import Header from "../../components/layout/Header"
import Navbar from "../../components/layout/Navbar"

// material-ui 관련 임포트
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// props 타입 선언
interface LayoutProps {
    children: ReactNode;
}

export default function PageLayout(props: LayoutProps) {

    let pageState = null;
    if (typeof window !== 'undefined') {
        // 브라우저 환경에서만 실행됨
        if (sessionStorage.getItem('pageState') != undefined) {
            pageState = sessionStorage.getItem('pageState');
        }
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {pageState == null ? // 회원가입 페이지가 아닌경우
                (<>
                    {/* 헤더 컴포넌트 */}
                    <Header />
                    {/* 네비게이션 컴포넌트 */}
                    <Navbar />
                </>) : (<></>)}
            <Box component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}>
                <Container maxWidth="lg" sx={{ mt: 12 }}>
                    {props.children}
                </Container>
            </Box>
        </Box>
    );
}