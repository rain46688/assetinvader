"use client"

import * as React from 'react';
import { useUserAdmin } from '@/hooks/user_admin/useUserAdmin';
import { EnhancedTableHead } from '@/components/user_admin/TableHeader';
import { EnhancedTableToolbar } from '@/components/user_admin/TableHeaderToolbar';

// material-ui 관련 임포트
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Tooltip from '@mui/material/Tooltip';

// 스낵바 관련 임포트
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertColor, Box } from '@mui/material';


export default function UserAdminTable() {

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
        handleUserAdmission,
        handleUserBanishment,
        handleUserEdit,
    } = useUserAdmin();

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
                                            {row.user_id || ''}
                                        </Typography>
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center" sx={{ width: '12.5%', minWidth: '100px' }}>
                                        <Typography variant="body1" align="center">
                                            {row.role == 0 ? '시스템관리자' :
                                                row.role == 1 ? '관리자' :
                                                    row.role == 2 ? '사용자(투자)' :
                                                        row.role == 3 ? '사용자(일반)' : '기타(방문자)'}
                                        </Typography>
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center" sx={{ width: '12.5%', minWidth: '100px' }}>
                                        <Typography variant="body1" align="center">
                                            {row.locked == 0 ? '승인됨' : '승인필요'}
                                        </Typography>
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center" sx={{ width: '12.5%', minWidth: '100px' }}>
                                        <Typography variant="body1" align="center">
                                            {row.reg_date || ''}
                                        </Typography>
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center" sx={{ width: '12.5%', minWidth: '100px' }}>
                                        <Typography variant="body1" align="center">
                                            {row.mod_date || ''}
                                        </Typography>
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center" sx={{ width: '12.5%', minWidth: '100px' }}>
                                        <Typography variant="body1" align="center">
                                            {row.visit_date || ''}
                                        </Typography>
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center" sx={{ width: '12.5%', minWidth: '100px' }}>
                                        <Typography variant="body1" align="center">
                                            {row.accept_date || ''}
                                        </Typography>
                                    </TableCell>
                                    {/*  */}
                                    <TableCell align="center" sx={{ width: '12.5%', minWidth: '100px' }}>
                                        {row.locked == 1 ?
                                            (<Tooltip title="승인">
                                                <IconButton aria-label="Admission" onClick={(event: any) => handleUserAdmission(event, row.id)}>
                                                    <HowToRegIcon />
                                                </IconButton>
                                            </Tooltip>) : (<></>)}
                                        <Tooltip title="잠금">
                                            <IconButton aria-label="Banishment" onClick={(event: any) => handleUserBanishment(event, row.id)}>
                                                <PersonRemoveIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="수정">
                                            <IconButton aria-label="Edit" onClick={(event: any) => handleUserEdit(event, row.id)}>
                                                <PersonSearchIcon />
                                            </IconButton>
                                        </Tooltip>
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
