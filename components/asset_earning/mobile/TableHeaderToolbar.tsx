import * as React from 'react';
import { sendPost } from '@/utils/fetch';
import { createData } from '@/redux/asset_earning/AssetEarning';
import { AssetEarningData } from '@/redux/asset_earning/AssetEarning';
import { AssetEarningValidation } from '@/redux/asset_earning/AssetEarning';

// redux 관련 임포트
import { setAssetEarningList } from '@/redux/asset_earning/assetEarningSlice';
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
  numSelected: number;
  selected: readonly number[];
  setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  setOrderBy: React.Dispatch<React.SetStateAction<keyof AssetEarningData>>;
  validationList: AssetEarningValidation[];
  setValidationList: React.Dispatch<React.SetStateAction<AssetEarningValidation[]>>;
  addStatus: boolean;
  setAddStatus: React.Dispatch<React.SetStateAction<boolean>>;
  validation: boolean;
  setSnack: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackMessage: React.Dispatch<React.SetStateAction<string>>;
  setSnackBarStatus: React.Dispatch<React.SetStateAction<string>>;
  setIsNotSortStatus: React.Dispatch<React.SetStateAction<boolean>>;
  getList: (id: string) => Promise<void>;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, selected, setSelected, page, setPage, rowsPerPage, setOrder, setOrderBy,
    validationList, setValidationList, addStatus, setAddStatus, validation, setSnack, setSnackMessage, setSnackBarStatus, setIsNotSortStatus, getList } = props;

  const dispatch = useAppDispatch();
  const list = useAppSelector(state => state.assetEarningReducer); // Redux 상태에서 필요한 데이터 읽어오기

  // 항목 추가
  const handleAddList = async () => {
    console.log('=== handleAddList === ');

    // 추가 버튼 클릭 시 addStatus 변경
    if (addStatus == false) {
      setAddStatus(true);
    }

    const newList = [
      ...list,
      createData(
        0,
        "",
        "",
        "매매",
        0,
        ""
      )
    ];

    // 유효성 검사 리스트에 추가
    validationList.push({
      id: list.length,
      asset_name: true,
      asset_acnt: true,
      trns_type: true,
      amount: true,
      trns_date: true
    });

    // 유효성 검사 리스트 업데이트
    setValidationList(validationList);

    // 추가 시에 마지막 페이지로 이동
    const movePage = Math.ceil((newList.length) / rowsPerPage) - 1;
    setPage(movePage);
    setOrder('asc');
    setOrderBy('trns_date');
    dispatch(setAssetEarningList(newList));
  };

  // 목록 새로고침
  const handleRefreshList = () => {
    console.log('=== handleRefreshList === ');
    setOrder('asc');
    setOrderBy('trns_date');
    // 새로고침 시 현재 페이지로 이동
    setPage(page);
    // 목록 새로고침
    getList(sessionStorage.getItem('id') + '');
  };

  // 항목 추가 완료
  const handleCompleteList = async () => {
    console.log('=== handleCompleteList === ');
    const new_data = { ...list[list.length - 1] };

    // 유효성 검사
    if (validation == false) {
      // 유효성 검사 실패시 return
      console.log(" === 유효성 검사 실패 === ");
      setSnack(true);
      setSnackMessage("데이터 유효성 검사 실패.");
      setSnackBarStatus("warning");
      return;
    }

    // 아무것도 없는 경우에는 맨위에 보여지는 매수 값으로 설정
    if (new_data.trns_type === "") {
      new_data.trns_type = "매매";
    }


    console.log(new_data);

    // 서버에 데이터 추가
    const data = JSON.stringify({
      "member_id": sessionStorage.getItem('id'),
      "asset_acnt": new_data.asset_acnt,
      "asset_name": new_data.asset_name,
      "trns_type": new_data.trns_type,
      "amount": new_data.amount,
      "trns_date": new_data.trns_date
    });

    const result = await sendPost(data, 'assetearning/add_assetearning');
    if (result.status === 'success') {
      setSnack(true);
      setSnackMessage("데이터 추가 완료.");
      setSnackBarStatus("success");
      setAddStatus(false);
      setIsNotSortStatus(false);
      // 기존 리스트에 추가된 임시 id값 데이터의 id(0임)를 서버에 추가 후 반환 받은 진짜 id로 변경
      let newList = [...list];
      let lastItem = { ...newList[newList.length - 1] };
      lastItem.id = result.data.id;
      newList[newList.length - 1] = lastItem;
      dispatch(setAssetEarningList(newList));
      // 다시 추가할때 순서가 입력된 순서로 정렬되어 처리하기 위함
      handleRefreshList();
    } else {
      console.log("fail");
      setSnack(true);
      setSnackMessage("데이터 추가 실패.");
      setSnackBarStatus("error");
      setAddStatus(false);
      setIsNotSortStatus(false);
      dispatch(setAssetEarningList([...list]));
    }
    setOrder('asc');
    setOrderBy('trns_date');
  };

  // 항목 추가 취소
  const handleCloseList = () => {
    console.log('=== handleCloseList === ');
    const newList = list.filter((item) => item.id !== 0);
    setSelected([]);
    setAddStatus(false);
    dispatch(setAssetEarningList(newList));
    // 추가 시에 마지막 페이지로 이동
    const movePage = Math.ceil((newList.length) / rowsPerPage) - 1;
    setPage(movePage);
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
        <Typography
          sx={{
            flex: '1 1 100%',
            fontSize: 'clamp(14px, 4vw, 24px)',
          }}
          variant="h6"
          id="tableTitle"
          component="div">
          자산수익 기록
        </Typography>
      {!addStatus ? (
        <>
          <Tooltip title="새로고침">
            <IconButton sx={{ flex: '1 1 25%' }} aria-label="refresh" onClick={handleRefreshList}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="수기입력">
            <IconButton sx={{ flex: '1 1 25%' }} onClick={handleAddList}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title="Close">
            <IconButton onClick={handleCloseList}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Complete">
            <IconButton onClick={handleCompleteList}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
}
