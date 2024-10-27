import { ChangeEvent, MouseEvent } from 'react';
import { visuallyHidden } from '@mui/utils';
import { Order } from '@/utils/sort';
import { UserAdminData } from '@/redux/user_admin/UserAdmin';

// material-ui 관련 임포트
import { Box, Checkbox, TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

interface HeadCell {
    id: keyof UserAdminData;
    label: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'user_id',
        label: '유저 아이디',
    },
    {
        id: 'role',
        label: '권한명',
    },
    {
        id: 'locked',
        label: '승인여부',
    },
    {
        id: 'reg_date',
        label: '가입일자',
    },
    {
        id: 'mod_date',
        label: '수정일자',
    },
    {
        id: 'visit_date',
        label: '최근방문일자',
    },
    {
        id: 'accept_date',
        label: '승인일자',
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: MouseEvent<unknown>, property: keyof UserAdminData) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof UserAdminData) => (event: MouseEvent<unknown>) => {
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