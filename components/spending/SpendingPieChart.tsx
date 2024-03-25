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

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';

export default function SpendingPieChart() {

    // 데이터 저장
    const [chartData, setChartData] = useState<any[]>([]);
    const [year, setYear] = useState<string>(new Date().getFullYear().toString());
    const [month, setMonth] = useState<string>((new Date().getMonth() + 1).toString());

    useEffect(() => {
        console.log(" === SpendingPieChart === ");
        CreateChart(year, month);
    }, []);

    // 차트 생성 함수
    const CreateChart = async (year: string, month: string) => {
        const id = sessionStorage.getItem('id');
        const res = await sendGet(`/spending/getlist_spending/${id}`);
        if (res.status === 'success') {
            // 데이터 저장
            const list = res.data;

            // 년도와 월에 맞는 데이터만 필터링
            const filteredList = list.filter((item: { spnd_date: string }) => {
                const [itemYear, itemMonth] = item.spnd_date.split('-');
                return itemYear === year && (itemMonth === month || itemMonth === '0' + month);
            });

            // 데이터 그룹핑
            const groupedData = filteredList.reduce((acc: { [key: string]: number }, current: { spnd_type: string, amount: number }) => {
                if (!acc[current.spnd_type]) {
                    acc[current.spnd_type] = 0;
                }
                acc[current.spnd_type] += current.amount;
                return acc;
            }, {});

            // 형식에 맞게 변환된 데이터
            const data = Object.entries(groupedData).map(([label, value], id) => ({ id, value, label }));
            // 데이터 저장
            setYear(year);
            setMonth(month);
            setChartData(data);
        } else {
            console.log('error');
        }
    };

    // 새로고침 버튼 클릭 이벤트
    const handleRefreshClick = () => {
        const year = new Date().getFullYear().toString();
        const month = (new Date().getMonth() + 1).toString();
        CreateChart(year, month);
    };

    // 날짜 선택 이벤트
    const handleDateAccept = (date: any) => {
        console.log(" === handleDateAccept === ");
        CreateChart(date.$y + '', date.$M + 1 + '')
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
                    지출내역 기록 파이 차트
                </Typography>
                {/*  */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{ width: '33%' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: '10vh' }}>
                            </div>
                            <MobileDatePicker
                                format="YYYY-MM"
                                sx={{
                                    '& .MuiInputBase-root': {
                                        width: '100%',
                                        fontSize: '15px',
                                    }
                                }}
                                views={['month', 'year']}
                                onAccept={(date) => { handleDateAccept(date) }}
                                value={dayjs((year) + '-' + (month))}
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
                <PieChart series={[
                    {
                        data: chartData,
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 5,
                        cy: 100,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    },
                ]} height={220} />
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