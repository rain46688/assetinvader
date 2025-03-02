import * as React from 'react';
import { AssetTypeData } from '@/redux/asset_type/AssetType';

// redux 관련 임포트
import { useAppDispatch, useAppSelector } from '@/app/store';

// material-ui 관련 임포트
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import RefreshIcon from '@mui/icons-material/Refresh';

interface EnhancedTableToolbarProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  setOrderBy: React.Dispatch<React.SetStateAction<keyof AssetTypeData>>;
  getList: (id: string) => Promise<void>;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { page, setPage, setOrder, setOrderBy, getList } = props;

  // 목록 새로고침
  const handleRefreshList = () => {
    console.log('=== handleRefreshList === ');
    setOrder('asc');
    setOrderBy('asset_type');
    // 새로고침 시 현재 페이지로 이동
    setPage(page);
    // 목록 새로고침
    getList(sessionStorage.getItem('id') + '');
  };

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 }
          }}>
        <Typography
          sx={{
            flex: '1 1 100%',
            fontSize: 'clamp(14px, 4vw, 24px)',
          }}
          variant="h6"
          id="tableTitle"
          component="div">
          유형별 자산관리
        </Typography>
        <Tooltip title="새로고침">
          <IconButton sx={{ flex: '1 1 25%' }} aria-label="refresh" onClick={handleRefreshList}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </React.Fragment>
  );
}
