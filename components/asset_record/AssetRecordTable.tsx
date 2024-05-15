"use client"

import { useAssetRecord } from '@/hooks/asset_record/useAssetRecord';
import { ChangeEvent } from 'react';

// material-ui 관련 임포트
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';

// 스낵바 관련 임포트
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertColor, colors } from '@mui/material';

// 숫자 포맷 관련
import { parseNumber, parseNumberDot } from '@/utils/format';

export default function AssetRecordTable() {

    const {
        snack,
        snackBarStatus,
        snackMessage,
        tableData,
        totalAmount,
        totalEarningRate,
        totalAdjustEarningRate,
        handleSnackClose,
        handleDataChange,
        handleDataBlur
    } = useAssetRecord();

    return (
        <Paper sx={{ width: '100%', mb: 2 }}>
            {/* 스낵바 설정 */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snack}
                autoHideDuration={5000}
                onClose={handleSnackClose}>
                <Alert
                    onClose={handleSnackClose}
                    severity={snackBarStatus as AlertColor}
                    variant="filled"
                    sx={{ width: '100%' }}>
                    {snackMessage}
                </Alert>
            </Snackbar>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                }}>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h5"
                    id="tableTitle"
                    component="div">
                    대분류별 자산조회 및 조정
                </Typography>
            </Toolbar>
            <TableContainer
                sx={{ width: '100%' }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">대분류명</TableCell>
                            <TableCell align="center">자산금액(원)</TableCell>
                            <TableCell align="center">조정비율(%)</TableCell>
                            <TableCell align="center">조정금액(원)</TableCell>
                            <TableCell align="center">차액(원)</TableCell>
                            <TableCell align="center">연수익률(%)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(tableData).map((temp_data: any, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell
                                        align="center"
                                        sx={{ width: '16%' }}>
                                        {temp_data || ''}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ width: '16%' }}>
                                        {parseNumber(tableData[temp_data].amount)}<br />
                                        ({parseNumberDot(tableData[temp_data].ratio * 100)}%)
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ width: '16%' }}>
                                        <TextField
                                            variant="standard"
                                            value={tableData[temp_data].adjust_ratio || ''}
                                            onChange={(event: ChangeEvent<any>) => handleDataChange(event, temp_data)}
                                            onBlur={(event: ChangeEvent<any>) => handleDataBlur(event)}
                                        />
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ width: '16%' }}>
                                        {parseNumber(tableData[temp_data].adjust_amount)}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ width: '16%' }}>
                                        {parseNumber(tableData[temp_data].diff)}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ width: '17%' }}>
                                        {parseNumberDot(tableData[temp_data].earning_rate * 100)}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { sm: 2 },
                    pt: { sm: 2 },
                    pb: { sm: 2 }
                }}>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h5"
                    id="tableTitle"
                    component="div">
                    예상 연수익금 계산
                    <Typography
                        sx={{ 
                            flex: '1 1 100%',
                        }}
                        variant="h6"
                        id="tableTitle"
                        component="div">
                        현재 총자산({parseNumber(totalAmount)}원)의 연 수익률은 <b style={{color : 'red'}}>{parseNumberDot(totalEarningRate*100)}%</b>이고 
                        연 수익금은 약 <b style={{color : 'red'}}>{parseNumber(Math.round(totalAmount * totalEarningRate))}원</b>이며<br />
                        조정 후 연 수익률은 <b style={{color : 'blue'}}>{parseNumberDot(totalAdjustEarningRate*100)}%</b>로 되며, 
                        연 수익금은 약 <b style={{color : 'blue'}}>{parseNumber(Math.round(totalAmount * totalAdjustEarningRate))}원</b>입니다.
                    </Typography>
                </Typography>
            </Toolbar>
        </Paper>
    );
}