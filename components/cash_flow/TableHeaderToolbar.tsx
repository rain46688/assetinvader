import * as React from "react";
import { CashFlowData } from "@/redux/cash_flow/CashFlow";

// redux 관련 임포트
import { useAppDispatch, useAppSelector } from "@/app/store";

// material-ui 관련 임포트
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RefreshIcon from "@mui/icons-material/Refresh";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';

interface EnhancedTableToolbarProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  setOrderBy: React.Dispatch<React.SetStateAction<keyof CashFlowData>>;
  getList: (id: string) => Promise<void>;
  year: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    setPage,
    setOrder,
    setOrderBy,
    getList,
    year,
    setYear
  } = props;

  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.cashFlowReducer); // Redux 상태에서 필요한 데이터 읽어오기

  // 목록 새로고침
  const handleRefreshList = () => {
    console.log("=== handleRefreshList === ");
    setOrder("asc");
    setOrderBy("asset_name");
    setPage(0);
    // 목록 새로고침
    getList(sessionStorage.getItem("id") + "");
  };

  
  // 날짜 선택 이벤트
  const handleDateAccept = (date: any) => {
      console.log(" === handleDateAccept === ");
      setYear(date.$y + '');
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          월별 이자·배당 예상금 조회
        </Typography>
      
                {/*  */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{ width: '33%' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: '10vh' }}>
                            </div>
                            <MobileDatePicker
                                format="YYYY"
                                sx={{
                                    '& .MuiInputBase-root': {
                                        width: '100%',
                                        fontSize: '15px',
                                    }
                                }}
                                views={['year']}
                                onAccept={(date) => { handleDateAccept(date) }}
                                value={dayjs((year))}
                            />
                        </div>
                    </DemoContainer>
                </LocalizationProvider>
      <Tooltip title="Refresh">
        <IconButton aria-label="refresh" onClick={handleRefreshList}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
