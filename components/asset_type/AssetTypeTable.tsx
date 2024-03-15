"use client"

import * as React from 'react';
import { useAssetType } from '@/hooks/asset_type/useAssetType';
import { ChangeEvent } from 'react';
import { EnhancedTableHead } from "@/components/asset_type/TableHeader";
import { EnhancedTableToolbar } from "@/components/asset_type/TableHeaderToolbar";

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
import Input from '@mui/material/Input';

export default function AssetTypeTable() {

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
        setPage,
        isSelected,
        handleSelectAllClick,
        handleRequestSort,
        handleClick,
        handleDataChange,
        handleDataBlur,
        handleChangePage,
        handleChangeRowsPerPage
    } = useAssetType();

    return (
        <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} selected={selected} setSelected={setSelected} setPage={setPage} rowsPerPage={rowsPerPage}/>
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size='small' // 테이블 사이즈 middle / small
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
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
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="center"
                                        padding="none"
                                        align="center">
                                        <NativeSelect
                                            value={row.asset_type}
                                            onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, 'asset_type')}
                                            onBlur={(event: ChangeEvent<any>) => handleDataBlur(event, row.id, 'asset_type')}
                                            style={{ width: '150px', border: 'none' }}
                                            inputProps={{ 'aria-label': 'Without label' }}>
                                            <option value={'투자'}>투자</option>
                                            <option value={'입출식'}>입출식</option>
                                            <option value={'예적금'}>예적금</option>
                                        </NativeSelect>
                                    </TableCell>
                                    <TableCell align="center"><Input value={row.asset_acnt || ''}
                                        onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, 'asset_acnt')}
                                        onBlur={(event) => handleDataBlur(event, row.id, 'asset_acnt')} />
                                    </TableCell>
                                    <TableCell align="center"><Input value={row.asset_name || ''}
                                        onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, 'asset_name')}
                                        onBlur={(event) => handleDataBlur(event, row.id, 'asset_name')} />
                                    </TableCell>
                                    <TableCell align="center"><Input value={row.amount || 0}
                                        onChange={(event: ChangeEvent<any>) => handleDataChange(event, row.id, 'amount')}
                                        onBlur={(event) => handleDataBlur(event, row.id, 'amount')} />
                                    </TableCell>
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
