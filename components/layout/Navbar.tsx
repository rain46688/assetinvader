"use client";

import Link from "next/link";
import * as React from "react";
import { useNavbar } from "@/hooks/layout/useNavbar";

// material-ui 관련 임포트
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Typography from "@mui/material/Typography";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SavingsIcon from "@mui/icons-material/Savings";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function Navbar() {
  // Custom Hook 사용
  const {
    role,
    Drawer,
    isopened,
    setOpened,
    dispatch,
    isAssetOpened,
    setAssetOpened,
    isEarningOpened,
    setEarningOpened,
    isDividendOpened,
    setDividendOpened,
    isSpendingOpened,
    setSpendingOpened,
  } = useNavbar();

  return (
    <Drawer variant="permanent" open={isopened as boolean | undefined}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton
          onClick={() => {
            dispatch(setOpened({ isopened: !isopened }));
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <React.Fragment>
          {/* 자산관리 */}
          <ListItemButton
            onClick={() => {
              dispatch(setAssetOpened({ isAssetOpened: !isAssetOpened }));
            }}
          >
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="자산관리" />
            {isAssetOpened ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={isAssetOpened as boolean | undefined}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {role < 3 ? (
                <>
                  {/* 자산관리 > 자산관리 개요 */}
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={Link}
                    href={process.env.NEXT_PUBLIC_DESCRIPTION_URL || "/"}
                  >
                    <ListItemIcon>
                      <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary="자산관리 개요" />
                  </ListItemButton>
                </>) : (<></>)}
              {/* 자산관리 > 유형별 자산관리 */}
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href={process.env.NEXT_PUBLIC_ROOT_URL || "/"}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="유형별 자산관리" />
              </ListItemButton>
              {/* 자산관리 > 분류별 자산관리 */}
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href={process.env.NEXT_PUBLIC_ASSET_CLASS_URL || "/"}
              >
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="분류별 자산관리" />
              </ListItemButton>
              {/* 자산관리 > 자산분석 */}
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href={process.env.NEXT_PUBLIC_ASSET_RECORD_URL || "/"}
              >
                <ListItemIcon>
                  <ShowChartIcon />
                </ListItemIcon>
                <ListItemText primary="자산분석" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* 수익관리 */}
          <ListItemButton
            onClick={() => {
              dispatch(setEarningOpened({ isEarningOpened: !isEarningOpened }));
            }}
          >
            <ListItemIcon>
              <SavingsIcon />
            </ListItemIcon>
            <ListItemText primary="수익관리" />
            {isEarningOpened ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={isEarningOpened as boolean | undefined}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {/* 수익관리 > 자산수익 기록 */}
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href={process.env.NEXT_PUBLIC_ASSET_EARNING_URL || "/"}
              >
                <ListItemIcon>
                  <SavingsIcon />
                </ListItemIcon>
                <ListItemText primary="자산수익 기록" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* 지출관리 */}
          <ListItemButton
            onClick={() => {
              dispatch(
                setSpendingOpened({ isSpendingOpened: !isSpendingOpened })
              );
            }}
          >
            <ListItemIcon>
              <CreditScoreIcon />
            </ListItemIcon>
            <ListItemText primary="지출관리" />
            {isSpendingOpened ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={isSpendingOpened as boolean | undefined}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {/* 지출관리 > 지출내역 기록 */}
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href={process.env.NEXT_PUBLIC_SPENDING_URL || "/"}
              >
                <ListItemIcon>
                  <CreditScoreIcon />
                </ListItemIcon>
                <ListItemText primary="지출내역 기록" />
              </ListItemButton>
            </List>
          </Collapse>


          {role < 4 ? (
            <>
              {/* 이자·배당관리 */}
              <ListItemButton
                onClick={() => {
                  dispatch(
                    setDividendOpened({ isDividendOpened: !isDividendOpened })
                  );
                }}
              >
                <ListItemIcon>
                  <LocalAtmIcon />
                </ListItemIcon>
                <ListItemText primary="이자·배당관리" />
                {isDividendOpened ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={isDividendOpened as boolean | undefined}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={Link}
                    href={process.env.NEXT_PUBLIC_ASSET_TRANSACTION_URL || "/"}
                  >
                    <ListItemIcon>
                      <SyncAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="배당자산 거래기록" />
                  </ListItemButton>
                  {/* 이자·배당관리 > 확정배당금 기록 */}
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={Link}
                    href={process.env.NEXT_PUBLIC_DIVIDEND_URL || "/"}
                  >
                    <ListItemIcon>
                      <PriceCheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="확정배당금 기록" />
                  </ListItemButton>
                  {/* 이자·배당관리 > 확정이자 기록 */}
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={Link}
                    href={process.env.NEXT_PUBLIC_INTEREST_URL || "/"}
                  >
                    <ListItemIcon>
                      <PriceCheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="확정이자 기록" />
                  </ListItemButton>
                  {/* 이자·배당관리 > 월별 이자·배당금 조회 */}
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={Link}
                    href={process.env.NEXT_PUBLIC_CASH_FLOW_URL || "/"}
                  >
                    <ListItemIcon>
                      <ListAltIcon />
                    </ListItemIcon>
                    {/* <ListItemText secondary="월별 이자·배당금 조회" />*/}
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            월별 이자·배당금 조회
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            </>) : (<></>)}
        </React.Fragment>
        <Divider sx={{ my: 1 }} />
      </List>
    </Drawer>
  );
}
