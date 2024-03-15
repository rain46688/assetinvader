import * as React from 'react';
import { sendPost, sendDelete } from '@/utils/fetch';
import { formatDate } from '@/utils/format';
import { createData } from '@/redux/asset_class/AssetClass';

// redux 관련 임포트
import { setAssetClassList } from '@/redux/asset_class/assetClassSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';


// material-ui 관련 임포트
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: readonly number[];
  setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, selected, setSelected, setPage, rowsPerPage } = props;
  const dispatch = useAppDispatch();
  const list = useAppSelector(state => state.assetClassReducer); // Redux 상태에서 필요한 데이터 읽어오기

  // 항목 추가
  const handleAddList = async () => {
    console.log('=== handleAddList === ');
    console.log("list : ", list);
    const id = sessionStorage.getItem('id');
    const data = JSON.stringify({
      "member_id": id,
      "asset_type": "",
      "asset_big_class": "",
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
      // 추가 시에 마지막 페이지로 이동
      const movePage = Math.ceil((newList.length) / rowsPerPage) - 1;
      console.log("movePage : ", movePage);
      setPage(movePage);
      dispatch(setAssetClassList(newList));
    } else {
      console.log("fail");
    }
  };

  // 선택된 항목 삭제
  const handleDeleteList = async () => {
    console.log('=== handleDeleteList === ');
    console.log("selected : ", selected);

    selected.forEach(async (id) => {
      const result = await sendDelete('asset/delete_asset/' + id);
      if (result.status === 'success') {
        const newList = list.filter((item) => !selected.includes(item.id));
        setSelected([]);
        // 삭제 시에 마지막 페이지로 이동
        const movePage = Math.ceil((newList.length) / rowsPerPage) - 1;
        console.log("movePage : ", movePage);
        setPage(movePage);
        dispatch(setAssetClassList(newList));
      } else {
        console.log("fail");
      }
    });
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
          AssetClassList
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteList}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add">
          <IconButton onClick={handleAddList}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
