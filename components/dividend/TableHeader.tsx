import { ChangeEvent, MouseEvent } from 'react';
import { visuallyHidden } from '@mui/utils';
import { Order } from '@/utils/sort';
import { DividendData } from '@/redux/dividend/Dividend';

// material-ui 관련 임포트
import { Box, TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

interface HeadCell {
    id: keyof DividendData;
    label: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'asset_name',
        label: '자산 이름',
    },
    {
        id: 'amount',
        label: '현금흐름 금액',
    },
    {
        id: 'occurrence_date',
        label: '현금흐름 발생일',
    }
];

interface EnhancedTableProps {
    onRequestSort: (event: MouseEvent<unknown>, property: keyof DividendData) => void;
    order: Order;
    orderBy: string;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof DividendData) => (event: MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
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