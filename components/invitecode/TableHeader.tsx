import { ChangeEvent, MouseEvent } from 'react';
import { visuallyHidden } from '@mui/utils';
import { Order } from '@/utils/sort';
import { InviteCodeData } from '@/redux/invitecode/InviteCode';

// material-ui 관련 임포트
import { Box, Checkbox, TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

interface HeadCell {
    id: keyof InviteCodeData;
    label: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'id',
        label: 'NO',
    },
    {
        id: 'user_id',
        label: '생성계정명',
    },
    {
        id: 'reg_date',
        label: '발급일',
    },
    {
        id: 'use_date',
        label: '사용일',
    },
    {
        id: 'use_flag',
        label: '사용여부',
    },
    {
        id: 'exp_date',
        label: '만료일',
    },
    {
        id: 'code',
        label: '코드',
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: MouseEvent<unknown>, property: keyof InviteCodeData) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof InviteCodeData) => (event: MouseEvent<unknown>) => {
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