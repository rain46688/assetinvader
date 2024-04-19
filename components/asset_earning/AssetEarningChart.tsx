"use client"

import { useState, useEffect } from 'react';
import { sendGet } from '@/utils/fetch';

import * as React from 'react';
import Box from '@mui/material/Box';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot } from '@mui/x-charts/LineChart';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

import { formatDateV3 } from '@/utils/format';

export default function AssetEarningChart() {

    // 데이터 저장
    const [chartData, setChartData] = useState<any[]>([]);

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
            const sortedSumDataKeys = Object.keys(sortedSumData);
            let sum = 0;
            sortedSumDataKeys.forEach(key => {
                const value = sumData[key];
                sum += value;
                stackData[key] = sum;
            });

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
            console.log(bGroupedData);

            // // 통합 차트 데이터 담을 배열 선언
            // const chartData = [];

            // // chartData에 A 그래프 데이터 추가, 단 오늘 날짜 기준으로 이번 년도 데이터만 사용
            // const today = new Date();
            // const thisYear = today.getFullYear().toString();
            // chartData.push({
            //     curve: "linear",
            //     id: '0',
            //     data: aGroupedData[thisYear],
            //     label: '월별 지출금액',
            // });

            // // chartData에 B 그래프 데이터 추가
            // chartData.push({
            //     curve: "linear",
            //     id: '1',
            //     data: bGraphData,
            //     label: '월별 지출금액(12MA)',
            // });

            // // 데이터 저장
            // setChartData(chartData);
        } else {
            console.log('error');
        }
    };

    // 새로고침 버튼 클릭 이벤트
    const handleRefreshClick = () => {
        CreateChart();
    };


    return (
        <Box sx={{ width: '100%' }}>
            <ResponsiveChartContainer
                xAxis={[
                    {
                        scaleType: 'band',
                        data: ['Q1', 'Q2', 'Q3', 'Q4'],
                        id: 'quarters',
                        label: 'Quarters',
                    },
                ]}
                yAxis={[{ id: 'money' }, { id: 'quantities' }]}
                series={[
                    {
                        type: 'line',
                        id: 'revenue',
                        yAxisKey: 'money',
                        data: [5645, 7542, 9135, 12221],
                    },
                    {
                        type: 'bar',
                        id: 'cookies',
                        yAxisKey: 'quantities',
                        data: [3205, 2542, 3135, 8374],
                    },
                ]}
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
                <ChartsXAxis axisId="quarters" label="2021 quarters" labelFontSize={18} />
                <ChartsYAxis axisId="quantities" label="# units sold" />
                <ChartsYAxis axisId="money" position="right" label="revenue" />
            </ResponsiveChartContainer>
        </Box>
    );
}