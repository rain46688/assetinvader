"use client"

import * as React from 'react';
import { useSpending } from '@/hooks/spending/useSpending';
import { ChangeEvent } from 'react';
import { EnhancedTableHead } from "@/components/spending/TableHeader";
import { EnhancedTableToolbar } from "@/components/spending/TableHeaderToolbar";

// material-ui 관련 임포트
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { NumericFormatCustom, parseNumber } from '@/utils/format';

// 스낵바 관련 임포트
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertColor, Box } from '@mui/material';

// 날짜 관련 임포트
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

export default function SpendingTable() {

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
        addStatus,
        validation,
        snackBarStatus,
        getList,
        setIsNotSortStatus,
        setSnackBarStatus,
        setSnack,
        setSnackMessage,
        setAddStatus,
        setValidationList,
        setOrder,
        setOrderBy,
        setPage,
        isSelected,
        handleSelectAllClick,
        handleRequestSort,
        handleClick,
        handleDataChange,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSnackClose,
    } = useSpending();

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
                validationList={validationList}
                setValidationList={setValidationList}
                addStatus={addStatus}
                setAddStatus={setAddStatus}
                validation={validation}
                setSnack={setSnack}
                setSnackMessage={setSnackMessage}
                setSnackBarStatus={setSnackBarStatus}
                setIsNotSortStatus={setIsNotSortStatus}
                getList={getList}
            />
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size='small'>
                    {/* 헤더 props */}
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        addStatus={addStatus}
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
                                    sx={{ cursor: 'pointer' }}>
                                    {/*  */}
                                    <TableCell padding="checkbox">
                                        {!addStatus ? (
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </TableCell>
                                    {/*  */}
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="center"
                                        padding="none"
                                        align="center">
                                        {((visibleRows.length - 1) == index && addStatus) ? (
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                                    <DateField
                                                        sx={{ textAlignLast : 'center'}}
                                                        variant="standard"
                                                        format="YYYY-MM"
                                                        helperText={validationList[index]?.spnd_date ? "날짜 선택 필요" : ''}
                                                        onChange={(event: any) => handleDataChange(event, row.id, index, 'spnd_date')}
                                                        value={row.spnd_date}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        ) : (
                                            <Typography variant="body1" align="center">
                                                {row.spnd_date || ''}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center">
                                        {((visibleRows.length - 1) == index && addStatus) ? (
                                            <TextField
                                                variant="standard"
                                                helperText={validationList[index]?.spnd_type ? "한영특 숫자 입력" : ''}
                                                error={validationList[index]?.spnd_type}
                                                value={row.spnd_type || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'spnd_type')}
                                            />
                                        ) : (
                                            <Typography variant="body1" align="center">
                                                {row.spnd_type || ''}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center">
                                        {((visibleRows.length - 1) == index && addStatus) ? (
                                            <TextField
                                                variant="standard"
                                                helperText={validationList[index]?.description ? "한영특 숫자 입력" : ''}
                                                error={validationList[index]?.description}
                                                value={row.description || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'description')}
                                            />
                                        ) : (
                                            <Typography variant="body1" align="center">
                                                {row.description || ''}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center">
                                        {((visibleRows.length - 1) == index && addStatus) ? (
                                            <TextField
                                                variant="standard"
                                                helperText={validationList[index]?.amount ? "숫자 입력" : ''}
                                                error={validationList[index]?.amount}
                                                value={row.amount || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'amount')}
                                                InputProps={{
                                                    inputComponent: NumericFormatCustom as any,
                                                }}
                                            />
                                        ) : (
                                            <Typography variant="body1" align="center">
                                                {parseNumber(row.amount) || ''}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    {/*  */}
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 33 * emptyRows, // 테이블 사이즈 middle : 53 / small : 33
                                }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {addStatus ? (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 3 }} />
            ) : (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Paper>
    )
}
