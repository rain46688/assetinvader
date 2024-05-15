// material-ui 관련 임포트
import Box from '@mui/material/Box';
import AssetTransactionTable from '@/components/asset_transaction/AssetTransactionTable';

export default function AssetTransactionPage() {

    return (
        <Box sx={{ width: '100%' }}>
            {/* AssetTransactionTable 컴포넌트 */}
            <AssetTransactionTable />
        </Box>
    );
}
