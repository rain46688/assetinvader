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

export default function Ch2_1_3Page() {

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
                2.1.내 자산 파악하기
            </Typography>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="h6"
                component="div"
            >
                2.1.3.유형별로 나눈 자산 분류별로 더 구체화해보자
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
                        href="/description/ch2_1_2"
                    >
                        2.1.2.난 무엇에 돈을 넣고 있을까?
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
                        href="/description/ch2_2_1"
                    >
                        2.2.투자자산 파해치기
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
                이전에 유형별은 유동성, 안정성, 이익률로 나누었다면 이번 분류별은
                유형별로 나눈 자산을 세분화하여 구체적인 목표를 정하는 단계입니다. 먼저
                유형별 자산과 분류별 자산의 관계를 알려드리겠습니다.
            </Typography>

            <StyledTableContainer sx={{ mt: 2 }}>
                <Table aria-label="자산유형, 자산분류 구분 테이블">
                    <TableHead>
                        <TableRow>
                            <StyledTableHeadCell>자산유형</StyledTableHeadCell>
                            <StyledTableHeadCell>자산분류</StyledTableHeadCell>
                            <StyledTableHeadCell>자산세분류</StyledTableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <StyledTableCell rowSpan={3}>현금자산</StyledTableCell>
                            <StyledTableCell rowSpan={3}>현금자산</StyledTableCell>
                            <StyledTableCell>입출금 통장</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>파킹통장</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>CMA</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell rowSpan={2}>원금보장자산</StyledTableCell>
                            <StyledTableCell rowSpan={2}>안전자산</StyledTableCell>
                            <StyledTableCell>예금, 적금</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>개별채권</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell rowSpan={8}>원금비보장자산</StyledTableCell>
                            <StyledTableCell rowSpan={3}>안전자산</StyledTableCell>
                            <StyledTableCell>외환</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>금</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>배당자산</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell rowSpan={3}>배당자산</StyledTableCell>
                            <StyledTableCell>개별주식</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>배당성장</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>고배당</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell rowSpan={2}>투자자산</StyledTableCell>
                            <StyledTableCell>개별주식</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>지수추종</StyledTableCell>
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
                위의 표처럼 유형별 자산을 위와 같이 분류별로 나누어 구체적인 자산배분
                분류를 정리할 수 있게됩니다. 이제 구체적으로 자산분류 및 세분류에 대한
                특징을 파악하고 이 책에서 나름대로 구분한 투자성향에 따라 자산배분을
                구체화 해봅시다.
            </Typography>
        </>
    )
}
