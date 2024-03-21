import { ChangeEvent, MouseEvent } from 'react';
import { visuallyHidden } from '@mui/utils';
import { Box, Checkbox, TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { Order } from '@/utils/sort';
import { AssetTypeData } from "@/redux/asset_type/AssetType";

interface HeadCell {
    id: keyof AssetTypeData;
    label: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'asset_type',
        label: '자산 유형',
    },
    {
        id: 'asset_acnt',
        label: '자산 계좌 이름',
    },
    {
        id: 'asset_name',
        label: '자산 이름',
    },
    {
        id: 'amount',
        label: '자산 금액(원)',
    },
    {
        id: 'earning_rate',
        label: '연 수익률(%)',
    },
    {
        id: 'reg_date',
        label: '등록일',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: MouseEvent<unknown>, property: keyof AssetTypeData) => void;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    setIsNotSortStatus: (status: boolean) => void;
    }

export function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, setIsNotSortStatus } = props;
    const createSortHandler = (property: keyof AssetTypeData) => (event: MouseEvent<unknown>) => {
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
                            'aria-label': 'select all desserts',
                        }}
                    />
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