import * as React from 'react';

// material-ui 관련 임포트
import Box from '@mui/material/Box';
import AssetClassTable from '@/components/asset_class/AssetClassTable';

export default function AsetClassPage() {

  return (
    <Box sx={{ width: '100%' }}>
      {/* AssetClassTable 컴포넌트 */}
      <AssetClassTable/>
    </Box>
  );
}
