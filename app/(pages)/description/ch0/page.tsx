import * as React from 'react';

// material-ui 관련 임포트
import Box from "@mui/material/Box";
import Ch0Page from '@/components/description/Ch0';

export default function DescriptionCH0Page() {
  return (
    <Box sx={{ width: "100%", pb: { sm:4 } }}>
      <Ch0Page/>
    </Box>
  );
}
