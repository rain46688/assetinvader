"use client";

import * as React from "react";
import { useDividendTable } from "@/hooks/dividend/useDividendTable";
import { EnhancedTableHead } from "@/components/dividend/TableHeader";
import { EnhancedTableToolbar } from "@/components/dividend/TableHeaderToolbar";

// material-ui 관련 임포트
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from '@mui/material/Checkbox';
import Typography from "@mui/material/Typography";

// 스낵바 관련 임포트
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AlertColor } from "@mui/material";

export default function DividendTable() {
  // custom hook 사용
  const {
    selected,
    setSelected,
    order,
    orderBy,
    rows,
    visibleRows,
    emptyRows,
    page,
    rowsPerPage,
    snack,
    snackBarStatus,
    snackMessage,
    getList,
    setIsNotSortStatus,
    setOrder,
    setOrderBy,
    setPage,
    setSnack,
    setSnackMessage,
    setSnackBarStatus,
    isSelected,
    handleSelectAllClick,
    handleRequestSort,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSnackClose,
  } = useDividendTable();

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
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
        getList={getList}
      />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
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
                  sx={{ cursor: "pointer" }}
                >
                  {/*  */}
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>
                  {/*  */}
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="center"
                    padding="none"
                    align="center"
                  >
                    <Typography variant="body1" align="center">
                      {row.asset_name || ""}
                    </Typography>
                  </TableCell>
                  {/*  */}
                  <TableCell align="center">
                    <Typography variant="body1" align="center">
                      {row.amount || ""}
                    </Typography>
                  </TableCell>
                  {/*  */}
                  <TableCell align="center">
                    <Typography variant="body1" align="center">
                      {row.occurrence_date || ""}
                    </Typography>
                  </TableCell>
                  {/*  */}
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
  );
}
