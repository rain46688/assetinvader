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

export default function Ch2_1_2Page() {

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
                2.1.2.난 무엇에 돈을 넣고 있을까?
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
                        href="/description/ch2_1_1"
                    >
                        2.1.1.내가 가진 자산들이 어느 계좌에 숨어있을까?
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
                        href="/description/ch2_1_3"
                    >
                        2.1.3.유형별로 나눈 자산 분류별로 더 구체화해보자
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
                이제 이전 단계에서 유형(현금자산, 원금보장자산, 원금비보장자산)별로 나눈
                자산들의 비율을 보면서 본인의 목표 자산비율을 생각해보는 시간을
                가집니다. 먼저 유형별로 나누고, 이후에 본인의 투자성향에 따라 분류별로
                세분화하여 나누는 과정을 거치게됩니다. 처음단계인 유형별로 나눌때 필요한
                기준은 자산의 유동성, 이익률, 안정성에따라 비교합니다. 아래 그림을 보면
                각 유형마다 유동성, 이익률, 안정성이 다르고, 이를 참조하여 본인의 유형별
                비율을 나누어 자산목표비율 정합니다.
            </Typography>
            <StyledTableContainer sx={{ mt: 2 }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableHeadCell>자산유형</StyledTableHeadCell>
                            <StyledTableHeadCell>유동성</StyledTableHeadCell>
                            <StyledTableHeadCell>이익률</StyledTableHeadCell>
                            <StyledTableHeadCell>안정성</StyledTableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <StyledTableCell>현금자산</StyledTableCell>
                            <StyledTableCell>높음</StyledTableCell>
                            <StyledTableCell>낮음</StyledTableCell>
                            <StyledTableCell>높음</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>원금보장자산</StyledTableCell>
                            <StyledTableCell>보통</StyledTableCell>
                            <StyledTableCell>보통</StyledTableCell>
                            <StyledTableCell>높음</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>원금비보장자산</StyledTableCell>
                            <StyledTableCell>낮음</StyledTableCell>
                            <StyledTableCell>높음</StyledTableCell>
                            <StyledTableCell>낮음</StyledTableCell>
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
                (예1) 멀지 않은 미래에 급전이 필요할 수 있는경우
            </Typography>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                현금자산 40%, 원금보장자산 30%, 원금비보장자산 30%의 비율로 조정
            </Typography>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                ⇒ 이 경우 왠만큼의 비용은 현금자산에서 처리하며, 부족분의경우
                원금보장자산을 매도하여 충당할 수 있습니다.
            </Typography>

            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                (예2) 큰 수익을 받고 싶은경우
            </Typography>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                현금자산 10%, 원금보장자산 30%, 원금비보장자산 60%의 비율로 조정
            </Typography>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                ⇒ 큰 수익이 필요하다고 하여도 현금자산 및 원금보장자산을 가지고
                있어야합니다. 만약 원금비보장자산의 가격이 하락하는경우 갑자기 돈이
                필요한 경우가 아예 발생하지 않는다는 보장이 없기에 현금자산이 조금은
                있어야합니다. 그리고 원금보장자산은 어떠한 경우에도 30%는 가지고
                있어야하는데 이는 원금보장자산을 일부 보유함으로써 원금비보장자산의
                하락시기에도 심리적 안정감을 가져, 원금비보장자산의 패닉셀(자산가격이 더
                떨어질것을 걱정하여 손해가 보더라도 매도하여 현금화는 행위)을 하지
                않을수 있습니다.
            </Typography>

            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                (예3) 원금은 항상지켜져야 하는경우
            </Typography>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                현금자산 30%, 원금보장자산 60%, 원금비보장자산 10%의 비율로 조정
            </Typography>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                ⇒ 어떠한 경우에도 원금의 대부분을 보전할 수 있습니다. 하지만,
                원금비보장자산이 조금의 비율은 있어야합니다. 현금자산과 원금보장자산은
                금리에 영향을 많이 받기때문에 금리가 낮아진다면 수익률이 많이 낮아질 수
                있습니다. 이 경우를 대비하여 원금비보장자산의 비율을 조금 가지고
                있는것이 좋습니다.
            </Typography>

            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                위에서 설명드린 예시를 기반으로 자신이 원하는 비율을 조정하여 목표비율을
                산정해봅시다.
            </Typography>
        </>
    )
}
