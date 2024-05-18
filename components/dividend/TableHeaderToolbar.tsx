import * as React from "react";
import { sendPost, sendDelete } from "@/utils/fetch";
import { createData } from "@/redux/dividend/Dividend";
import { DividendData } from "@/redux/dividend/Dividend";

// redux 관련 임포트
import { setDividendList } from "@/redux/dividend/dividendSlice";
import { useAppDispatch, useAppSelector } from "@/app/store";

// material-ui 관련 임포트
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: readonly number[];
  setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  setOrderBy: React.Dispatch<React.SetStateAction<keyof DividendData>>;
  setSnack: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackMessage: React.Dispatch<React.SetStateAction<string>>;
  setSnackBarStatus: React.Dispatch<React.SetStateAction<string>>;
  getList: (id: string) => Promise<void>;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    numSelected,
    selected,
    setSelected,
    setPage,
    rowsPerPage,
    setOrder,
    setOrderBy,
    setSnack,
    setSnackMessage,
    setSnackBarStatus,
    getList,
  } = props;

  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.dividendReducer); // Redux 상태에서 필요한 데이터 읽어오기

  // 선택된 항목 삭제
  const handleDeleteList = async () => {
    console.log("=== handleDeleteList === ");

    console.log(selected);

    selected.forEach(async (id) => {
      const result = await sendDelete("cashflow/delete_cashflow/" + id);
      if (result.status === "success") {
        const newList = list.filter((item) => !selected.includes(item.id));
        setSelected([]);
        // 삭제 시에 마지막 페이지로 이동
        const movePage = Math.ceil(newList.length / rowsPerPage) - 1;
        setPage(movePage);
        setOrder("desc");
        setOrderBy("occurrence_date");
        setSnack(true);
        setSnackMessage("데이터 삭제 완료.");
        setSnackBarStatus("success");
        dispatch(setDividendList(newList));
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
    console.log("=== handleRefreshList === ");
    setOrder("desc");
    setOrderBy("occurrence_date");
    setPage(0);
    // 목록 새로고침
    getList(sessionStorage.getItem("id") + "");
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          확정배당금
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="삭제">
          <IconButton onClick={handleDeleteList}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="새로고침">
          <IconButton aria-label="refresh" onClick={handleRefreshList}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
