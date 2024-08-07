"use client"

import * as React from 'react';
import { useCashFlow } from '@/hooks/cash_flow/useCashFlow';
import { ChangeEvent } from 'react';
import { EnhancedTableHead } from "@/components/cash_flow/TableHeader";
import { EnhancedTableToolbar } from "@/components/cash_flow/TableHeaderToolbar";
import { parseNumber } from '@/utils/format';

// material-ui 관련 임포트
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';

// 스낵바 관련 임포트
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertColor } from '@mui/material';

import CashFlowBarChart from './CashFlowBarChart';

export default function AssetTypeTable() {

    // custom hook 사용
    const {
        selected, setSelected,
        year, setYear,
        order,
        orderBy,
        rows,
        visibleRows,
        emptyRows,
        page,
        rowsPerPage,
        validationList,
        snack,
        snackMessage,
        snackBarStatus,
        setValidationList,
        getList,
        setIsNotSortStatus,
        setSnack,
        setSnackMessage,
        setSnackBarStatus,
        setOrder,
        setOrderBy,
        setPage,
        handleRequestSort,
        handleDataChange,
        handleDataBlur,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSnackClose,
    } = useCashFlow();

    return (
        <>
            <Paper
                sx={{
                    width: '100%',
                    mb: 2,
                }}
            >
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
                {/* 툴바 props */}
                <EnhancedTableToolbar
                    setPage={setPage}
                    setOrder={setOrder}
                    setOrderBy={setOrderBy}
                    getList={getList}
                    year={year}
                    setYear={setYear}
                />
                <TableContainer sx={{ overflowX: 'auto', width: '100%' }}>
                    <Table
                        // sx={{ 
                        //     minWidth: 750
                        //  }}
                        size='small'

                    >
                        {/* 헤더 props */}
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            setIsNotSortStatus={setIsNotSortStatus}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        sx={{ cursor: 'pointer' }}>
                                        {/*  */}
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="center"
                                            align="center">
                                            <TextField
                                                sx={{ width: '150px' }}
                                                disabled={true}
                                                variant="standard"
                                                helperText={(validationList.find(item => item.id === row.id))?.asset_name ? "한영특 숫자 입력" : ''}
                                                error={(validationList.find(item => item.id === row.id))?.asset_name}
                                                value={row.asset_name || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'asset_name')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'asset_name')} />
                                        </TableCell>
                                        {/* 1 */}
                                        <TableCell align="center">
                                            <TextField
                                                sx={{ width: '100px' }}
                                                inputProps={{ style: { textAlign: 'center' } }}
                                                disabled={true}
                                                variant="standard"
                                                helperText={(validationList.find(item => item.id === row.id))?.jan ? "숫자 입력" : ''}
                                                error={(validationList.find(item => item.id === row.id))?.jan}
                                                value={parseNumber(row.jan) || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'jan')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'jan')} />
                                        </TableCell>
                                        {/* 2 */}
                                        <TableCell align="center">
                                            <TextField
                                                sx={{ width: '100px' }}
                                                inputProps={{ style: { textAlign: 'center' } }}
                                                disabled={true}
                                                variant="standard"
                                                helperText={(validationList.find(item => item.id === row.id))?.feb ? "숫자 입력" : ''}
                                                error={(validationList.find(item => item.id === row.id))?.feb}
                                                value={parseNumber(row.feb) || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'feb')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'feb')} />
                                        </TableCell>
                                        {/* 3 */}
                                        <TableCell align="center">
                                            <TextField
                                                sx={{ width: '100px' }}
                                                inputProps={{ style: { textAlign: 'center' } }}
                                                disabled={true}
                                                variant="standard"
                                                helperText={(validationList.find(item => item.id === row.id))?.mar ? "숫자 입력" : ''}
                                                error={(validationList.find(item => item.id === row.id))?.mar}
                                                value={parseNumber(row.mar) || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'mar')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'mar')} />
                                        </TableCell>
                                        {/* 4 */}
                                        <TableCell align="center">
                                            <TextField
                                                sx={{ width: '100px' }}
                                                inputProps={{ style: { textAlign: 'center' } }}
                                                disabled={true}
                                                variant="standard"
                                                helperText={(validationList.find(item => item.id === row.id))?.apr ? "숫자 입력" : ''}
                                                error={(validationList.find(item => item.id === row.id))?.apr}
                                                value={parseNumber(row.apr) || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'apr')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'apr')} />
                                        </TableCell>
                                        {/* 5 */}
                                        <TableCell align="center">
                                            <TextField
                                                sx={{ width: '100px' }}
                                                inputProps={{ style: { textAlign: 'center' } }}
                                                disabled={true}
                                                variant="standard"
                                                helperText={(validationList.find(item => item.id === row.id))?.may ? "숫자 입력" : ''}
                                                error={(validationList.find(item => item.id === row.id))?.may}
                                                value={parseNumber(row.may) || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'may')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'may')} />
                                        </TableCell>
                                        {/* 6 */}
                                        <TableCell align="center">
                                            <TextField
                                                sx={{ width: '100px' }}
                                                inputProps={{ style: { textAlign: 'center' } }}
                                                disabled={true}
                                                variant="standard"
                                                helperText={(validationList.find(item => item.id === row.id))?.jun ? "숫자 입력" : ''}
                                                error={(validationList.find(item => item.id === row.id))?.jun}
                                                value={parseNumber(row.jun) || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'jun')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'jun')} />
                                        </TableCell>
                                        {/* 7 */}
                                        <TableCell align="center">
                                            <TextField
                                                sx={{ width: '100px' }}
                                                inputProps={{ style: { textAlign: 'center' } }}
                                                disabled={true}
                                                variant="standard"
                                                helperText={(validationList.find(item => item.id === row.id))?.jul ? "숫자 입력" : ''}
                                                error={(validationList.find(item => item.id === row.id))?.jul}
                                                value={parseNumber(row.jul) || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'jul')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'jul')} />
                                        </TableCell>
                                        {/* 8 */}
                                        <TableCell align="center">
                                            <TextField
                                                sx={{ width: '100px' }}
                                                inputProps={{ style: { textAlign: 'center' } }}
                                                disabled={true}
                                                variant="standard"
                                                helperText={(validationList.find(item => item.id === row.id))?.aug ? "숫자 입력" : ''}
                                                error={(validationList.find(item => item.id === row.id))?.aug}
                                                value={parseNumber(row.aug) || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'aug')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'aug')} />
                                        </TableCell>
                                        {/* 9 */}
                                        <TableCell align="center">
                                            <TextField
                                                sx={{ width: '100px' }}
                                                inputProps={{ style: { textAlign: 'center' } }}
                                                disabled={true}
                                                variant="standard"
                                                helperText={(validationList.find(item => item.id === row.id))?.sep ? "숫자 입력" : ''}
                                                error={(validationList.find(item => item.id === row.id))?.sep}
                                                value={parseNumber(row.sep) || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'sep')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'sep')} />
                                        </TableCell>
                                        {/* 10 */}
                                        <TableCell align="center">
                                            <TextField
                                                sx={{ width: '100px' }}
                                                inputProps={{ style: { textAlign: 'center' } }}
                                                disabled={true}
                                                variant="standard"
                                                helperText={(validationList.find(item => item.id === row.id))?.oct ? "숫자 입력" : ''}
                                                error={(validationList.find(item => item.id === row.id))?.oct}
                                                value={parseNumber(row.oct) || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'oct')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'oct')} />
                                        </TableCell>
                                        {/* 11 */}
                                        <TableCell align="center">
                                            <TextField
                                                sx={{ width: '100px' }}
                                                inputProps={{ style: { textAlign: 'center' } }}
                                                disabled={true}
                                                variant="standard"
                                                helperText={(validationList.find(item => item.id === row.id))?.nov ? "숫자 입력" : ''}
                                                error={(validationList.find(item => item.id === row.id))?.nov}
                                                value={parseNumber(row.nov) || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'nov')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'nov')} />
                                        </TableCell>
                                        {/*  */}
                                        <TableCell align="center">
                                            <TextField
                                                sx={{ width: '100px' }}
                                                inputProps={{ style: { textAlign: 'center' } }}
                                                disabled={true}
                                                variant="standard"
                                                helperText={(validationList.find(item => item.id === row.id))?.dec ? "숫자 입력" : ''}
                                                error={(validationList.find(item => item.id === row.id))?.dec}
                                                value={parseNumber(row.dec) || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'dec')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'dec')} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 33 * emptyRows, // 테이블 사이즈 middle : 53 / small : 33
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length + 1}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <CashFlowBarChart year={year} />
        </>
    )
}
