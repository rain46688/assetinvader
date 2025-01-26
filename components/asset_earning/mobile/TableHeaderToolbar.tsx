import * as React from 'react';
import { sendPost } from '@/utils/fetch';
import { createData } from '@/redux/asset_earning/AssetEarning';
import { AssetEarningData } from '@/redux/asset_earning/AssetEarning';
import { AssetEarningValidation } from '@/redux/asset_earning/AssetEarning';
import { AssetName } from "@/redux/asset_earning/AssetEarning";
import { ChangeEvent } from 'react';

// redux 관련 임포트
import { setAssetEarningList } from '@/redux/asset_earning/assetEarningSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';

// material-ui 관련 임포트
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import NativeSelect from '@mui/material/NativeSelect';

// 날짜 관련 임포트
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

// 숫자 포맷 관련
import { NumericFormatCustom } from '@/utils/format';

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
  selectData: AssetName[];
  handleDataChange: (event: any, id: number, index: number, field: string) => void;
  handleDataAssetNameChange: (event: ChangeEvent<any>, id: number, index: number, field: string, newValue: AssetName) => void;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, selected, setSelected, page, setPage, rowsPerPage, setOrder, setOrderBy,
    validationList, setValidationList, addStatus, setAddStatus, validation, setSnack, setSnackMessage,
    setSnackBarStatus, setIsNotSortStatus, getList, selectData, handleDataChange, handleDataAssetNameChange } = props;

  const dispatch = useAppDispatch();
  const list = useAppSelector(state => state.assetEarningReducer); // Redux 상태에서 필요한 데이터 읽어오기
  console.log(list);

  const [openAddDialog, setOpenAddDialog] = React.useState(false);

  const handleClickOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  // 항목 추가
  const handleAddList = async () => {
    console.log('=== handleAddList === ');
    handleClickOpenAddDialog();

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

    // 새로운 데이터 추가
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
    handleCloseAddDialog();
  };

  // 항목 추가 취소
  const handleCloseList = () => {
    console.log('=== handleCloseList === ');
    const newList = list.filter((item) => item.id !== 0);
    dispatch(setAssetEarningList(newList));
    handleCloseAddDialog();
  };

  const options = [
    { id: '1', label: '매매' },
    { id: '2', label: '배당금' },
    { id: '3', label: '은행이자' },
    { id: '4', label: '채권이자' },
    { id: '5', label: '공모주' },
  ];

  return (
    <React.Fragment>
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
      </Toolbar>
      <Dialog
        open={openAddDialog}
        onClose={handleCloseList}
        // PaperProps={{
        //   component: 'form',
        //   onSubmit: () => {
        //     handleCompleteList();
        //     handleCloseAddDialog();
        //   },
        // }}
      >
        <DialogTitle>자산수익 내역추가</DialogTitle>
        <DialogContent>
          {list.length > 0 ? (
            <>{/* 자산계좌명 */}
              <Typography
                sx={{
                  flex: '1 1 100%',
                  fontSize: 'clamp(14px, 4vw, 24px)',
                }}
                variant="subtitle1"
                id="tableTitle"
                component="div">
                자산계좌명
              </Typography>
              <TextField
                value={list[list.length - 1].asset_acnt || ''}
                onChange={(event: ChangeEvent<any>) => handleDataChange(event, list[list.length - 1].id, list.length - 1, 'asset_acnt')}
              />
              {/* 자산명 */}
              <Typography
                sx={{
                  flex: '1 1 100%',
                  fontSize: 'clamp(14px, 4vw, 24px)',
                }}
                variant="subtitle1"
                id="tableTitle"
                component="div">
                자산계좌명
              </Typography>
              <Autocomplete
                // disablePortal
                freeSolo
                id="combo-box-demo"
                options={Array.from(new Map(selectData.map(item => [item.id, item])).values())}
                getOptionKey={(option) => typeof option === "string" ? 0 : option.id}
                onChange={
                  (event, newValue) => handleDataAssetNameChange(event, list[list.length - 1].id, list[list.length - 1].id, 'asset_name',
                    typeof newValue === "string" ? { id: 0, label: newValue, asset_acnt: list[list.length - 1].asset_acnt } : newValue || { id: 0, label: '', asset_acnt: list[list.length - 1].asset_acnt })}
                onBlur={(event: ChangeEvent<any>) => { handleDataAssetNameChange(event, list[list.length - 1].id, list[list.length - 1].id, 'asset_name', { id: 0, label: event.target.value, asset_acnt: list[list.length - 1].asset_acnt }) }}
                renderInput={(params) => <TextField key={params.id} {...params} />}
              />
              {/* 종류 */}
              <Typography
                sx={{
                  flex: '1 1 100%',
                  fontSize: 'clamp(14px, 4vw, 24px)',
                }}
                variant="subtitle1"
                id="tableTitle"
                component="div">
                종류
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={options}
                getOptionKey={(option) => typeof option === "string" ? 0 : option.id}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event: ChangeEvent<any>) => handleDataChange(event, list[list.length - 1].id, list.length - 1, 'trns_type')}
                onBlur={(event: ChangeEvent<any>) => handleDataChange(event, list[list.length - 1].id, list.length - 1, 'trns_type')}
                renderInput={(params) => <TextField {...params} />}
              />
              {/* 수익(원) */}
              <Typography
                sx={{
                  flex: '1 1 100%',
                  fontSize: 'clamp(14px, 4vw, 24px)',
                }}
                variant="subtitle1"
                id="tableTitle"
                component="div">
                수익(원)
              </Typography>
              <TextField
                helperText={validationList[list.length - 1]?.amount ? "숫자 입력" : ''}
                error={validationList[list.length - 1]?.amount}
                value={list[list.length - 1].amount || ''}
                onChange={(event: ChangeEvent<any>) => handleDataChange(event, list[list.length - 1].id, list.length - 1, 'amount')}
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
              />
              {/* 수익 발생일 */}
              <Typography
                sx={{
                  flex: '1 1 100%',
                  fontSize: 'clamp(14px, 4vw, 24px)',
                }}
                variant="subtitle1"
                id="tableTitle"
                component="div">
                수익 발생일
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DateField
                    sx={{ textAlignLast: 'center' }}
                    format="YYYY-MM-DD"
                    helperText={validationList[list.length - 1]?.trns_date ? "날짜 선택 필요" : ''}
                    onChange={(event: any) => handleDataChange(event, list[list.length - 1].id, list.length - 1, 'trns_date')}
                    value={''}
                  />
                </DemoContainer>
              </LocalizationProvider></>
          ) : (
            <></>
          )}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseList}>입력취소</Button>
          <Button onClick={handleCompleteList}>추가</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
