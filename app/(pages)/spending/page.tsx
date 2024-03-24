import * as React from 'react';

// material-ui 관련 임포트
import Box from '@mui/material/Box';
import SpendingTable from '@/components/spending/SpendingTable';
import SpendingChart from '@/components/spending/SpendingChart';

export default function AsetTransactionPage() {

    return (
        <Box sx={{ width: '100%' }}>
            <SpendingTable />
            <SpendingChart />
        </Box>
    );
}
