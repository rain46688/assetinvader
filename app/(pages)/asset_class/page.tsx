// material-ui 관련 임포트
import Box from '@mui/material/Box';
import AssetClassTable from '@/components/asset_class/AssetClassTable';
import AssetClassChart from '@/components/asset_class/AssetClassChart';

export default function AsetClassPage() {

  return (
    <Box sx={{ width: '100%' }}>
      {/* AssetClassTable 컴포넌트 */}
      <AssetClassTable/>
      <AssetClassChart/>
    </Box>
  );
}
