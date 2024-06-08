"use client"

import { useAssetRecord } from '@/hooks/asset_record/useAssetRecord';
import { ChangeEvent, useState } from 'react';

// material-ui 관련 임포트
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { green, blueGrey, grey } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

// 스낵바 관련 임포트
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertColor } from '@mui/material';

// 숫자 포맷 관련
import { parseNumber, parseNumberDot } from '@/utils/format';

// 테이블 색상(현재)
const CurrentTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: blueGrey[200],
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: blueGrey[200],
    },
}));

// 테이블 색상(목표)
const TargetTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: green[100],
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: green[100],
    },
}));



export default function AssetRecordTable() {
    const {
        snack,
        snackBarStatus,
        snackMessage,
        tableData,
        totalAmount,
        totalEarningRate,
        totalTargetEarningRate,
        openEarning,
        classCheckBoxStatus,
        tartgetAmountStatus,
        setSnack,
        setSnackMessage,
        setSnackBarStatus,
        setOpenEarning,
        setClassCheckBoxStatus,
        setTargetAmountStatus,
        handleSnackClose,
        handleDataChange,
        handleDataBlur
    } = useAssetRecord();
    const handleOpenEarning = () => {
        let total_target_ratio = 0;
        for (const tempData in tableData) {
            total_target_ratio += parseFloat(""+tableData[tempData].target_ratio); // 이상하게 타입은 숫자인데 typeof는 string임
        }
        if (total_target_ratio == 100) {
            setOpenEarning(true);
        } else {
            console.log(' === getList error === ');
            setSnack(true);
            setSnackBarStatus("warning");
            setSnackMessage('목표비율의 총합이 100%이어야 합니다.');
        }
    };


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
                    대분류별 자산조회 및 조정(중분류 포함
                    <Checkbox
                        checked={classCheckBoxStatus}
                        onChange={() => { 
                            setClassCheckBoxStatus(!classCheckBoxStatus);
                            setOpenEarning(false);
                            setTargetAmountStatus(false);
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    )
                </Typography>
            </Toolbar>
            <TableContainer
                sx={{ width: '100%' }}>
                <Table aria-label="collapsible table" size='small'>
                    {/* <Table aria-label="customized table"> */}
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="center"
                                rowSpan={2}
                                sx={{
                                    borderRight: 1,
                                    borderRightColor: grey[400],
                                    borderBottom: 1,
                                    borderBottomColor: grey[400]
                                }}>
                                대분류명
                            </TableCell>
                            {classCheckBoxStatus ? (
                                <TableCell
                                    align="center"
                                    rowSpan={2}
                                    sx={{
                                        borderRight: 1,
                                        borderRightColor: grey[400],
                                        borderBottom: 1,
                                        borderBottomColor: grey[400]
                                    }}>
                                    중분류명
                                </TableCell>
                            ) : (<></>)}
                            <TableCell
                                align="center"
                                rowSpan={2}
                                sx={{
                                    borderRight: 1,
                                    borderRightColor: grey[400],
                                    borderBottom: 1,
                                    borderBottomColor: grey[400]
                                }}>
                                연수익률(%)<br/>(매매차익 제외)
                            </TableCell>
                            <CurrentTableCell
                                align="center"
                                colSpan={2}>
                                내 자산
                            </CurrentTableCell>
                            <TargetTableCell
                                align="center"
                                colSpan={2}
                                sx={{
                                    borderRight: 1,
                                    borderRightColor: grey[400],
                                    borderBottom: 1,
                                    borderBottomColor: grey[400]
                                }}>
                                목표 자산
                            </TargetTableCell>
                            <TableCell
                                align="center"
                                rowSpan={2}
                                sx={{
                                    borderBottom: 1,
                                    borderBottomColor: grey[400]
                                }}>
                                증감(원)<br />(목표 - 현재)
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <CurrentTableCell
                                align="center">
                                금액(원)
                            </CurrentTableCell>
                            <CurrentTableCell
                                align="center">
                                {classCheckBoxStatus ? "중" : "대"}분류별 비율(%)
                            </CurrentTableCell>
                            <TargetTableCell
                                align="center"
                                sx={{
                                    borderRight: 1,
                                    borderRightColor: grey[400],
                                    borderBottom: 1,
                                    borderBottomColor: grey[400]
                                }}>
                                금액(원)
                            </TargetTableCell>
                            <TargetTableCell
                                align="center"
                                sx={{
                                    borderRight: 1,
                                    borderRightColor: grey[400],
                                    borderBottom: 1,
                                    borderBottomColor: grey[400]
                                }}>
                                {classCheckBoxStatus ? "중" : "대"}분류별 비율(%)
                            </TargetTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(tableData).map((temp_data: any, index) => {
                            const splitClass = temp_data.split("_");
                            return (
                                <TableRow key={index}>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            width: '12.5%',
                                            borderRight: 1,
                                            borderRightColor: grey[400],
                                            borderBottom: 1,
                                            borderBottomColor: grey[400]
                                        }}>
                                        {splitClass[0] || ''}
                                    </TableCell>
                                    {classCheckBoxStatus ? (
                                        <TableCell
                                            align="center"
                                            sx={{
                                                width: '12.5%',
                                                borderRight: 1,
                                                borderRightColor: grey[400],
                                                borderBottom: 1,
                                                borderBottomColor: grey[400]
                                            }}>
                                            {splitClass[1] || ''}
                                        </TableCell>
                                    ) : (<></>)}
                                    <TableCell
                                        align="center"
                                        sx={{
                                            width: '12.5%',
                                            borderRight: 1,
                                            borderRightColor: grey[400],
                                            borderBottom: 1,
                                            borderBottomColor: grey[400]
                                        }}>
                                        {parseNumberDot(tableData[temp_data].earning_rate * 100)}
                                    </TableCell>
                                    <CurrentTableCell
                                        align="center"
                                        sx={{ width: '12%' }}>
                                        {parseNumber(tableData[temp_data].amount)}
                                    </CurrentTableCell>
                                    <CurrentTableCell
                                        align="center"
                                        sx={{ width: '13%' }}>
                                        {parseNumberDot(tableData[temp_data].ratio * 100)}
                                    </CurrentTableCell>
                                    <TargetTableCell
                                        align="center"
                                        sx={{
                                            width: '12%',
                                            borderRight: 1,
                                            borderRightColor: grey[400],
                                            borderBottom: 1,
                                            borderBottomColor: grey[400]
                                        }}>
                                        {parseNumber(tableData[temp_data].target_amount) ==='0' 
                                        ? (tartgetAmountStatus ? '0' : '자산비율 입력')
                                        : parseNumber(tableData[temp_data].target_amount)}
                                    </TargetTableCell>
                                    <TargetTableCell
                                        align="center"
                                        sx={{
                                            width: '13%',
                                            borderRight: 1,
                                            borderRightColor: grey[400],
                                            borderBottom: 1,
                                            borderBottomColor: grey[400]
                                        }}>
                                        <TextField
                                            variant="standard"
                                            value={tableData[temp_data].target_ratio || ''}
                                            onChange={(event: ChangeEvent<any>) => handleDataChange(event, temp_data)}
                                            onBlur={(event: ChangeEvent<any>) => handleDataBlur(event)}
                                        />
                                    </TargetTableCell>
                                    {tableData[temp_data].diff > 0 ? (
                                        <TableCell
                                            align="center"
                                            sx={{
                                                width: '12.5%',
                                                color: 'red',
                                                borderBottom: 1,
                                                borderBottomColor: grey[400]
                                            }}>
                                            {parseNumber(tableData[temp_data].diff)}
                                        </TableCell>
                                    ) : (
                                        <TableCell
                                            align="center"
                                            sx={{
                                                width: '12.5%',
                                                color: 'blue',
                                                borderBottom: 1,
                                                borderBottomColor: grey[400]
                                            }}>
                                            {parseNumber(tableData[temp_data].diff)}
                                        </TableCell>
                                    )}
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
                    pb: { sm: 2 },
                }}>
                {openEarning ? (
                    <Typography
                        sx={{
                            flex: '1 1 100%',
                            textAlign: 'center'
                        }}
                        variant="h6"
                        id="tableTitle"
                        component="div">
                        현재 총자산({parseNumber(totalAmount)}원)의 연 수익률은 {parseNumberDot(totalEarningRate * 100)}%이고
                        연 수익금은 약 {parseNumber(Math.round(totalAmount * totalEarningRate))}원이며<br />
                        목표 연 수익률은 {
                            totalTargetEarningRate > totalEarningRate ?
                                (<b style={{ color: 'red' }}>{parseNumberDot(totalTargetEarningRate * 100)}</b>)
                                : (<b style={{ color: 'blue' }}>{parseNumberDot(totalTargetEarningRate * 100)}</b>)
                        }%로 {
                            totalTargetEarningRate > totalEarningRate ?
                                (<b style={{ color: 'red' }}> 증가</b>)
                                : (<b style={{ color: 'blue' }}> 감소</b>)
                        }되며,
                        연 수익금은 약 {
                            totalTargetEarningRate > totalEarningRate ?
                                (<b style={{ color: 'red' }}>{parseNumber(Math.round(totalAmount * totalTargetEarningRate))}원</b>)
                                : (<b style={{ color: 'blue' }}>{parseNumber(Math.round(totalAmount * totalTargetEarningRate))}원</b>)
                        }입니다.
                    </Typography>
                ) : (
                    <Typography
                        sx={{
                            flex: '1 1 100%',
                            textAlign: 'center',
                        }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                        onClick={() => {
                            handleOpenEarning();
                        }}>
                        <b style={{ color: 'black', cursor: 'pointer' }}>목표 연수익률 및 연수익금 확인하기(매매차익 제외)</b>
                    </Typography>
                )}
            </Toolbar>
        </Paper>
    );
}