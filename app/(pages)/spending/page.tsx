import * as React from 'react';

// material-ui 관련 임포트
import Box from '@mui/material/Box';
import SpendingTable from '@/components/spending/SpendingTable';
import SpendingPieChart from '@/components/spending/SpendingPieChart';
import SpendingLineChart from '@/components/spending/SpendingLineChart';

export default function AsetTransactionPage() {

    return (
        <Box sx={{ width: '100%' }}>
            <SpendingTable />
            <SpendingPieChart />
            <SpendingLineChart />
        </Box>
    );
}
