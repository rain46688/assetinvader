"use client"

import { useState, useEffect } from 'react';
import { sendGet } from '@/utils/fetch';

// material-ui 관련 임포트
import Paper from '@mui/material/Paper';
import { PieChart } from '@mui/x-charts/PieChart';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import { LineChart } from '@mui/x-charts/LineChart';

export default function SpendingLineChart() {

    // 데이터 저장
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        console.log(" === SpendingLineChart === ");
        CreateChart();
    }, []);

    // 차트 생성 함수
    const CreateChart = async () => {
        const id = sessionStorage.getItem('id');
        const res = await sendGet('/spending/getlist_spending/' + id);
        if (res.status === 'success') {
            // 데이터 저장
            const list = res.data;

            // A 그래프 데이터 생성
            const aGroupedData: { [key: string]: number[] } = {};
            list.forEach((item: { spnd_date: string, amount: number }) => {
                const year = item.spnd_date.slice(0, 4);
                const month = parseInt(item.spnd_date.slice(5, 7), 10);
                if (!aGroupedData[year]) {
                    aGroupedData[year] = new Array(12).fill(0);
                }
                aGroupedData[year][month - 1] += item.amount;
            });

            // B 그래프 데이터 생성
            const bGraphData: number[] = new Array(12).fill(0);
            for (let i = 0; i < 12; i++) {
                let total = 0;
                let count = 0;
                for (let j = 0; j < 12; j++) {
                    const date = new Date();
                    date.setMonth((i) - j);
                    const year = date.getFullYear().toString();
                    const month = date.getMonth();
                    if (aGroupedData[year] && aGroupedData[year][month] !== 0) {
                        total += aGroupedData[year][month];
                        count++;
                    }
                }
                bGraphData[i] = count > 0 ? Math.round(total / count) : 0;
            }

            // 통합 차트 데이터 담을 배열 선언
            const chartData = [];

            // chartData에 A 그래프 데이터 추가, 단 오늘 날짜 기준으로 이번 년도 데이터만 사용
            const today = new Date();
            const thisYear = today.getFullYear().toString();
            chartData.push({
                curve: "linear",
                id: '0',
                data: aGroupedData[thisYear],
                label: '월별 지출금액',
            });

            // chartData에 B 그래프 데이터 추가
            chartData.push({
                curve: "linear",
                id: '1',
                data: bGraphData,
                label: '월별 지출금액(12MA)',
            });
            console.log(chartData)

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

    return (
        <Paper sx={{ width: '100%'}}>
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
                    지출내역 기록 라인 차트
                </Typography>
                <Tooltip title="Refresh">
                    <IconButton aria-label="refresh" onClick={handleRefreshClick}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
            {chartData.length > 0 ? (
                <div
                    className="spendingLineChartClass"
                >
                    <LineChart
                        xAxis={[
                            {
                                scaleType: 'band',
                                data: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                                id: 'months',
                                label: '월별 지출',
                            },
                        ]}
                        series={chartData}
                        height={220}
                    />
                </div>
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