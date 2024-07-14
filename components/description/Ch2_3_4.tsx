"use client"

import * as React from 'react';
import Link from "next/link";

// material-ui 관련 임포트
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export default function Ch2_3_4Page() {

    const StyledTableContainer = styled(TableContainer)({
        border: '1px solid rgba(224, 224, 224, 1)',
    })

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        textAlign: 'center',
        border: '1px solid rgba(224, 224, 224, 1)',
    }))

    const StyledTableHeadCell = styled(StyledTableCell)({
        fontWeight: 'bold',
        backgroundColor: grey[300], // 원하는 배경색으로 설정
    })

    return (
        <>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="h4"
                component="div"
            >
                2.나도 한 번 해보자! 자산배분
            </Typography>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="h5"
                component="div"
            >
                2.3.배당자산 파해치기
            </Typography>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="h6"
                component="div"
            >
                2.3.4.고배당 ETF
            </Typography>
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        textAlign: "left",
                    }}
                >
                    <Typography
                        sx={{
                            flex: "1 1 100%",
                            pt: { sm: 2 },
                            textDecoration: "none", // 밑줄 제거
                        }}
                        variant="subtitle1"
                        component={Link}
                        href="/description/ch2_3_3"
                    >
                        2.3.3.배당성장 ETF
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        sx={{
                            flex: "1 1 100%",
                            pt: { sm: 2 },
                            textDecoration: "none", // 밑줄 제거
                        }}
                        variant="subtitle1"
                        component={Link}
                        href="/description/index"
                    >
                        목록으로
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        textAlign: "right",
                    }}
                >
                    <Typography
                        sx={{
                            flex: "1 1 100%",
                            pt: { sm: 2 },
                            textDecoration: "none", // 밑줄 제거
                        }}
                        variant="subtitle1"
                        component={Link}
                        href="/description/ch2_4_1"
                    >
                        2.4.안전자산 파해치기
                    </Typography>
                </Grid>
            </Grid>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                고배당은 배당성장과는 다른 성격을 가진 ETF입니다. 차이점은 배당성장은
                오랜기간동안 배당금을 지급한 이력이 있고, 배당금이 꾸준히 성장하는
                종목들을 투자한다면 고배당은 배당이 많은 종목들을 우선적으로 투자합니다.
                그러나 그 이유만으로 배당성장보다 배당률이 1~5%p정도 높을수는 없는데요,
                여기서 콜옵션 매도를 통해 프리미엄을 추가합니다. 아직은 구조를 이해하기
                어려울 수 있으니 먼저 옵션에 대해 설명드리겠습니다.
            </Typography>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                옵션: 특정 자산을 일정 기간내에 특정 가격으로 사거나 팔 수 있는
                권리말하며 살 수 있는 권리는 콜옵션, 팔 수 있는 권리는 풋옵션이라고
                합니다.
            </Typography>

            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                콜옵션: 콜옵션은 살 수 있는 권리를 말합니다. 해당 시점에 자산의 가치가
                상승한다면 옵션을 행사하여 차익을 얻을 수 있습니다. 하지만 자산의 가치가
                하락하여 행사가(사기로 한 가격)보다 낮다면 행사를 하지 않을 수 있습니다.
                예를들면 현재 100원인 a자산을 3개월 이후에 120원에 살 수 있는 권리를
                20원에 샀다고 가정했을 때 자산가격의 하락 또는 상승에따른 손익을
                계산해봅시다.
            </Typography>

            <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
                <ListItem>
                    <ListItemText primary="1. 자산가격이 200원이 됬을경우: 콜옵션을 행사하면서 200원짜리 a자산을 120원에 매수하여 80원의 차익을 얻었으나, 권리의 가격인 20원을 차감하면 최종 수익은 60원이 됩니다." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="2. 자산가격이 50원이 됬을경우: 콜옵션을 행사하지 않으면서 권리 가격인 20원의 차감만 발생하므로, 최종 수익은 -20원이 됩니다." />
                </ListItem>
            </List>

            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                이처럼 미래의 가격을 상승한다고 예측하고 투자를 하는것이기에
                상승했을경우에 이익을 보고 하락하는경우에는 권리 가격만큼의 손해만
                발생합니다.
            </Typography>

            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                풋옵션: 콜옵션과 반대로 이루어진다고 생각하시면 됩니다. 마찬가지로 a자산
                가격의 변화에 따른 손익을 계산해봅시다. 풋옵션의 조건은 100원인 a자산을
                3개월 뒤 120원에 판매할 수 있는 권리를 20원에 샀다고 가정해봅시다.
            </Typography>

            <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
                <ListItem>
                    <ListItemText primary="1. 자산가격이 200원이 됬을경우: 풋옵션을 행사하지 않으면서 권리 가격인 20원의 차감만 발생하므로, 최종 수익은 -20원이 됩니다." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="2. 자산가격이 50원이 됬을경우: 50원에 시장에서 자산을 산 다음 풋옵션 행사가격인 120원에 매도하여 70원의 차익을 얻고, 마찬가지로 권리 가격인 20원을 차감하면 최종수익은 50원이 됩니다." />
                </ListItem>
            </List>

            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                예시를 보았듯이 옵션 매수자는 옵션을 행사할 의무는 없고, 권리만 가지고
                있으므로 해당 비용(20원)을 내는 것이고, 매도자는 20원의
                프리미엄(권리가격)을 받기때문에 옵션 매수자의 권리를 거부할 수 없는
                의무를 가지게 됩니다. 여기서 고배당ETF는 고배당주식을 보유하면서 해당
                주식의 콜옵션을 판매하여 수익을 내게됩니다. 모든 ETF가 같은 방식의
                수익구조를 가지는것은 아니지만 그 중에 콜옵션 매도 방식의 수익구조를
                알려드리겠습니다. A ETF는 a라는 자산을 보유하고 있고 a의 가격은
                100원이며 1달 뒤에 110원에 살 수 있는 콜옵션을 5원에 판매한다고
                가정해봅시다. a자산 가격에 따라 A ETF의 손익을 계산해봅시다.
            </Typography>

            <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
                <ListItem>
                    <ListItemText primary="1. a의 가격이 100원 그대로 일때: 5원 콜옵션 매도 수익 발생" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="2. a의 가격이 150원 일때: 5원 콜옵션 매도 수익 발생, 콜옵션 행사로 인한 40원의 가치 손실 발생" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="3. a의 가격이 80원 일때: 5원 콜옵션 매도 수익 발생, a자산 가격 하락으로 인한 20원의 가치 손실 발생" />
                </ListItem>
            </List>

            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                위 3가지 경우를 봤을때 a자산의 가격이 올라도 내려도 손실이 발생하고,
                가격이 일정하게 유지될때만 콜옵션 매도 수익이 생기는 구조입니다. 이
                때문에 고배당 ETF는 자산가치가 증가할 때 그 상승분을 반영하기 어렵고,
                하락할 때에는 하락분을 그대로 반영할기에 배당성장이 잘 이루어지지
                않습니다. 그래서 5~10년 투자하는 장기 배당투자에는 적절하지 않지만
                당장은 큰 현금 수입을 가져다 주기에 적절히 분배해야할 자산분입니다.
                고배당 ETF를 고를때에도 배당성장 ETF와 비슷한 조건들을 고려해보는것이
                중요합니다. 여기도 마찬가지로 대표적인 ETF들만 모아서 정리해 보았습니다.
                제가 보여드리는것이 전부는 아니니, 직접 찾아보시면서 고민해보시고
                정하시면됩니다.
            </Typography>

            <StyledTableContainer sx={{ mt: 2 }}>
                <Table aria-label="고배당 자산 정리 테이블">
                    <TableHead>
                        <TableRow>
                            <StyledTableHeadCell>자산명</StyledTableHeadCell>
                            <StyledTableHeadCell>자산운용사</StyledTableHeadCell>
                            <StyledTableHeadCell>ETF의 종류</StyledTableHeadCell>
                            <StyledTableHeadCell>운용자산의 크기</StyledTableHeadCell>
                            <StyledTableHeadCell>분배율(%)</StyledTableHeadCell>
                            <StyledTableHeadCell>분배금 지급주기</StyledTableHeadCell>
                            <StyledTableHeadCell>보수(%)</StyledTableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <StyledTableCell>ARIRANG 고배당주</StyledTableCell>
                            <StyledTableCell>한화</StyledTableCell>
                            <StyledTableCell>FnGuide 고배당주지수</StyledTableCell>
                            <StyledTableCell>3,124억원</StyledTableCell>
                            <StyledTableCell>11.05</StyledTableCell>
                            <StyledTableCell>연 4회</StyledTableCell>
                            <StyledTableCell>0.23</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>KBSTAR 200고배당커버드콜ATM</StyledTableCell>
                            <StyledTableCell>국민(KB)</StyledTableCell>
                            <StyledTableCell>코스피 200 고배당 커버드콜 ATM</StyledTableCell>
                            <StyledTableCell>100억원</StyledTableCell>
                            <StyledTableCell>8.66</StyledTableCell>
                            <StyledTableCell>연 12회</StyledTableCell>
                            <StyledTableCell>0.4</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>TIGER 미국배당+7%프리미엄다우존스</StyledTableCell>
                            <StyledTableCell>미래에셋</StyledTableCell>
                            <StyledTableCell>
                                Dow Jones U.S. Dividend 100 7% Premium Covered Call 지수(Total
                                Return)
                            </StyledTableCell>
                            <StyledTableCell>7,614억원</StyledTableCell>
                            <StyledTableCell>11.28</StyledTableCell>
                            <StyledTableCell>연 12회</StyledTableCell>
                            <StyledTableCell>0.39</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>KODEX 미국배당+10%프리미엄다우존스</StyledTableCell>
                            <StyledTableCell>삼성</StyledTableCell>
                            <StyledTableCell>
                                Dow Jones U.S. Dividend 100 10% Premium Covered Call Index(Total
                                Return)
                            </StyledTableCell>
                            <StyledTableCell>308억원</StyledTableCell>
                            <StyledTableCell>-</StyledTableCell>
                            <StyledTableCell>연 12회</StyledTableCell>
                            <StyledTableCell>0.39</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>JPMorgan Equity Premium Income ETF(JEPI)</StyledTableCell>
                            <StyledTableCell>JPMorgan</StyledTableCell>
                            <StyledTableCell>S&P 500</StyledTableCell>
                            <StyledTableCell>335억달러</StyledTableCell>
                            <StyledTableCell>7.61</StyledTableCell>
                            <StyledTableCell>연 12회</StyledTableCell>
                            <StyledTableCell>0.35</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>
                                JPMorgan Nasdaq Equity Premium Income ETF(JEPQ)
                            </StyledTableCell>
                            <StyledTableCell>JPMorgan</StyledTableCell>
                            <StyledTableCell>나스닥 100</StyledTableCell>
                            <StyledTableCell>140억달러</StyledTableCell>
                            <StyledTableCell>9.57</StyledTableCell>
                            <StyledTableCell>연 12회</StyledTableCell>
                            <StyledTableCell>0.35</StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </StyledTableContainer>

            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                2024-06-09 기준
            </Typography>
        </>
    )
}
