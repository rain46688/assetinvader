"use client"

import { useState, useEffect } from 'react';
import { sendGet } from '@/utils/fetch';

// material-ui 관련 임포트
import Paper from '@mui/material/Paper';
import { PieChart } from '@mui/x-charts/PieChart';
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
            // 데이터 그룹핑
            const groupedData: { [key: string]: number[] } = {};
            list.forEach((item: { spnd_type: string, spnd_date: string, amount: number }) => {
                if (!groupedData[item.spnd_type]) {
                    groupedData[item.spnd_type] = Array(12).fill(0); // 12개 월에 대한 초기값 설정
                }
                const monthIndex = parseInt(item.spnd_date.split('-')[1]) - 1; // 월별 인덱스 계산
                groupedData[item.spnd_type][monthIndex] += item.amount; // 해당 월에 amount 누적
            });

            // 차트 데이터 생성
            const chartData = [];
            for (const spnd_type in groupedData) {
                if (groupedData.hasOwnProperty(spnd_type)) {
                    chartData.push({
                        curve: "linear",
                        label: spnd_type,
                        data: groupedData[spnd_type]
                    });
                }
            }

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
                    지출내역 기록 라인 차트
                </Typography>
                <Tooltip title="Refresh">
                    <IconButton aria-label="refresh" onClick={handleRefreshClick}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
            {chartData.length > 0 ? (
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
                    series={chartData}
                    height={220}
                    margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                />
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