"use client"

import { useState, useEffect } from 'react';
import { sendGet } from '@/utils/fetch';

// material-ui 관련 임포트
import Paper from '@mui/material/Paper';
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
            // 데이터 저장 및 현재 월 기준으로 과거 2년치 데이터만 필터링
            const list = res.data;
            let current_date = new Date();
            const current_year = current_date.getFullYear().toString();
            const current_month = current_date.getMonth()+1;
            const current_YM = current_year+'-'+current_month.toString().padStart(2, '0');
            let past_date = new Date();
            past_date.setMonth(current_date.getMonth()-23);
            const past_year = past_date.getFullYear().toString();
            const past_month = past_date.getMonth()+1;
            const past_YM = past_year+'-'+past_month.toString().padStart(2, '0');
            const newList = list.filter((item: { spnd_date: string, amount: number }) => {
                const year = item.spnd_date.slice(0, 4);
                const month = parseInt(item.spnd_date.slice(5, 7), 10);
                const YM = year+'-'+month.toString().padStart(2, '0');
                const check = (past_YM <= YM) && (YM <= current_YM);
                // console.log(year+'-'+month+'==>'+check);
                return check;
            })

            // A 그래프 데이터 생성
            let aGroupedData:number[] = [];
            let tempData:number[] = [];
            aGroupedData = new Array(12).fill(0);
            tempData = new Array(24).fill(0);
            newList.forEach((item: { spnd_date: string, amount: number }) => {
                const year = item.spnd_date.slice(0, 4);
                const month = parseInt(item.spnd_date.slice(5, 7), 10);
                const diff = (Number(year) - Number(past_year))*12 + (Number(month.toString().padStart(2, '0')) - Number(past_month.toString().padStart(2, '0')));
                // console.log(year+'-'+month+'='+diff);
                if((diff-12) >= 0)
                    aGroupedData[diff-12] += item.amount;
                tempData[diff] += item.amount;
            });

            // B 그래프 데이터 생성
            const bGroupedData: number[] = new Array(12).fill(0);
            for (let i = 0; i < 12; i++) {
                let total = 0;
                let count = 0;
                for (let j = 1+i; j < 13+i; j++) {
                    if(tempData[j] != 0) {
                        count++;
                        total += tempData[j];
                    }
                }
                bGroupedData[i] = count > 0 ? Math.round(total / count) : 0;
            }
            // console.log(bGroupedData);

            // 통합 차트 데이터 담을 배열 선언
            const chartData = [];

            // chartData에 A 그래프 데이터 추가, 단 오늘 날짜 기준으로 이번 년도 데이터만 사용
            if (typeof aGroupedData !== 'undefined') {
                chartData.push({
                    curve: "linear",
                    id: '0',
                    data: aGroupedData,
                    label: '월별 지출금액',
                });
            }

            // chartData에 B 그래프 데이터 추가
            if (typeof bGroupedData !== 'undefined') {
                chartData.push({
                    curve: "linear",
                    id: '1',
                    data: bGroupedData,
                    label: '월별 지출금액(12MA)',
                });
            }

            // 데이터 저장
            setChartData(chartData);
        } else {
            console.log('error');
        }
    };

    const getYearMonth = (code:string) => {
        let mod_code = code.replace('M','').replace('-','');
        let num = 0;
        const today = new Date();
        const date = new Date();
        if(mod_code.length != 0)
            num = Number(mod_code);
        date.setMonth(today.getMonth()-num);
        const str_date = date.getFullYear().toString()+'-'+(date.getMonth()+1).toString().padStart(2, '0');;
        return str_date;
    }

    // 새로고침 버튼 클릭 이벤트
    const handleRefreshClick = () => {
        CreateChart();
    };

    return (
        <Paper sx={{ width: '100%' }}>
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
            {chartData.length > 1 ? (
                <LineChart
                    sx={{
                        p: 1,
                    }}
                    xAxis={[
                        {
                            scaleType: 'band',
                            data: ['M-11', 'M-10', 'M-9', 'M-8', 'M-7', 'M-6', 'M-5', 'M-4', 'M-3', 'M-2', 'M-1', 'M'],
                            id: 'months',
                            label: '최근 12개월 지출',
                            valueFormatter: (code: string, context) => {
                                const str_date = getYearMonth(code);
                                if (context.location === 'tick')
                                    return code
                                else {
                                    return code+'('+str_date+')'
                                }
                            }
                        },
                    ]}
                    series={chartData}
                    height={250}
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