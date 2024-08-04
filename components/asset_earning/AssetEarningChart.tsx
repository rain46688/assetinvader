"use client"

import { useState, useEffect } from 'react';
import { sendGet } from '@/utils/fetch';
import { ChangeEvent } from 'react';

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
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import NativeSelect from '@mui/material/NativeSelect';

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
    const [detailChartData, setDetailChartData] = useState<any[]>([]);

    // 선택 데이터 저장
    const [chartTypeName, setChartTypeName] = useState('월별');

    useEffect(() => {
        console.log(" === AssetEarningChart(main, detail) === ");
        CreateChart();
    }, [thisYear, chartTypeName]);

    // 차트 생성 함수
    const CreateChart = async () => {
        const id = sessionStorage.getItem('id');
        const res = await sendGet('/assetearning/getlist_assetearning/' + id);
        if (res.status === 'success') {
            // A : 월별수익, B : 월별 누적수익, C: 월별 종류별 수익
            // 데이터 저장
            const list = res.data;

            // A 그래프 데이터 생성
            const sumData: { [key: string]: number } = {};
            const stackData: { [key: string]: number } = {};
            const aGroupedData: { [key: string]: number[] } = {};
            const bGroupedData: { [key: string]: number[] } = {};
            const cGroupedData: { [key: string]: number[][] } = {};

            // 통합 차트 데이터 담을 배열 선언
            const chartData = [];

            // 종류 헤더 배열 선언
            const typeList = ['매매', '배당금', '은행이자', '채권이자', '공모주'];

            if (Object.keys(list).length !== 0) {
                list.forEach((item: { trns_type: string, trns_date: string, amount: number }) => {
                    const formatted_trns_date = formatDateV3(item.trns_date)
                    const year = formatted_trns_date.slice(0, 4);
                    const month = parseInt(formatted_trns_date.slice(5, 7), 10);

                    // A 그래프 데이터 생성
                    if (!aGroupedData[year]) {
                        aGroupedData[year] = new Array(12).fill(0);
                    }
                    aGroupedData[year][month - 1] += item.amount;

                    // B 그래프 데이터 전처리
                    const strMonth = month < 10 ? '0' + month : month.toString();
                    if (!sumData[year + "-" + strMonth]) {
                        sumData[year + "-" + strMonth] = 0;
                    }
                    sumData[year + "-" + strMonth] += item.amount;

                    // C 그래프 데이터 생성
                    if (!cGroupedData[year]) {
                        cGroupedData[year] = Array.from({ length: 12 }, () => Array(5).fill(0));
                    }
                    cGroupedData[year][month - 1][typeList.indexOf(item.trns_type)] += item.amount;
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

                // 2. 시작 날짜부터 끝 날짜까지 연별로 누적
                let current_total: number = 0;
                for (let date = start_date; date <= end_date; date = getNextMonth(date)) {
                    if (date.slice(5, 7) == '01')
                        current_total = 0;
                    if (date in sortedSumData) {
                        current_total += sortedSumData[date];
                    }
                    stackData[date] = current_total;
                }

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

                // chartData에 A 그래프 데이터 추가, 단 오늘 날짜 기준으로 이번 년도 데이터만 사용 
                if (typeof aGroupedData[thisYear] !== 'undefined' && chartTypeName == '월별') {
                    chartData.push({
                        type: 'bar',
                        id: 'earnings',
                        label: '월별 수익',
                        yAxisKey: 'earnings',
                        color: 'red',
                        data: aGroupedData[thisYear],
                    });
                }

                // chartData에 B 그래프 데이터 추가 
                if (typeof bGroupedData[thisYear] !== 'undefined' && chartTypeName != '월별') {
                    chartData.push({
                        type: 'line',
                        id: 'stackEarnings',
                        label: '누적 수익',
                        yAxisKey: 'stackEarnings',
                        color: 'red',
                        data: bGroupedData[thisYear],
                    });
                }
            }

            // C 그래프 데이터 형식변경
            // 형식에 맞게 변환된 데이터 
            const yearData = cGroupedData[thisYear];
            const result = [];
            for (let i = 0; i < typeList.length; i++) {
                const data = yearData.map(row => row[i]);
                result.push({
                    label: typeList[i],
                    data: data
                });
            }

            // 데이터 저장
            setChartData(chartData);
            setDetailChartData(result);
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
                <NativeSelect
                    value={chartTypeName}
                    onChange={(event: ChangeEvent<any>) => {
                        setChartTypeName(event.target.value)
                    }}
                    style={{ width: '150px', border: 'none' }}
                    inputProps={{ 'aria-label': 'Without label' }}>
                    <option value={'월별'}>월별</option>
                    <option value={'누적'}>누적</option>
                </NativeSelect>
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
                    {chartTypeName == "월별" ? (
                        <>
                            <Typography
                                sx={{ pl: { sm: 2 }, flex: '1 1 100%' }}
                                variant="subtitle2"
                                id="tableTitle"
                                component="div">
                                월별 막대 선택 시 종류별 수익현황을 확인할 수 있습니다.
                            </Typography>
                            <ResponsiveChartContainer
                                xAxis={[
                                    {
                                        scaleType: 'band',
                                        data: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                                        id: 'months',
                                        label: 'Months',
                                    },
                                ]}
                                yAxis={[
                                    {
                                        id: 'earnings',
                                        colorMap: {
                                            type: 'piecewise',
                                            thresholds: [0],
                                            colors: ['blue', 'red'],
                                        },
                                    }
                                ]}
                                series={chartData}
                                height={400}
                                margin={{ left: 100 }}
                                sx={{
                                    [`.${axisClasses.left} .${axisClasses.label}`]: {
                                        transform: 'translate(-45px, 0)',
                                    },
                                    // [`.${axisClasses.right} .${axisClasses.label}`]: {
                                    //     transform: 'translate(30px, 0)',
                                    // },
                                }}
                            >
                                <BarPlot />
                                <ChartsLegend direction='row' />
                                <ChartsXAxis axisId="months" label={thisYear + "년 월별 수익"} />
                                <ChartsYAxis axisId="earnings" label="월별 수익" />
                                <ChartsTooltip />
                            </ResponsiveChartContainer>
                        </>
                    ) : (
                        <ResponsiveChartContainer
                            xAxis={[
                                {
                                    scaleType: 'band',
                                    data: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                                    id: 'months',
                                    label: 'Months',
                                },
                            ]}
                            yAxis={[
                                {
                                    id: 'stackEarnings',
                                    colorMap: {
                                        type: 'piecewise',
                                        thresholds: [0],
                                        colors: ['blue', 'red'],
                                    },
                                }
                            ]}
                            series={chartData}
                            height={400}
                            margin={{ left: 100 }}
                            sx={{
                                [`.${axisClasses.left} .${axisClasses.label}`]: {
                                    transform: 'translate(-45px, 0)',
                                },
                                // [`.${axisClasses.right} .${axisClasses.label}`]: {
                                //     transform: 'translate(30px, 0)',
                                // },
                            }}
                        >
                            <LinePlot />
                            <MarkPlot />
                            <ChartsLegend direction='row' />
                            <ChartsXAxis axisId="months" label={thisYear + "년 월별 수익"} />
                            <ChartsYAxis axisId="stackEarnings" label="누적 수익" />
                            <ChartsTooltip />
                        </ResponsiveChartContainer>
                    )}
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
            {detailChartData.length > 0 ? (
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <Toolbar
                        sx={{
                            pl: { sm: 2 },
                            pr: { xs: 1, sm: 1 },
                        }}>
                        <Typography
                            sx={{
                                flex: '1 1 100%',
                                pt: { sm: 2 }
                            }}
                            variant="h6"
                            id="tableTitle"
                            component="div">
                            종류별 수익차트
                        </Typography>
                    </Toolbar>
                    <BarChart
                        series={detailChartData}
                        height={350}
                        margin={{ left: 100, top: 100 }}
                        xAxis={[{
                            data: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                            scaleType: 'band',
                            id: 'months',
                            label: "월"
                        }]}
                    />
                </Paper>
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
        </Paper >
    );
}