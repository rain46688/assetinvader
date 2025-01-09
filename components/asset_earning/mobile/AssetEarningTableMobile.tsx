"use client"

import * as React from 'react';
import { sendDelete } from '@/utils/fetch';
import { useAssetEarning } from '@/hooks/asset_earning/useAssetEarning';
import { EnhancedTableHead } from "@/components/asset_earning/mobile/TableHeader";
import { EnhancedTableToolbar } from "@/components/asset_earning/mobile/TableHeaderToolbar";

// redux 관련 임포트
import { setAssetEarningList } from '@/redux/asset_earning/assetEarningSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';

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
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

// 스낵바 관련 임포트
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertColor, Box } from '@mui/material';

// 날짜 관련 임포트
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

// 숫자 포맷 관련
import { NumericFormatCustom, parseNumber } from '@/utils/format';


function Row(props: { row: any, handleDeleteList: (id: number) => Promise<void> }) {
    const { row, handleDeleteList } = props;
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
                        {row.asset_name || ''}
                    </Typography>
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }} component="th" scope="row">
                    <Typography variant="body1" align="center">
                        {row.trns_date || ''}
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
                                종류 : {row.trns_type || ''}
                            </Typography>
                            <Typography variant="body2" gutterBottom component="div">
                                수익(원) : {parseNumber(row.amount) || ''}
                            </Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<DeleteIcon />}
                                onClick={() => {
                                    handleDeleteList(row.id) 
                                    setOpen(!open)
                                }}>
                                삭제
                            </Button>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function AssetEarningTableMobile() {
    const dispatch = useAppDispatch();
    const list = useAppSelector(state => state.assetEarningReducer); // Redux 상태에서 필요한 데이터 읽어오기

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
        selectData,
        snackBarStatus,
        getList,
        setIsNotSortStatus,
        setSnackBarStatus,
        setSnack,
        setSnackMessage,
        handleDataAssetNameChange,
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
    } = useAssetEarning();

    // 선택된 항목 삭제
    const handleDeleteList = async (id: number) => {
        console.log('=== handleDeleteList === ');
        console.log(id);

        const result = await sendDelete('assetearning/delete_assetearning/' + id);
        if (result.status === 'success') {
            const newList = list.filter((item) => !selected.includes(item.id));
            setOrder('asc');
            setOrderBy('trns_date');
            setSnack(true);
            setSnackMessage("데이터 삭제 완료.");
            setSnackBarStatus("success");
            dispatch(setAssetEarningList(newList));
            // 목록 새로고침
            getList(sessionStorage.getItem('id') + '');
        } else {
            setSnack(true);
            setSnackMessage("데이터 삭제 실패.");
            setSnackBarStatus("error");
            console.log("fail");
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
            {/* 툴바 props */}
            <EnhancedTableToolbar
                numSelected={selected.length}
                selected={selected}
                setSelected={setSelected}
                page={page}
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
            <TableContainer
                sx={{ overflowX: 'auto', width: '100%' }}>
                <Table
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
                                <Row key={labelId} row={row} handleDeleteList={handleDeleteList} />
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
