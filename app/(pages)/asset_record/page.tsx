// material-ui 관련 임포트
import Box from '@mui/material/Box';
import AssetRecordChart from '@/components/asset_record/AssetRecordChart';

export default function AssetRecordPage() {

    return (
        <Box sx={{ width: '100%' }}>
            <AssetRecordChart />
        </Box>
    );
}
