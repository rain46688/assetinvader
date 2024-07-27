"use client"

import * as React from 'react';
import Link from "next/link";

// material-ui 관련 임포트
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export default function Ch2_3_3Page() {

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
                2.3.3.배당성장 ETF
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
                        href="/description/ch2_3_2"
                    >
                        2.3.2.개별주식
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
                        href="/description/ch2_3_4"
                    >
                        2.3.4.고배당 ETF
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
                위 개별주식과는 다른 ETF를 통한 투자방법입니다. 이전에 보았던 지수추종
                ETF랑은 다르게 담는 자산들이 배당을 많이 주고, 오래 주면서 성장 계속하는
                자산들을 모아서 만든 펀드입니다. 하지만 개별배당주식과는 다르게 안정적인
                배당성장을 목표로하여 현재 구매기준으로는 은행이자정도의 수익률이
                발생하게 됩니다. 하지만 배당이 성장함에따라 꾸준히 모아간다면 아래
                그림과 같이 배당률이 상승하는것을 볼 수있습니다.
                <Typography
                    sx={{
                        display: 'flex', // Flexbox 컨테이너로 만듭니다
                        justifyContent: 'center', // 수평 가운데 정렬
                        alignItems: 'center', // 수직 가운데 정렬
                        flex: "1 1 100%",
                        pt: { sm: 2 },
                    }}
                    variant="body1"
                    component="div"
                >
                    <img
                        src={'https://assetinvader.s3.ap-northeast-2.amazonaws.com/ch2_3_3_img1.png'}
                        alt={"ch2_3_3_img1"}
                        loading="lazy"
                        width={'50%'}
                        height={'50%'}
                    />
                </Typography>
                배당성장 ETF를 고를때에도 이전의 ETF를 고르는 기준과 비슷하나 배당을
                받기위해 매수하는 ETF이니 분배금과 분배금 지급시기를 주로 보는것이
                중요합니다. 여기도 마찬가지로 대표적인 ETF들만 모아서 정리해 보았습니다.
                제가 보여드리는것이 전부는 아니니, 직접 찾아보시면서 고민해보시고
                정하시면됩니다.
            </Typography>

            <StyledTableContainer sx={{ mt: 2 }}>
                <Table aria-label="배당성장 자산 정리 테이블">
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
                            <StyledTableCell>KODEX 배당성장</StyledTableCell>
                            <StyledTableCell>삼성</StyledTableCell>
                            <StyledTableCell>코스피 배당성장 50</StyledTableCell>
                            <StyledTableCell>200억원</StyledTableCell>
                            <StyledTableCell>3.31</StyledTableCell>
                            <StyledTableCell>연 4회</StyledTableCell>
                            <StyledTableCell>0.15</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>TIGER 배당성장</StyledTableCell>
                            <StyledTableCell>미래에셋</StyledTableCell>
                            <StyledTableCell>코스피 배당성장 50</StyledTableCell>
                            <StyledTableCell>191억원</StyledTableCell>
                            <StyledTableCell>3.15</StyledTableCell>
                            <StyledTableCell>연 4회</StyledTableCell>
                            <StyledTableCell>0.115</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>SOL 미국배당다우존스</StyledTableCell>
                            <StyledTableCell>신한</StyledTableCell>
                            <StyledTableCell>Dow Jones U.S. Dividend 100 Index(PR)</StyledTableCell>
                            <StyledTableCell>5,606억원</StyledTableCell>
                            <StyledTableCell>4.48</StyledTableCell>
                            <StyledTableCell>연 12회</StyledTableCell>
                            <StyledTableCell>0.01</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>ACE 미국배당다우존스</StyledTableCell>
                            <StyledTableCell>한국투자</StyledTableCell>
                            <StyledTableCell>Dow Jones U.S. Dividend 100 Index(PR)</StyledTableCell>
                            <StyledTableCell>3,411억원</StyledTableCell>
                            <StyledTableCell>4.06</StyledTableCell>
                            <StyledTableCell>연 4회</StyledTableCell>
                            <StyledTableCell>0.01</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>Schwab US Dividend Equity ETF(SCHD)</StyledTableCell>
                            <StyledTableCell>Charles Schwab</StyledTableCell>
                            <StyledTableCell>Dow Jones U.S. Dividend 100 Index(PR)</StyledTableCell>
                            <StyledTableCell>547억달러</StyledTableCell>
                            <StyledTableCell>3.43</StyledTableCell>
                            <StyledTableCell>연 4회</StyledTableCell>
                            <StyledTableCell>0.06</StyledTableCell>
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
