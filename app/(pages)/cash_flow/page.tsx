import * as React from 'react';
import CashFlowTable from '@/components/cash_flow/CashFlowTable';

// material-ui 관련 임포트
import Box from '@mui/material/Box';

export default function CashFlowPage() {

  return (
    <Box sx={{ width: '100%' }}>
      {/* Dividend 컴포넌트 */}
        <CashFlowTable />
    </Box>
  );
}
