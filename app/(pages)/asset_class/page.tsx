"use client"

// material-ui 관련 임포트
import Box from '@mui/material/Box';
import AssetClassTable from '@/components/asset_class/AssetClassTable';
import AssetClassTableMobile from '@/components/asset_class/mobile/AssetClassTableMobile';
import AssetClassChart from '@/components/asset_class/AssetClassChart';
import { useMediaQuery } from "@mui/material";

export default function AssetClassPage() {

  // 모바일 페이지 체크
  const isMobile = useMediaQuery('(max-width:600px) or (max-height:600px)');

  return (
    <Box sx={{ width: '100%' }}>
      {isMobile ? (
        <>
          {/* AssetClassTable 모바일 컴포넌트 */}
          <AssetClassTableMobile />
          {/* AssetClassChart 모바일 컴포넌트 */}
          <AssetClassChart />
        </>
      ) : (
        <>
          {/* AssetClassTable 컴포넌트 */}
          <AssetClassTable />
          {/* AssetClassChart 컴포넌트 */}
          <AssetClassChart />
        </>
      )}
    </Box>
  );
}
