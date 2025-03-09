"use client"

import * as React from 'react';
import { useAssetClass } from '@/hooks/asset_class/useAssetClass';
import { EnhancedTableHead } from "@/components/asset_class/mobile/TableHeader";
import { EnhancedTableToolbar } from "@/components/asset_class/mobile/TableHeaderToolbar";

// redux 관련 임포트
import { useAppSelector } from '@/app/store';

// material-ui 관련 임포트
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";

// 스낵바 관련 임포트
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertColor, Box } from '@mui/material';

// 숫자 포맷 관련
import { parseNumber } from '@/utils/format';


function Row(props: { row: any }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }} component="th" scope="row">
                    <Typography variant="body1" align="center">
                        {row.asset_big_class || ''}
                    </Typography>
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }} component="th" scope="row">
                    <Typography variant="body1" align="center">
                        {row.asset_name || ''}
                    </Typography>
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="body2" gutterBottom component="div">
                                자산계좌명 : {row.asset_acnt || ''}
                            </Typography>
                            <Typography variant="body2" gutterBottom component="div">
                                자산세분류 : {row.asset_mid_class || ''}
                            </Typography>
                            <Typography variant="body2" gutterBottom component="div">
                                자산금액(원) : {parseNumber(row.amount) || ''}
                            </Typography>
                            <Typography variant="body2" gutterBottom component="div">
                                연수익률(%) : {parseNumber(row.earning_rate) || ''}
                            </Typography>
                            <Typography variant="body2" gutterBottom component="div">
                                최근수정일 : {row.mod_date || ''}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function AssetClassTableMobile() {
    const list = useAppSelector(state => state.assetClassReducer); // Redux 상태에서 필요한 데이터 읽어오기

    // custom hook 사용
    const {
        order,
        orderBy,
        rows,
        visibleRows,
        page,
        rowsPerPage,
        snack,
        snackMessage,
        snackBarStatus,
        getList,
        setIsNotSortStatus,
        setOrder,
        setOrderBy,
        setPage,
        handleRequestSort,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSnackClose,
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
                page={page}
                setPage={setPage}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
                getList={getList}
            />
            <TableContainer
                sx={{ overflowX: 'auto', width: '100%' }}>
                <Table
                    aria-labelledby="tableTitle"
                    size='small'>
                    {/* 헤더 props */}
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        setIsNotSortStatus={setIsNotSortStatus}
                    />
                    <TableBody>
                        {visibleRows.map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <Row key={labelId} row={row} />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[15, 20, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                showFirstButton={true}
                showLastButton={true}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
