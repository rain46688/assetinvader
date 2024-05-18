"use client"

import { useState, useEffect } from 'react';
import { sendGet } from '@/utils/fetch';
import { parseNumber } from '@/utils/format';
import { formatDateV3 } from '@/utils/format';
import { AssetRecord } from '@/redux/asset_record/AssetRecord';

// material-ui 관련 임포트
import Paper from '@mui/material/Paper';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';

// 차트관련
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';

interface barSeries {
    data: any[],
    stack: string,
    label: string,
}

export default function AssetRecordChart() {

    // 차트 합계값 저장
    const [chartData, setChartData] = useState<barSeries[]>([]);
    const [thisYear, setThisYear] = useState(new Date().getFullYear().toString());

    useEffect(() => {
        console.log(" === AssetClassChart === ");
        CreateChart(thisYear);
    }, [thisYear]);


    // 월별 데이터를 누적하기 위한 함수
    const accumulateData = (result: any[], asset_big_class: string, month: string, amount: number) => {
        const index = result.findIndex(item => item.name === asset_big_class);
        if (index !== -1) {
            result[index].data[month] = (result[index].data[month] || 0) + amount;
        }
    }

    // 차트 생성 함수
    const CreateChart = async (year: string) => {
        const id = sessionStorage.getItem('id');
        const res = await sendGet('/assetrecord/getlist_assetrecord/' + id);
        let series: barSeries[] = []
        if (res.status === 'success') {
            // 데이터 가져오기
            const list: any[] = res.data;

            // 초기 결과 배열
            const result: any[] = [
                { name: "배당자산", data: {} },
                { name: "투자자산", data: {} },
                { name: "안전자산", data: {} },
                { name: "현금자산", data: {} },
            ];

            // 1월부터 12월까지 모든 자산의 데이터를 0으로 초기화
            result.forEach(res_data => {
                for (let i = 1; i <= 12; i++) {
                    const month = i.toString().padStart(2, '0'); // 월을 두 자리 숫자로 포맷팅
                    res_data.data[month] = 0;
                }
            });

            // 데이터 저장 및 변환
            list.forEach(list_data => {
                const [itemYear, itemMonth] = formatDateV3(list_data.record_date).split("-");
                if (itemYear == year) {
                    accumulateData(result, list_data.asset_big_class, itemMonth, list_data.amount);
                }
            });

            // 차트 데이터 형식으로 변경
            for (const item of result) {
                series = [
                    {
                        data:[
                            item.data['01'],
                            item.data['02'], 
                            item.data['03'], 
                            item.data['04'], 
                            item.data['05'], 
                            item.data['06'], 
                            item.data['07'], 
                            item.data['08'], 
                            item.data['09'], 
                            item.data['10'], 
                            item.data['11'], 
                            item.data['12']], 
                        stack: 'sum', 
                        label: item.name
                    }, 
                ...series];
            }

            // 데이터 저장
            setChartData(series);
        } else {
            console.log('error');
        }
    }

    // 새로고침 버튼 클릭 이벤트
    const handleRefreshClick = () => {
        CreateChart(thisYear);
    };

    // 날짜 선택 이벤트
    const handleDateAccept = (date: any) => {
        console.log(" === handleDateAccept === ");
        setThisYear(date.$y);
    };

    return (
        <>
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
                        variant="h5"
                        id="tableTitle"
                        component="div">
                        분류별 자산차트
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
                </Toolbar>
                {chartData.length > 0 ? (
                    <BarChart
                        sx={{
                            p: 2,
                        }}
                        series={chartData}
                        height={350}
                        xAxis={[{
                            data: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                            scaleType: 'band',
                            id: 'months',
                            label: "월"
                        }]}
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
        </>
    );
}