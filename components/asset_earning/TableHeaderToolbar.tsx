import * as React from 'react';
import { sendPost, sendDelete } from '@/utils/fetch';
import { createData } from '@/redux/asset_earning/AssetEarning';
import { AssetEarningData } from '@/redux/asset_earning/AssetEarning';
import { AssetEarningValidation } from '@/redux/asset_earning/AssetEarning';

// redux 관련 임포트
import { setAssetEarningList } from '@/redux/asset_earning/assetEarningSlice';
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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: readonly number[];
  setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
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
  const { numSelected, selected, setSelected, setPage, rowsPerPage, setOrder, setOrderBy,
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
      cash_amount: true,
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

  // 선택된 항목 삭제
  const handleDeleteList = async () => {
    console.log('=== handleDeleteList === ');

    console.log(selected);

    selected.forEach(async (id) => {
      const result = await sendDelete('assettransaction/delete_assettransaction/' + id);
      if (result.status === 'success') {
        const newList = list.filter((item) => !selected.includes(item.id));
        setSelected([]);
        // 삭제 시에 마지막 페이지로 이동
        const movePage = Math.ceil((newList.length) / rowsPerPage) - 1;
        setPage(movePage);
        setOrder('asc');
        setOrderBy('trns_date');
        setSnack(true);
        setSnackMessage("데이터 삭제 완료.");
        setSnackBarStatus("success");
        dispatch(setAssetEarningList(newList));
      } else {
        setSnack(true);
        setSnackMessage("데이터 삭제 실패.");
        setSnackBarStatus("error");
        console.log("fail");
      }
    });
  };

  // 목록 새로고침
  const handleRefreshList = () => {
    console.log('=== handleRefreshList === ');
    setOrder('asc');
    setOrderBy('trns_date');
    setPage(0);
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
      new_data.trns_type = "매수";
    }

    // 서버에 데이터 추가
    const data = JSON.stringify({
      "asset_id": (new_data as any).asset_id,
      "trns_type": new_data.trns_type,
      "amount": 0,
      "cash_amount": new_data.cash_amount,
      "trns_date": new_data.trns_date
    });

    const result = await sendPost(data, 'assettransaction/add_assettransaction');
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
    } else {
      console.log("fail");
      setSnack(true);
      setSnackMessage("데이터 추가 실패.");
      setSnackBarStatus("error");
      setAddStatus(false);
      setIsNotSortStatus(false);
      dispatch(setAssetEarningList([...list]));
    }
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
          자산수익 기록
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteList}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          {!addStatus ? (
            <>
              <Tooltip title="Refresh">
                <IconButton aria-label="refresh" onClick={handleRefreshList}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add">
                <IconButton onClick={handleAddList}>
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
        </>
      )}
    </Toolbar>
  );
}
