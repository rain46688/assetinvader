"use client";

import { useState, useEffect } from "react";
import { sendGet } from "@/utils/fetch";
import { CashFlowData, createData } from "@/redux/cash_flow/CashFlow";
import { parseNumber } from '@/utils/format';
import { formatDateV3 } from "@/utils/format";

// material-ui 관련 임포트
import Paper from "@mui/material/Paper";
import { BarChart } from "@mui/x-charts/BarChart";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";

interface barSeries {
    data: any[];
    stack: string;
    label: string;
}

interface CashFlowBarChartProps {
    year: string;
}

export default function CashFlowBarChart(props: CashFlowBarChartProps) {
    // 데이터 저장
    const [chartData, setChartData] = useState<barSeries[]>([]);
    const { year } = props;

    useEffect(() => {
        console.log(" === CashFlowBarChart === ");
        CreateChart(year);
    }, [year]);

    // 차트 생성 함수
    const CreateChart = async (year: string) => {
        const id = sessionStorage.getItem("id");
        const res_cashflow = await sendGet(`/cashflow/getlist_cashflow/${id}`);
        const res_interest = await sendGet(`/interest/getlist_interest/${id}`);
        let series: barSeries[] = [];
        if (
            res_cashflow.status === "success" &&
            res_interest.status === "success"
        ) {
            // 데이터 저장
            const list_cashflow = res_cashflow.data; // 배당 데이터 로드
            const list_interest = res_interest.data; // 이자 데이터 로드
            // console.log(list_cashflow);
            // console.log(list_interest);
            // 데이터 변환(cashflow)
            let newList = list_cashflow.map((item: any, index: number) => {
                // cash_flow 값이 없는경우 0으로 채움
                let cashFlowList = {
                    jan: 0,
                    feb: 0,
                    mar: 0,
                    apr: 0,
                    may: 0,
                    jun: 0,
                    jul: 0,
                    aug: 0,
                    sep: 0,
                    oct: 0,
                    nov: 0,
                    dec: 0,
                };
                if ((item as any).cash_flow != undefined) {
                    const cash_flow_list = (item as any).cash_flow;
                    cash_flow_list.map((item: any) => {
                        const [itemYear, itemMonth] = formatDateV3(
                            item.occurrence_date
                        ).split("-");
                        if (itemYear != year) return;
                        switch (itemMonth) {
                            case "01":
                                cashFlowList.jan += item.amount;
                                break;
                            case "02":
                                cashFlowList.feb += item.amount;
                                break;
                            case "03":
                                cashFlowList.mar += item.amount;
                                break;
                            case "04":
                                cashFlowList.apr += item.amount;
                                break;
                            case "05":
                                cashFlowList.may += item.amount;
                                break;
                            case "06":
                                cashFlowList.jun += item.amount;
                                break;
                            case "07":
                                cashFlowList.jul += item.amount;
                                break;
                            case "08":
                                cashFlowList.aug += item.amount;
                                break;
                            case "09":
                                cashFlowList.sep += item.amount;
                                break;
                            case "10":
                                cashFlowList.oct += item.amount;
                                break;
                            case "11":
                                cashFlowList.nov += item.amount;
                                break;
                            case "12":
                                cashFlowList.dec += item.amount;
                                break;
                        }
                    });
                }

                // 타입 변환 필요
                return createData(
                    item.id,
                    item.asset_name,
                    item.asset_big_class,
                    cashFlowList.jan,
                    cashFlowList.feb,
                    cashFlowList.mar,
                    cashFlowList.apr,
                    cashFlowList.may,
                    cashFlowList.jun,
                    cashFlowList.jul,
                    cashFlowList.aug,
                    cashFlowList.sep,
                    cashFlowList.oct,
                    cashFlowList.nov,
                    cashFlowList.dec
                );
            });
            // console.log(newList);
            // debugger;
            // 데이터 변환(interest)
            for (const asset of list_interest) {
                if ((asset as any).interest != undefined) {
                    const interest_list = (asset as any).interest;
                    for (const interest of interest_list) {
                        console.log(interest);
                        const [itemYear, itemMonth] = formatDateV3(
                            interest.occurrence_date
                        ).split("-");
                        if (itemYear != year) continue;
                        switch (itemMonth) {
                            case "01":
                                newList.find(
                                    (item: CashFlowData) => item.id === asset.id
                                ).jan += interest.amount;
                                break;
                            case "02":
                                newList.find(
                                    (item: CashFlowData) => item.id === asset.id
                                ).feb += interest.amount;
                                break;
                            case "03":
                                newList.find(
                                    (item: CashFlowData) => item.id === asset.id
                                ).mar += interest.amount;
                                break;
                            case "04":
                                newList.find(
                                    (item: CashFlowData) => item.id === asset.id
                                ).apr += interest.amount;
                                break;
                            case "05":
                                newList.find(
                                    (item: CashFlowData) => item.id === asset.id
                                ).may += interest.amount;
                                break;
                            case "06":
                                newList.find(
                                    (item: CashFlowData) => item.id === asset.id
                                ).jun += interest.amount;
                                break;
                            case "07":
                                newList.find(
                                    (item: CashFlowData) => item.id === asset.id
                                ).jul += interest.amount;
                                break;
                            case "08":
                                newList.find(
                                    (item: CashFlowData) => item.id === asset.id
                                ).aug += interest.amount;
                                break;
                            case "09":
                                newList.find(
                                    (item: CashFlowData) => item.id === asset.id
                                ).sep += interest.amount;
                                break;
                            case "10":
                                newList.find(
                                    (item: CashFlowData) => item.id === asset.id
                                ).oct += interest.amount;
                                break;
                            case "11":
                                newList.find(
                                    (item: CashFlowData) => item.id === asset.id
                                ).nov += interest.amount;
                                break;
                            case "12":
                                newList.find(
                                    (item: CashFlowData) => item.id === asset.id
                                ).dec += interest.amount;
                                break;
                        }
                    }
                }
            }
            // console.log(newList);
            // 대분류 기준으로 병합
              const mergedData:any[]= Object.values(
                newList.reduce(
                  (acc: { [key: string]: any }, current: CashFlowData) => {
                    const key = current.asset_big_class;

                    if (!acc[key]) {
                      acc[key] = {
                        //  ...current
                        asset_big_class : current.asset_big_class,
                        jan: current.jan,
                        feb: current.feb,
                        mar: current.mar,
                        apr: current.apr,
                        may: current.may,
                        jun: current.jun,
                        jul: current.jul,
                        aug: current.aug,
                        sep: current.sep,
                        oct: current.oct,
                        nov: current.nov,
                        dec: current.dec,
                        };
                    } else {
                      acc[key].jan += current.jan;
                      acc[key].feb += current.feb;
                      acc[key].mar += current.mar;
                      acc[key].apr += current.apr;
                      acc[key].may += current.may;
                      acc[key].jun += current.jun;
                      acc[key].jul += current.jul;
                      acc[key].aug += current.aug;
                      acc[key].sep += current.sep;
                      acc[key].oct += current.oct;
                      acc[key].nov += current.nov;
                      acc[key].dec += current.dec;
                    }

                    return acc;
                  },
                  {}
                )
              );
            //   console.log(mergedData);
            // 병합된 데이터를 차트 형식으로 변환
            for (const item of mergedData) {
                series = [
                    {
                        data: [item.jan, item.feb, item.mar, item.apr, item.may, item.jun, item.jul, item.aug, item.sep, item.oct, item.nov, item.dec],
                        stack: 'sum',
                        label: item.asset_big_class
                    },
                    ...series];
            }
        } else {
            console.log("error");
        }
        // console.log(series);
        setChartData(series);
    };

    // 새로고침 버튼 클릭 이벤트
    const handleRefreshClick = () => {
        console.log(year);
        CreateChart(year);
    };

    return (
        <Paper
            sx={{
                width: "100%",
                mb: 2,
            }}
        >
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                }}
            >
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    월별 이자·배당 예상금 차트
                </Typography>
                {/*  */}
                <Tooltip title="Refresh">
                    <IconButton aria-label="refresh" onClick={handleRefreshClick}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
                {/*  */}
            </Toolbar>
            {chartData.length > 0 ? (
                <BarChart
                    series={chartData}
                    height={350}
                    margin={{ left: 100, top: 100 }}
                    xAxis={[
                        {
                            data: [
                                "1월",
                                "2월",
                                "3월",
                                "4월",
                                "5월",
                                "6월",
                                "7월",
                                "8월",
                                "9월",
                                "10월",
                                "11월",
                                "12월",
                            ],
                            scaleType: "band",
                            id: "months",
                            label: "월",
                            valueFormatter: (code: string, context) => {
                                if (context.location === 'tick')
                                    return code
                                else {
                                    const label = Number(code.replace('월', '')) - 1
                                    const value = chartData[0].data[label] + chartData[1].data[label] + chartData[2].data[label] + chartData[3].data[label];
                                    return code + '(총계: ' + `${parseNumber(value)}` + ')'
                                }
                            }
                        },
                    ]}
                />
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "8vh",
                    }}
                >
                    <Typography variant="body1" align="center">
                        {"데이터가 없습니다."}
                    </Typography>
                </Box>
            )}
        </Paper>
    );
}
