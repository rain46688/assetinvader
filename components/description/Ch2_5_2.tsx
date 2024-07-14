"use client"

import * as React from 'react';
import Link from "next/link";

// material-ui 관련 임포트
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function Ch2_5_2Page() {
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
                2.5.현금자산 파해치기
            </Typography>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="h6"
                component="div"
            >
                2.5.2.파킹통장과 CMA
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
                        href="/description/ch2_5_1"
                    >
                        2.5.1.입출식 통장
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
                        href="/description/ch2_6"
                    >
                        2.6. 내 저축성향 파악하기
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
                파킹통장과 CMA는 일별 이자를 계산하여 일별, 월별로 지급하는 계좌입니다.
                이 둘의 차이는 파킹통장은 예금자보호가 되는 상품이고, CMA는 예금자보호가
                불가능한 상품이라는 큰 차이가 있습니다. 따라서 파킹통장보다 CMA가 금리가
                조금 더 높게 지급됩니다. 파킹통장은 은행별로 입금한도가 정해져있거나,
                일정 한도이상부터는 저율금리가 적용되는 상품도 있습니다. CMA는 한가지만
                있는것이 아닌 종류별로 RP형, MMW형, MMF형이 있습니다. 각 종류별 정리는
                아래의 표를 참조해주세요. 파킹통장과 CMA에 저금을 하는 목적은 언제든지
                필요할 때 돈을 찾아 쓸수 있다는 점과 입출식 통장보다 높은 이율을 받을 수
                있다는 목적때문입니다. 좀더 안전함을 원한다면 파킹통장, 파킹통장보다 덜
                안전하지만 조금 더 높은 수익을 원한다면 CMA를 선택하면 됩니다. 여기서
                CMA가 파킹통장보다 덜 안전하다는것도 주식 등의 투자 상품에 비하면 매우
                안전한 상품입니다.
            </Typography>
        </>
    )
}
