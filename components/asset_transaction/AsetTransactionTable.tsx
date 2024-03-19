"use client"


import * as React from 'react';
import { useAssetTransaction } from '@/hooks/asset_transaction/useAssetTransaction';
import { ChangeEvent } from 'react';
import { EnhancedTableHead } from "@/components/asset_transaction/TableHeader";
import { EnhancedTableToolbar } from "@/components/asset_transaction/TableHeaderToolbar";

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
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

export default function AsetTransactionTable() {

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
        handleDataBlur,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSnackClose,
    } = useAssetTransaction();

    return (
        <Paper sx={{ width: '100%', mb: 2 }}>
            {/* 스낵바 설정 */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={5000}
                open={snack}
                message={snackMessage}
                onClose={handleSnackClose}
            />
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
                        addStatus={addStatus} />
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
                                            <TextField
                                                variant="standard"
                                                value={row.asset_name || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'asset_name')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'asset_name')} />
                                        ) : (
                                            <Typography variant="body1" align="center">
                                                {row.asset_name || ''}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center">
                                        {((visibleRows.length - 1) == index && addStatus) ? (
                                            <TextField
                                                disabled={true}
                                                variant="standard"
                                                value={row.asset_acnt || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'asset_acnt')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'asset_acnt')} />
                                        ) : (
                                            <Typography variant="body1" align="center">
                                                {row.asset_acnt || ''}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center">
                                        {((visibleRows.length - 1) == index && addStatus) ? (
                                            <TextField
                                                variant="standard"
                                                value={row.trns_type || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'trns_type')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'trns_type')} />
                                        ) : (
                                            <Typography variant="body1" align="center">
                                                {row.trns_type || ''}
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
                                                value={row.amount || 0}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'amount')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'amount')} />
                                        ) : (
                                            <Typography variant="body1" align="center">
                                                {row.amount || ''}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center">
                                        {((visibleRows.length - 1) == index && addStatus) ? (
                                            <TextField
                                                variant="standard"
                                                helperText={validationList[index]?.trns_date ? "날짜 선택 필요" : ''}
                                                error={validationList[index]?.trns_date}
                                                value={row.trns_date || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'trns_date')}
                                                onBlur={(event) => handleDataBlur(event, row.id, index, 'trns_date')} />
                                        ) : (
                                            <Typography variant="body1" align="center">
                                                {row.trns_date || ''}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center">
                                        {row.reg_date}
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
