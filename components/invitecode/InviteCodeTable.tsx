"use client"

import * as React from 'react';
import { useInviteCode } from '@/hooks/invitecode/useInviteCode';
import { EnhancedTableHead } from '@/components/invitecode/TableHeader';
import { EnhancedTableToolbar } from '@/components/invitecode/TableHeaderToolbar';
import { formatDateV2 } from '@/utils/format';

// material-ui 관련 임포트
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// 스낵바 관련 임포트
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertColor, Box } from '@mui/material';


export default function InviteCodeTable() {

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
        snack,
        snackMessage,
        addStatus,
        snackBarStatus,
        getList,
        createInviteCode,
        setSnackBarStatus,
        setSnack,
        setSnackMessage,
        setAddStatus,
        setOrder,
        setOrderBy,
        setPage,
        handleRequestSort,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSnackClose,
    } = useInviteCode();

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
                setPage={setPage}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
                getList={getList}
                createInviteCode={createInviteCode}
            />
            <TableContainer
                sx={{ width: '100%' }}>
                <Table
                    aria-labelledby="tableTitle"
                    size='small'>
                    {/* 헤더 props */}
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {visibleRows.map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <TableRow
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.id}
                                    sx={{ cursor: 'pointer' }}>
                                    {/*  */}
                                    <TableCell align="center" sx={{ width: '12.5%', minWidth: '100px' }}>
                                        <Typography variant="body1" align="center">
                                            {row.id || ''}
                                        </Typography>
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center" sx={{ width: '12.5%', minWidth: '100px' }}>
                                        <Typography variant="body1" align="center">
                                            {row.user_id || ''}
                                        </Typography>
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center" sx={{ width: '12.5%', minWidth: '100px' }}>
                                        <Typography variant="body1" align="center">
                                            {formatDateV2(row.reg_date) || ''}
                                        </Typography>
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center" sx={{ width: '12.5%', minWidth: '100px' }}>
                                        <Typography variant="body1" align="center">
                                            {row.use_flag == 0 ? '' : formatDateV2(row.use_date) || ''}
                                        </Typography>
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center" sx={{ width: '12.5%', minWidth: '100px' }}>
                                        <Typography variant="body1" align="center">
                                            {row.use_flag == 0 ? '미사용' : '사용됨'}
                                        </Typography>
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center" sx={{ width: '12.5%', minWidth: '100px' }}>
                                        <Typography variant="body1" align="center">
                                            {formatDateV2(row.exp_date) || ''}
                                        </Typography>
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center" sx={{ width: '12.5%', minWidth: '100px' }}>
                                        <Typography variant="body1" align="center">
                                            {row.code || ''}
                                        </Typography>
                                    </TableCell>
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
            {
                addStatus ? (
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
                )
            }
        </Paper >
    )
}
