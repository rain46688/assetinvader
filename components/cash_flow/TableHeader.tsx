import { ChangeEvent, MouseEvent } from 'react';
import { visuallyHidden } from '@mui/utils';
import { Order } from '@/utils/sort';
import { CashFlowData } from '@/redux/cash_flow/CashFlow';

// material-ui 관련 임포트
import { Box, Checkbox, TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

interface HeadCell {
    id: keyof CashFlowData;
    label: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'asset_name',
        label: '자산명',
    },
    {
        id: 'jan',
        label: '1월',
    },
    {
        id: 'feb',
        label: '2월',
    },
    {
        id: 'mar',
        label: '3월',
    },
    {
        id: 'apr',
        label: '4월',
    },
    {
        id: 'may',
        label: '5월',
    },
    {
        id: 'jun',
        label: '6월',
    },
    {
        id: 'jul',
        label: '7월',
    },
    {
        id: 'aug',
        label: '8월',
    },
    {
        id: 'sep',
        label: '9월',
    },
    {
        id: 'oct',
        label: '10월',
    },
    {
        id: 'nov',
        label: '11월',
    },
    {
        id: 'dec',
        label: '12월',
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: MouseEvent<unknown>, property: keyof CashFlowData) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    setIsNotSortStatus: (status: boolean) => void;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, rowCount, onRequestSort, setIsNotSortStatus } = props;
    const createSortHandler = (property: keyof CashFlowData) => (event: MouseEvent<unknown>) => {
        onRequestSort(event, property);
        // 정렬 버튼 클릭시에 정렬 허용
        setIsNotSortStatus(false);
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