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

export default function AssetClassChart() {

    // 데이터 저장
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        console.log(" === AssetClassChart === ");
        CreateChart();
    }, []);

    // 차트 생성 함수
    const CreateChart = async () => {
        const id = sessionStorage.getItem('id');
        const res = await sendGet('/asset/getlist_asset_class/' + id);
        if (res.status === 'success') {
            // 데이터 저장
            const list = res.data;
            // 데이터 그룹핑
            const groupedData = list.reduce((acc: { [key: string]: number }, current: { asset_big_class: string, amount: number }) => {
                if (!acc[current.asset_big_class]) {
                    acc[current.asset_big_class] = 0;
                }
                acc[current.asset_big_class] += current.amount;
                return acc;
            }, {});

            // 형식에 맞게 변환된 데이터
            const data = Object.entries(groupedData).map(([label, value], id) => ({ id, value, label }));
            // 데이터 저장
            setChartData(data);
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
                    분류별 자산차트
                </Typography>
                <Tooltip title="Refresh">
                    <IconButton aria-label="refresh" onClick={handleRefreshClick}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
            {chartData.length > 0 ? (
                <PieChart series={[
                    {
                        data: chartData,
                        innerRadius: 30,
                        outerRadius: 120,
                        paddingAngle: 2,
                        cornerRadius: 5,
                        cy: 120,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    },
                ]} height={300} />
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