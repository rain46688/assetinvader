import * as React from 'react';

// material-ui 관련 임포트
import Box from '@mui/material/Box';
import SpendingTable from '@/components/spending/SpendingTable';

export default function AsetTransactionPage() {

    return (
        <Box sx={{ width: '100%' }}>
            <SpendingTable />
        </Box>
    );
}
