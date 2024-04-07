import { ChangeEvent, MouseEvent } from "react";
import { visuallyHidden } from "@mui/utils";
import { Order } from "@/utils/sort";
import { DividendData } from "@/redux/dividend/Dividend";

// material-ui 관련 임포트
import {
  Box,
  Checkbox,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@mui/material";

interface HeadCell {
  id: keyof DividendData;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "asset_name",
    label: "자산 이름",
  },
  {
    id: "amount",
    label: "배당금액",
  },
  {
    id: "occurrence_date",
    label: "배당금 발생일",
  },
];

interface EnhancedTableProps {
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof DividendData
  ) => void;
  setIsNotSortStatus: (status: boolean) => void;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    setIsNotSortStatus,
  } = props;
  const createSortHandler =
    (property: keyof DividendData) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
      // 정렬 버튼 클릭시에 정렬 허용
      setIsNotSortStatus(false);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
