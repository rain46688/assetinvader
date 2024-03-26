// material-ui 관련 임포트
import Box from '@mui/material/Box';
import AsetTransactionTable from '@/components/asset_transaction/AsetTransactionTable';

export default function AsetTransactionPage() {

    return (
        <Box sx={{ width: '100%' }}>
            {/* AsetTransactionTable 컴포넌트 */}
            <AsetTransactionTable />
        </Box>
    );
}
