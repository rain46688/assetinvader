import * as React from 'react';
import { InviteCodeData } from '@/redux/invitecode/InviteCode';

// redux 관련 임포트
import { useAppSelector } from '@/app/store';


// material-ui 관련 임포트
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';

interface EnhancedTableToolbarProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  setOrderBy: React.Dispatch<React.SetStateAction<keyof InviteCodeData>>;
  getList: (id: string) => Promise<void>;
  createInviteCode: (id: string) => Promise<void>;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { setPage, setOrder, setOrderBy, getList, createInviteCode } = props;
  const list = useAppSelector(state => state.inviteCodeReducer); // Redux 상태에서 필요한 데이터 읽어오기

  // 목록 새로고침
  const handleRefreshList = () => {
    console.log('=== handleRefreshList === ');
    setOrder('asc');
    setOrderBy('member_id');
    setPage(0);
    // 목록 새로고침
    getList(sessionStorage.getItem('id') + '');
  };

  const hadleCreateInviteCode = () => {
    createInviteCode(sessionStorage.getItem('id') + '');
    
    // 목록 새로고침
    getList(sessionStorage.getItem('id') + '');
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}>
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div">
        초대코드 관리
      </Typography>
      <Tooltip title="초대코드 생성">
        <IconButton aria-label="create" onClick={hadleCreateInviteCode}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="새로고침">
        <IconButton aria-label="refresh" onClick={handleRefreshList}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
