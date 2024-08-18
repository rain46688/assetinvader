"use client"

import * as React from 'react';
import { useAssetEarning } from '@/hooks/asset_earning/useAssetEarning';
import { ChangeEvent } from 'react';
import { EnhancedTableHead } from "@/components/asset_earning/TableHeader";
import { EnhancedTableToolbar } from "@/components/asset_earning/TableHeaderToolbar";

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
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

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

export default function AssetEarningTable() {

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
                                    <TableCell 
                                        sx={{ width: '5%' }}
                                        component="th"
                                        scope="center"
                                        padding="none"
                                        align="center">
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
                                    {/* 자산계좌명 */}
                                    <TableCell align="center" sx={{ width: '20%' }}>
                                        {((visibleRows.length - 1) == index && addStatus) ? (
                                            <TextField
                                                // disabled={true}
                                                variant="standard"
                                                value={row.asset_acnt || ''}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'asset_acnt')}
                                            />
                                        ) : (
                                            <Typography variant="body1" align="center">
                                                {row.asset_acnt || ''}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    {/* 자산명 */}
                                    <TableCell align="center" sx={{ width: '20%' }}>
                                        {((visibleRows.length - 1) == index && addStatus) ? (
                                            <Autocomplete
                                                // disablePortal
                                                freeSolo
                                                id="combo-box-demo"
                                                options={selectData}
                                                getOptionKey={(option) => typeof option === "string" ? 0 : option.id}
                                                onChange={
                                                    (event, newValue) => handleDataAssetNameChange(event, row.id, row.id, 'asset_name', 
                                                    typeof newValue === "string" ? { id: 0, label: newValue, asset_acnt: row.asset_acnt } : newValue || { id: 0, label: '', asset_acnt: row.asset_acnt })}
                                                onBlur={(event: ChangeEvent<any>) => {handleDataAssetNameChange(event, row.id, row.id, 'asset_name', { id: 0, label: event.target.value, asset_acnt: row.asset_acnt })}}
                                                renderInput={(params) => <TextField key={params.id} variant="standard" {...params}/>}
                                            />
                                        ) : (
                                            <Typography variant="body1" align="center">
                                                {row.asset_name || ''}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    {/* 종류 */}
                                    <TableCell align="center" sx={{ width: '15%' }}>
                                        {((visibleRows.length - 1) == index && addStatus) ? (
                                            <NativeSelect
                                                value={row.trns_type}
                                                onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, index, 'trns_type')}
                                                style={{ width: '150px', border: 'none', textAlignLast: 'center' }}
                                                inputProps={{ 'aria-label': 'Without label' }}>
                                                <option value={'매매'}>매매</option>
                                                <option value={'배당금'}>배당금</option>
                                                <option value={'은행이자'}>은행이자</option>
                                                <option value={'채권이자'}>채권이자</option>
                                                <option value={'공모주'}>공모주</option>
                                            </NativeSelect>
                                        ) : (
                                            <Typography variant="body1" align="center">
                                                {row.trns_type || ''}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    {/* 수익(원) */}
                                    <TableCell align="center" sx={{ width: '15%' }}>
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
                                    {/* 수익 발생일 */}
                                    <TableCell align="center" sx={{ width: '15%', textAlign:'center'}}>
                                        {((visibleRows.length - 1) == index && addStatus) ? (
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                                    <DateField
                                                        sx={{ textAlignLast : 'center'}}
                                                        variant="standard"
                                                        format="YYYY-MM-DD"
                                                        helperText={validationList[index]?.trns_date ? "날짜 선택 필요" : ''}
                                                        onChange={(event: any) => handleDataChange(event, row.id, index, 'trns_date')}
                                                        value={row.trns_date}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        ) : (
                                            <Typography variant="body1" align="center">
                                                {row.trns_date || ''}
                                            </Typography>
                                        )}
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
            {addStatus ? (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 3 }} />
            ) : (
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
            )}
        </Paper>
    )
}
