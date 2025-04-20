import * as React from 'react';
import { sendPost, sendDelete } from '@/utils/fetch';
import { formatDate } from '@/utils/format';
import { createData } from '@/redux/asset_type/AssetType';
import { AssetTypeData, AssetTypeValidation } from '@/redux/asset_type/AssetType';

import * as XLSX from "xlsx";

// redux 관련 임포트
import { setAssetTypeList } from '@/redux/asset_type/assetTypeSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';


// material-ui 관련 임포트
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: readonly number[];
  setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  setOrderBy: React.Dispatch<React.SetStateAction<keyof AssetTypeData>>;
  setSnack: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackMessage: React.Dispatch<React.SetStateAction<string>>;
  setSnackBarStatus: React.Dispatch<React.SetStateAction<string>>;
  getList: (id: string) => Promise<void>;
  validationList: AssetTypeValidation[];
  setValidationList: React.Dispatch<React.SetStateAction<AssetTypeValidation[]>>;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, selected, setSelected, setPage, rowsPerPage, setOrder, setOrderBy,
    setSnack, setSnackMessage, setSnackBarStatus, getList, validationList, setValidationList } = props;
  const dispatch = useAppDispatch();
  const list = useAppSelector(state => state.assetTypeReducer); // Redux 상태에서 필요한 데이터 읽어오기

  // 항목 추가
  const handleAddList = async () => {
    console.log('=== handleAddList === ');
    const id = sessionStorage.getItem('id');
    const data = JSON.stringify({
      "member_id": id,
      "asset_type": "미분류",
      "asset_big_class": "미분류",
      "asset_mid_class": "",
      "asset_acnt": "",
      "asset_name": "",
      "amount": 0,
      "earning_rate": 0,
    });
    const result = await sendPost(data, 'asset/add_asset');
    if (result.status === 'success') {
      const data = result.data;
      const newList = [
        ...list,
        createData(
          data.id,
          data.member_id,
          data.asset_type,
          data.asset_big_class,
          data.asset_mid_class,
          data.asset_acnt,
          data.asset_name,
          data.amount,
          data.earning_rate,
          formatDate(new Date() + ''),
          formatDate(new Date() + ''),
          1
        )
      ];

      // validationList에 추가
      const newValList = [...validationList, { id: data.id, asset_acnt: true, asset_name: true, amount: true, earning_rate: true }];
      setValidationList(newValList);

      // 추가 시에 마지막 페이지로 이동
      const movePage = Math.ceil((newList.length) / rowsPerPage) - 1;
      setPage(movePage);
      setOrder('asc');
      setOrderBy('asset_type');
      setSnack(true);
      setSnackMessage("데이터 추가 완료.");
      setSnackBarStatus("success");
      dispatch(setAssetTypeList(newList));
    } else {
      console.log("fail");
      setSnack(true);
      setSnackMessage("데이터 추가 실패.");
      setSnackBarStatus("error");
    }
  };

  // 선택된 항목 삭제
  const handleDeleteList = async () => {
    console.log('=== handleDeleteList === ');
    selected.forEach(async (id) => {
      const result = await sendDelete('asset/delete_asset/' + id);
      if (result.status === 'success') {
        const newList = list.filter((item) => !selected.includes(item.id));
        setSelected([]);
        // 삭제 시에 마지막 페이지로 이동
        const movePage = Math.ceil((newList.length) / rowsPerPage) - 1;
        setPage(movePage);
        setOrder('asc');
        setOrderBy('asset_type');
        setSnack(true);
        setSnackMessage("데이터 삭제 완료.");
        setSnackBarStatus("success");
        dispatch(setAssetTypeList(newList));
      } else {
        console.log("fail");
        setSnack(true);
        setSnackMessage("데이터 삭제 실패.");
        setSnackBarStatus("error");
      }
    });
  };

  // 목록 새로고침
  const handleRefreshList = () => {
    console.log('=== handleRefreshList === ');
    setOrder('asc');
    setOrderBy('asset_type');
    setPage(0);
    // 목록 새로고침
    getList(sessionStorage.getItem('id') + '');
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div">
          유형별 자산관리
        </Typography>
      )}
      {/* refresh */}
      <Tooltip title="새로고침">
        <IconButton aria-label="refresh" onClick={handleRefreshList}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
      {numSelected > 0 ? (
        <Tooltip title="삭제">
          <IconButton onClick={handleDeleteList}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="추가">
          <IconButton onClick={handleAddList}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
