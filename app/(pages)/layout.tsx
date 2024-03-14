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

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* 헤더 컴포넌트 */}
            <Header />
            {/* 네비게이션 컴포넌트 */}
            <Navbar />
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