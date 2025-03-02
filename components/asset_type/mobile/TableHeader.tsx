import { ChangeEvent, MouseEvent } from 'react';
import { visuallyHidden } from '@mui/utils';
import { Order } from '@/utils/sort';
import { AssetTypeData } from "@/redux/asset_type/AssetType";

// material-ui 관련 임포트
import { Box, TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

interface HeadCell {
    id: keyof AssetTypeData;
    label: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'asset_acnt',
        label: '자산 계좌 이름',
    },
    {
        id: 'asset_name',
        label: '자산 이름',
    }
];

interface EnhancedTableProps {
    onRequestSort: (event: MouseEvent<unknown>, property: keyof AssetTypeData) => void;
    order: Order;
    orderBy: string;
    setIsNotSortStatus: (status: boolean) => void;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort, setIsNotSortStatus } = props;
    const createSortHandler = (property: keyof AssetTypeData) => (event: MouseEvent<unknown>) => {
        onRequestSort(event, property);
        // 정렬 버튼 클릭시에 정렬 허용
        setIsNotSortStatus(false);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        sx={{whiteSpace: 'nowrap'}}
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