"use client"

import * as React from 'react';
import { useAssetClass } from '@/hooks/asset_class/useAssetClass';
import { ChangeEvent } from 'react';
import { EnhancedTableHead } from "@/components/asset_class/TableHeader";
import { EnhancedTableToolbar } from "@/components/asset_class/TableHeaderToolbar";
import AssetMidClassInput from './AssetMidClassInput';

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

export default function AssetClassTable() {

    // custom hook 사용
    const {
        selected, setSelected,
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
        getList,
        setValidationList,
        setIsNotSortStatus,
        setSnack,
        setSnackMessage,
        setSnackBarStatus,
        setOrder,
        setOrderBy,
        setPage,
        isSelected,
        handleSelectAllClick,
        handleRequestSort,
        handleClick,
        handleDataChange,
        handleDataBlur,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSnackClose
    } = useAssetClass();

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
            {/* 툴바 props */}
            <EnhancedTableToolbar 
                numSelected={selected.length} 
                selected={selected} 
                setSelected={setSelected} 
                setPage={setPage} 
                rowsPerPage={rowsPerPage}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
                setSnack={setSnack}
                setSnackMessage={setSnackMessage}
                setSnackBarStatus={setSnackBarStatus}
                validationList={validationList}
                setValidationList={setValidationList}
                getList={getList}/>
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size='small' // 테이블 사이즈 middle / small
                >
                {/* 헤더 props */}
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        setIsNotSortStatus={setIsNotSortStatus}
                    />
                    <TableBody>
                        {visibleRows.map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    onClick={(event) => handleClick(event, row.id)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected}
                                    sx={{ cursor: 'pointer' }}
                                >
                                {/*  */}
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                    {/*  */}
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="center"
                                        padding="none"
                                        align="center">
                                        <NativeSelect
                                            value={row.asset_big_class || ''}
                                            onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, 'asset_big_class')}
                                            onBlur={(event: ChangeEvent<any>) => handleDataBlur(event, row.id, 'asset_big_class')}
                                            style={{ width: '150px', border: 'none' }}
                                            inputProps={{ 'aria-label': 'Without label' }}>
                                            <option value={'투자자산'}>투자자산</option>
                                            <option value={'배당자산'}>배당자산</option>
                                            <option value={'안전자산'}>안전자산</option>
                                            <option value={'현금자산'}>현금자산</option>
                                        </NativeSelect>
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center">
                                        <AssetMidClassInput row_id={row.id} row_value={row.asset_mid_class || ''}/>
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center">
                                        <TextField
                                            variant="standard"
                                            helperText={(validationList.find(item => item.id === row.id))?.asset_acnt ? "한글 영문 입력" : ''}
                                            error={(validationList.find(item => item.id === row.id))?.asset_acnt}
                                            value={row.asset_acnt || ''}
                                            onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, 'asset_acnt')}
                                            onBlur={(event) => handleDataBlur(event, row.id, 'asset_acnt')} />
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center">
                                        <TextField
                                            variant="standard"
                                            helperText={(validationList.find(item => item.id === row.id))?.asset_name ? "한글 영문 입력" : ''}
                                            error={(validationList.find(item => item.id === row.id))?.asset_name}
                                            value={row.asset_name || ''}
                                            onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, 'asset_name')}
                                            onBlur={(event) => handleDataBlur(event, row.id, 'asset_name')} />
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center">
                                        <TextField
                                            variant="standard"
                                            helperText={(validationList.find(item => item.id === row.id))?.amount ? "숫자 입력" : ''}
                                            error={(validationList.find(item => item.id === row.id))?.amount}
                                            value={row.amount || 0}
                                            onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, 'amount')}
                                            onBlur={(event) => handleDataBlur(event, row.id, 'amount')} />
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center">
                                        <TextField
                                            variant="standard"
                                            helperText={(validationList.find(item => item.id === row.id))?.earning_rate ? "소수 2자리 숫자 입력" : ''}
                                            error={(validationList.find(item => item.id === row.id))?.earning_rate}
                                            value={row.earning_rate || 0}
                                            onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, 'earning_rate')}
                                            onBlur={(event) => handleDataBlur(event, row.id, 'earning_rate')} />
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center">{row.reg_date}</TableCell>
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
