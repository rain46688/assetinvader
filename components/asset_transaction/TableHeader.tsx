import { ChangeEvent, MouseEvent } from 'react';
import { visuallyHidden } from '@mui/utils';
import { Order } from '@/utils/sort';
import { AssetTransactionData } from "@/redux/asset_transaction/AssetTransaction";

// material-ui 관련 임포트
import { Box, Checkbox, TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

interface HeadCell {
    id: keyof AssetTransactionData;
    label: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'asset_name',
        label: '거래내역 이름',
    },
    {
        id: 'asset_acnt',
        label: '거래 발생계좌',
    },
    {
        id: 'trns_type',
        label: '거래 종류',
    },
    {
        id: 'amount',
        label: '거래 수량',
    },
    {
        id: 'trns_date',
        label: '거래 발생일',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: MouseEvent<unknown>, property: keyof AssetTransactionData) => void;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    addStatus: boolean;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, addStatus } = props;
    const createSortHandler = (property: keyof AssetTransactionData) => (event: MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    {!addStatus ? (
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    ) : (
                        <></>
                    )}

                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='center'
                        padding='normal'
                        sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}