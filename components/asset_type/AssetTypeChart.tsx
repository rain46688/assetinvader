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

export default function AssetTypeChart() {

    // 데이터 저장
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        console.log(" === AssetTypeChart === ");
        CreateChart();
    }, []);

    // 차트 생성 함수
    const CreateChart = async () => {
        const id = sessionStorage.getItem('id');
        const res = await sendGet('/asset/getlist_asset_type/' + id);
        if (res.status === 'success') {
            // 데이터 저장
            const list = res.data;
            // 데이터 그룹핑
            const groupedData = list.reduce((acc: { [key: string]: number }, current: { asset_type: string, amount: number }) => {
                if (!acc[current.asset_type]) {
                    acc[current.asset_type] = 0;
                }
                acc[current.asset_type] += current.amount;
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
            <Tooltip title="Refresh">
                <IconButton aria-label="refresh" onClick={handleRefreshClick}>
                    <RefreshIcon />
                </IconButton>
            </Tooltip>
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
                    <Typography variant="h5" component="h3" align="center">
                        {'데이터가 없습니다.'}
                    </Typography>
                </Box>
            )}
        </Paper>
    );
}