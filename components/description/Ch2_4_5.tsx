"use client"

import * as React from 'react';
import Link from "next/link";

// material-ui 관련 임포트
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function Ch2_4_5Page() {

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
                2.4.안전자산 파해치기
            </Typography>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="h6"
                component="div"
            >
                2.4.5.금
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
                        href="/description/ch2_4_4"
                    >
                        2.4.4.외화
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
                        href="/description/ch2_5_1"
                    >
                        2.5.현금자산 파해치기
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
                금은 어느 누가보아도 대표적인 안전자산입니다. 화폐가치가 떨어지면 이에 따라 희소성이 있는 금의 가격이 올라가게 됩니다. 그래서 외화와 마찬가지로 시장이 좋지 않을때 완충역활을 할 수 있으므로 일정 비중 매수해두는 것이 좋습니다.
            </Typography>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                아직까지는 금을 모은다는 것이 귀금속 가게에서 금으로 된 장신구 또는 카드, 반지 등의 현물을 사는걸 많이 생각하는것 같습니다. 하지만 금을 보유하는 방법에는 여러가지가 있습니다. 금을 보유하는 방법은 현물을 직접 보유하는 방법과 현물을 직접보유하고있지는 않으나 가지고 있는것 그리고 금 ETF를 보유하는 방법이 있습니다.
            </Typography>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                먼저 금을 직접보유하는 방법은 위에 설명드린 금으로 된 상품을 구매하여 집에 가지고 있는 방법입니다. 이는 실물을 직접 가지고 있으므로서 안정감을 가질 수 있으나, 파손/분실/도난의 위험이 있습니다.
            </Typography>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                두 번째로는 현물을 매매하고있지만 직접보유하고 있지 않는 방법이 있습니다. 저는 이 방법으로 금을 보유하고 있는데, 한국금거래소에서 제공하는 센골드라는 어플을 통해 금 교환증서를 가지고 있습니다. 이 방법은 실물을 가지고 있지 않아 보관에 비용소모가 없고, 0.01g 단위로 구매가 가능해 소액으로 매수/매도가 가능합니다. 그리고 100g단위로 실물(골드바)로 인출도 가능합니다.
            </Typography>
            <Typography
                sx={{
                    flex: "1 1 100%",
                    pt: { sm: 2 },
                }}
                variant="body1"
                component="div"
            >
                마지막으로 증권사에서 금 현물/선물 ETF를 통해 보유하는 방법입니다. 이 방법은 이용하던 증권사에서 바로 매수하면 되므로 위 2가지 방법에 비해 간편하게 접근이 가능합니다. 그리고, 현물 및 선물을 구매할 수 있어 선택의 폭이 넓어집니다.
            </Typography>
        </>
    )
}
