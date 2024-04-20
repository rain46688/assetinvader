"use client"

import { useState, useEffect } from 'react';
import { sendGet } from '@/utils/fetch';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';

import { formatDateV3 } from '@/utils/format';
import { getNextMonth } from '@/utils/util';

export default function AssetEarningChart() {

    // 데이터 저장
    const [chartData, setChartData] = useState<any[]>([]);
    const [thisYear, setThisYear] = useState(new Date().getFullYear().toString());

    useEffect(() => {
        console.log(" === AssetEarningLineBarChart === ");
        CreateChart();
    }, []);

    // 차트 생성 함수
    const CreateChart = async () => {
        const id = sessionStorage.getItem('id');
        const res = await sendGet('/assettransaction/getlist_assettransaction_main/' + id);
        if (res.status === 'success') {
            // 데이터 저장
            const list = res.data;

            // A 그래프 데이터 생성
            const sumData: { [key: string]: number } = {};
            const stackData: { [key: string]: number } = {};
            const aGroupedData: { [key: string]: number[] } = {};
            const bGroupedData: { [key: string]: number[] } = {};

            list.forEach((item: { trns_type: string, trns_date: string, cash_amount: number }) => {
                if (item.trns_type === "매수" || item.trns_type === "매도")
                    return;
                const formatted_trns_date = formatDateV3(item.trns_date)
                const year = formatted_trns_date.slice(0, 4);
                const month = parseInt(formatted_trns_date.slice(5, 7), 10);
                if (!aGroupedData[year]) {
                    aGroupedData[year] = new Array(12).fill(0);
                }
                aGroupedData[year][month - 1] += item.cash_amount;
                const strMonth = month < 10 ? '0' + month : month.toString();
                if (!sumData[year + "-" + strMonth]) {
                    sumData[year + "-" + strMonth] = 0;
                }
                sumData[year + "-" + strMonth] += item.cash_amount;
            });

            // 객체의 키를 배열로 추출하고 정렬
            const sortedKeys = Object.keys(sumData).sort();

            // 정렬된 키를 기반으로 새로운 객체 생성
            const sortedSumData: { [key: string]: number } = {};
            sortedKeys.forEach(key => {
                sortedSumData[key] = sumData[key];
            });

            // 월별 데이터 누적 배열 생성
            // 1. 시작 날짜와 끝 날짜 찾기
            const start_date: string = Object.keys(sortedSumData).reduce((a, b) => a < b ? a : b).slice(0, 5) + '01';
            const end_date: string = Object.keys(sortedSumData).reduce((a, b) => a > b ? a : b).slice(0, 5) + '12';

            // 2. 시작 날짜부터 끝 날짜까지 누적
            let current_total: number = 0;
            for (let date = start_date; date <= end_date; date = getNextMonth(date)) {
                if (date in sortedSumData) {
                    current_total += sortedSumData[date];
                }
                stackData[date] = current_total;
            }
            console.log(stackData);

            // B 그래프 데이터 생성
            const stackDataKeys = Object.keys(stackData);
            stackDataKeys.forEach(key => {
                const value = stackData[key];
                const year = key.slice(0, 4);
                const month = parseInt(key.slice(5, 7), 10);
                if (!bGroupedData[year]) {
                    bGroupedData[year] = new Array(12).fill(0);
                }
                bGroupedData[year][month - 1] += value;
            });

            // 통합 차트 데이터 담을 배열 선언
            const chartData = [];

            // chartData에 A 그래프 데이터 추가, 단 오늘 날짜 기준으로 이번 년도 데이터만 사용
            chartData.push({
                type: 'bar',
                id: 'earnings',
                label: '월별 수익',
                yAxisKey: 'earnings',
                data: aGroupedData[thisYear],
            });

            // chartData에 B 그래프 데이터 추가
            chartData.push({
                type: 'line',
                id: 'stackEarnings',
                label: '누적 수익',
                yAxisKey: 'stackEarnings',
                data: bGroupedData[thisYear],
            });

            // 데이터 저장
            setChartData(chartData);
        } else {
            console.log('error');
        }
    };

    // 새로고침 버튼 클릭 이벤트
    const handleRefreshClick = () => {
        CreateChart();
    };


    // 날짜 선택 이벤트
    const handleDateAccept = (date: any) => {
        console.log(" === handleDateAccept === ");
        setThisYear(date.$y);
    };

    return (
        <Paper sx={{ width: '100%', mb: 2 }}>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                }}>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div">
                    수익내역기록 차트
                </Typography>
                {/*  */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{ width: '33%' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: '10vh' }}>
                            </div>
                            <MobileDatePicker
                                format="YYYY"
                                sx={{
                                    '& .MuiInputBase-root': {
                                        width: '100%',
                                        fontSize: '15px',
                                    }
                                }}
                                views={['year']}
                                onAccept={(date) => { handleDateAccept(date) }}
                                value={dayjs(thisYear + '')}
                            />
                        </div>
                    </DemoContainer>
                </LocalizationProvider>
                {/*  */}
                <Tooltip title="Refresh">
                    <IconButton aria-label="refresh" onClick={handleRefreshClick}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
                {/*  */}
            </Toolbar>
            {chartData.length > 0 ? (
                <Box sx={{ width: '100%' }}>
                    <ResponsiveChartContainer
                        xAxis={[
                            {
                                scaleType: 'band',
                                data: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                                id: 'months',
                                label: 'Months',
                            },
                        ]}
                        yAxis={[{ id: 'stackEarnings' }, { id: 'earnings' }]}
                        series={chartData}
                        height={400}
                        margin={{ left: 70, right: 70 }}
                        sx={{
                            [`.${axisClasses.left} .${axisClasses.label}`]: {
                                transform: 'translate(-25px, 0)',
                            },
                            [`.${axisClasses.right} .${axisClasses.label}`]: {
                                transform: 'translate(30px, 0)',
                            },
                        }}
                    >
                        <BarPlot />
                        <LinePlot />
                        <MarkPlot />
                        <ChartsLegend direction='row' />
                        <ChartsXAxis axisId="months" label= {thisYear + " months"} labelFontSize={18} />
                        <ChartsYAxis axisId="earnings" label="월별 수익" />
                        <ChartsYAxis axisId="stackEarnings" position="right" label="누적 수익" />
                        <ChartsTooltip />
                    </ResponsiveChartContainer>
                </Box>
            ) : (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '8vh',
                }}>
                    <Typography variant="body1" align="center">
                        {'데이터가 없습니다.'}
                    </Typography>
                </Box>
            )}
        </Paper>


    );
}