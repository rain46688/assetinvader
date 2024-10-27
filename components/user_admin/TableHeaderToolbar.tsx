import * as React from 'react';
import { sendPost, sendDelete, sendFile } from '@/utils/fetch';
import { createData } from '@/redux/user_admin/UserAdmin';
import { UserAdminData } from '@/redux/user_admin/UserAdmin';

// redux 관련 임포트
import { setUserAdminList } from '@/redux/user_admin/userAdminSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';

import * as XLSX from "xlsx";

// material-ui 관련 임포트
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AttachFileIcon from '@mui/icons-material/AttachFile';

interface EnhancedTableToolbarProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  setOrderBy: React.Dispatch<React.SetStateAction<keyof UserAdminData>>;
  getList: (id: string) => Promise<void>;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { setPage, setOrder, setOrderBy, getList } = props;

  const dispatch = useAppDispatch();
  const list = useAppSelector(state => state.userAdminReducer); // Redux 상태에서 필요한 데이터 읽어오기

  // 목록 새로고침
  const handleRefreshList = () => {
    console.log('=== handleRefreshList === ');
    setOrder('asc');
    setOrderBy('user_id');
    setPage(0);
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
        지출내역 기록
      </Typography>
      <Tooltip title="Refresh">
        <IconButton aria-label="refresh" onClick={handleRefreshList}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
