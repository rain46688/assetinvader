"use client"

import Link from 'next/link';
import * as React from 'react';
import { useNavbar } from '@/hooks/layout/useNavbar';

// material-ui 관련 임포트
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SavingsIcon from '@mui/icons-material/Savings';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import PaymentsIcon from '@mui/icons-material/Payments';

export default function Navbar() {

    // Custom Hook 사용
    const { Drawer, setOpened, dispatch, isopened } = useNavbar();

    return (
        <Drawer variant="permanent" open={isopened as boolean | undefined}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}>
                <IconButton onClick={() => { dispatch(setOpened({ isopened: !isopened })) }}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                <React.Fragment>
                    <ListItemButton component={Link} href={process.env.NEXT_PUBLIC_ROOT_URL || "/"}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="유형별 자산관리" />
                    </ListItemButton>
                    {/*  */}
                    <ListItemButton component={Link} href={process.env.NEXT_PUBLIC_ASSET_CLASS_URL || "/"}>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="분류별 자산관리" />
                    </ListItemButton>
                    {/*  */}
                    <ListItemButton component={Link} href={process.env.NEXT_PUBLIC_ASSET_TRANSACTION_URL || "/"}>
                        <ListItemIcon>
                            <PriceCheckIcon />
                        </ListItemIcon>
                        <ListItemText primary="자산거래 기록" />
                    </ListItemButton>
                    {/*  */}
                    <ListItemButton component={Link} href={process.env.NEXT_PUBLIC_DIVIDEND_URL || "/"}>
                        <ListItemIcon>
                            <PaymentsIcon />
                        </ListItemIcon>
                        <ListItemText primary="확정배당금 기록" />
                    </ListItemButton>
                    {/*  */}
                    <ListItemButton component={Link} href={process.env.NEXT_PUBLIC_CASH_FLOW_URL || "/"}>
                        <ListItemIcon>
                            <CurrencyExchangeIcon />
                        </ListItemIcon>
                        <ListItemText primary="현금흐름 기록" />
                    </ListItemButton>
                    {/*  */}
                    <ListItemButton component={Link} href={process.env.NEXT_PUBLIC_ASSET_EARNING_URL || "/"}>
                        <ListItemIcon>
                            <SavingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="자산수익 기록" />
                    </ListItemButton>
                    {/*  */}
                    <ListItemButton component={Link} href={process.env.NEXT_PUBLIC_SPENDING_URL || "/"}>
                        <ListItemIcon>
                            <CreditScoreIcon />
                        </ListItemIcon>
                        <ListItemText primary="지출내역 기록" />
                    </ListItemButton>
                    {/*  */}
                </React.Fragment>
                <Divider sx={{ my: 1 }} />
            </List>
        </Drawer>
    )
}
