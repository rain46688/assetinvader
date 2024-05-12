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
import { AlertColor } from '@mui/material';

// 숫자 포맷 관련
import { parseNumber, parseNumberDot } from '@/utils/format';

export default function AssetRecordTable() {

    const {
        snack,
        snackBarStatus,
        snackMessage,
        tableData,
        handleSnackClose,
        handleDataChange
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
                </Typography></Toolbar>
            <TableContainer
                sx={{ width: '60%' }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">대분류명</TableCell>
                            <TableCell align="center">자산금액(원)</TableCell>
                            <TableCell align="center">조정비율(%)</TableCell>
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
                                        sx={{ width: '20%' }}>
                                        {temp_data || ''}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ width: '20%' }}>
                                        {parseNumber(tableData[temp_data].amount)}<br/>
                                        ({parseNumberDot(tableData[temp_data].ad_ratio * 100)}%)
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ width: '20%' }}>
                                        <TextField
                                            variant="standard"
                                            value={tableData[temp_data].ratio || 0}
                                            onChange={(event: ChangeEvent<any>) => handleDataChange(event, temp_data)}
                                        />
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ width: '20%' }}>
                                        {parseNumber(tableData[temp_data].diff)}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ width: '20%' }}>
                                        {parseNumberDot(tableData[temp_data].earning_rate * 100)}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}