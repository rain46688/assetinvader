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

export default function Ch2_6Page() {

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
                2.6. 내 저축성향 파악하기
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
                        href="/description/ch2_5_2"
                    >
                        2.5.2.파킹통장과 CMA
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
                        href="/description/ch2_7"
                    >
                        2.7.이제 알겠는데, 한번에 다 옮기기기 두렵다면?
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
                제 나름의 기준으로 분류한 저축성향을 참하여 분류별 자산배분 분류를
                정해봅시다.
            </Typography>

            <StyledTableContainer sx={{ mt: 2 }}>
                <Table aria-label="성향 분류 테이블">
                    <TableHead>
                        <TableRow>
                            <StyledTableHeadCell>저축성향</StyledTableHeadCell>
                            <StyledTableHeadCell>투자자산</StyledTableHeadCell>
                            <StyledTableHeadCell>배당자산</StyledTableHeadCell>
                            <StyledTableHeadCell>안전자산</StyledTableHeadCell>
                            <StyledTableHeadCell>현금자산</StyledTableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <StyledTableCell>투자지향형</StyledTableCell>
                            <StyledTableCell>40%</StyledTableCell>
                            <StyledTableCell>30%</StyledTableCell>
                            <StyledTableCell>20%</StyledTableCell>
                            <StyledTableCell>10%</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>배당지향형</StyledTableCell>
                            <StyledTableCell>30%</StyledTableCell>
                            <StyledTableCell>40%</StyledTableCell>
                            <StyledTableCell>20%</StyledTableCell>
                            <StyledTableCell>10%</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>안전지향형</StyledTableCell>
                            <StyledTableCell>20%</StyledTableCell>
                            <StyledTableCell>30%</StyledTableCell>
                            <StyledTableCell>40%</StyledTableCell>
                            <StyledTableCell>10%</StyledTableCell>
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
                자산의 적극적 증식을 기대하면서, 인덱스 투자(지수추종 ETF 투자)를 해보고
                개별섹터 투자에 대한 공부를 많이 할 수 있는 준비가 되어있는 경우
                투자지향형으로 선택.
            </Typography>

            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                월 또는 분기마다 주기적으로 배당금을 받아서 생활하고 싶고, 그래도 투자는
                하면서 자산을 늘려가고 싶으면 배당지향형 선택.
            </Typography>

            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                이제 적극적 투자는 힘들거나, 현업이 매우 바빠서 투자에 신경을 쓰고 싶지
                않다면 안전지향형 선택.
            </Typography>

            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                투자자산은 본인이 관심이 있는 섹터가 있다면 그곳에 투자하셔도 좋고, 잘
                모르겠다 싶으면 S&amp;P500, 나스닥과 같은 지수 구매하여 장기간 보유하고
                있어도 좋습니다. 그리고 배당자산은 본인이 주기적으로 현금이 필요한 만큼
                배당률에 맞춰서 이전 배당자산의 자산세분류들 중 선택하여 보유하면
                됩니다. 여기서 중요한건 모든 자산을 한 자산분류에만 넣는것이 아니라 위와
                같이 가장 높은 비율의 자산을 본인의 성향에 맞는 자산분류로 하는것입니다.
                하지만 한가지 필수적인것은 최소 현금자산 10%의 비중을 가져가는 것입니다.
                인생에서 어떠한 일이 일어날지 모르기에 어느정도 현금을 비축해둬서 꼭
                필요할 때 사용할 수 있어야 합니다.
            </Typography>
        </>
    )
}
