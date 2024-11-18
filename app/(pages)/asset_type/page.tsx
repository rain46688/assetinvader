// material-ui 관련 임포트
import Box from '@mui/material/Box';
import AssetTypeTable from '@/components/asset_type/AssetTypeTable';
import AssetTypeChart from '@/components/asset_type/AssetTypeChart';
import { useMediaQuery } from "@mui/material";

export default function AssetTypePage() {

  // 모바일 페이지 체크
  const isMobile = useMediaQuery('(max-width:600px) or (max-height:600px)');

  return (
    <Box sx={{ width: '100%' }}>
      {isMobile ? (
        <>
          {/* AssetTypeTable 모바일 컴포넌트 */}
          <AssetTypeTable />
          {/* AssetTypeChart 모바일 컴포넌트 */}
          <AssetTypeChart />
        </>
      ) : (
        <>
          {/* AssetTypeTable 컴포넌트 */}
          <AssetTypeTable />
          {/* AssetTypeChart 컴포넌트 */}
          <AssetTypeChart />
        </>
      )}
    </Box>
  );
}
