import * as React from 'react';
import { ChangeEvent, MouseEvent } from 'react';
import { visuallyHidden } from '@mui/utils';
import { Box, Checkbox, TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { Order } from '@/utils/sort';
import { AssetTypeData } from "@/redux/asset_type/AssetType";

import InfoIcon from '@mui/icons-material/Info';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';


const BlackTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
        color: 'rgba(255, 255, 255, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 13,
        maxWidth: 'none',
    },
}));
interface HeadCell {
    id: keyof AssetTypeData;
    label: string;
    description: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'asset_type',
        label: '자산 유형',
        description: '현금자산 : 현금이 필요할 때 리스크 없이 사용이 가능한 자산(입출금 통장, 파킹통장, CMA 등)\n'
                    +'원금보장자산 : 현금전환 시 원금은 항상 보장해주지만 약속된 이자는 받지 못하는 리스크가 있는 자산(예금, 적금 등)\n'
                    +'원금비보장자산 : 현금전환 시 원금이 사라질 수 있는 리스크가 있는 자산(주식, 채권 등)',
    },
    {
        id: 'asset_acnt',
        label: '자산 계좌 이름',
        description: '해당 자산이 포함된 계좌명입력\n예) 예적금 : 신한, 우리, 하나 등\n주식, 채권 : KB ISA, KB 위탁, 신한 위탁 등',
    },
    {
        id: 'asset_name',
        label: '자산 이름',
        description: '자산의 이름 입력\n예) 삼성전자, KODEX 배당성장 등',
    },
    {
        id: 'amount',
        label: '자산 금액(원)',
        description: '자산금액 입력, 외화의 경우 원화로 환전하여 입력',
    },
    {
        id: 'earning_rate',
        label: '연 이자·배당수익률(%)',
        description: '이자·배당 수익률 입력(매매 차익으로인한 수익률이 아님)',
    },
    {
        id: 'mod_date',
        label: '최근수정일',
        description: '수정한 시점으로 자동수정',
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
                    <BlackTooltip
                        key={headCell.id}
                        title={
                            <p>
                                {headCell.description.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </p>
                        }
                        placement="bottom">
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
                    </BlackTooltip>
                ))}
            </TableRow>
        </TableHead>
    );
}