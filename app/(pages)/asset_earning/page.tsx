// material-ui 관련 임포트
import Box from '@mui/material/Box';
import AssetEarningTable from '@/components/asset_earning/AssetEarningTable';
import AssetEarningChart from '@/components/asset_earning/AssetEarningChart';

export default function AssetEarningPage() {

    return (
        <Box sx={{ width: '100%' }}>
            {/* AssetEarningTable 컴포넌트 */}
            <AssetEarningTable />
            <AssetEarningChart />
        </Box>
    );
}
