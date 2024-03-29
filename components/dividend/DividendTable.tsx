"use client";

import * as React from "react";
import { useDividend } from "@/hooks/dividend/useDividend";
import { EnhancedTableHead } from "@/components/dividend/TableHeader";

// material-ui 관련 임포트
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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
    setOrder,
    setOrderBy,
    setPage,
    isSelected,
    handleSelectAllClick,
    handleRequestSort,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useDividend();

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
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
