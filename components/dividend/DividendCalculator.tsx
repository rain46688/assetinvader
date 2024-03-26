"use client";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import NativeSelect from "@mui/material/NativeSelect";
import Button from "@mui/material/Button";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";

// 스낵바 관련 임포트
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AlertColor } from "@mui/material";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function DividendCalculator() {
  return (
    <>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* 스낵바 설정 */}
        {/* <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={snack}
            autoHideDuration={5000}
            onClose={handleSnackClose}>
            <Alert
                onClose={handleSnackClose}
                severity={snackBarStatus as AlertColor}
                variant="filled"
                sx={{ width: '100%' }}>
                {snackMessage}
            </Alert>
        </Snackbar> */}

        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            pt: { sm: 3 },
            pb: { sm: 3 },
          }}
        >
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h4"
            id="tableTitle"
            component="div"
          >
            확정배당금 입력
          </Typography>
        </Toolbar>

        <Grid
          container
          sx={{
            pl: { sm: 15 },
            pr: { sm: 15 },
            pb: { sm: 3 },
          }}
          alignItems="center"
          alignSelf="center"
        >
          <FormGrid item xs={12} md={4}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignSelf="center"
              spacing={1}
              useFlexGap
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              <Typography
                sx={{ width: { xs: "100%" } }}
                variant="h6"
                id="tableTitle"
                component="div"
                textAlign="center"
              >
                자산이름
              </Typography>
              <NativeSelect
                value=""
                // value={row.asset_big_class || ""}
                // onChange={(event: ChangeEvent<any>) =>
                //   handleDataChange(event, row.id, "asset_big_class")
                // }
                // onBlur={(event: ChangeEvent<any>) =>
                //   handleDataBlur(event, row.id, "asset_big_class")
                // }
                style={{ width: "150px", border: "none" }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <option value={"투자자산"}>투자자산</option>
                <option value={"배당자산"}>배당자산</option>
                <option value={"안전자산"}>안전자산</option>
                <option value={"현금자산"}>현금자산</option>
              </NativeSelect>
            </Stack>
          </FormGrid>
          <FormGrid item xs={12} md={6}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignSelf="center"
              spacing={1}
              useFlexGap
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              <Typography
                sx={{ width: "150px" }}
                variant="h6"
                id="tableTitle"
                component="div"
                alignSelf="center"
                textAlign="center"
              >
                배당락일
              </Typography>
              {/*  */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ width: { xs: "100%" } }}
                >
                  <MobileDatePicker
                    label="날짜 선택"
                    format="YYYY-MM"
                    sx={{ width: { xs: "100%" } }}
                    views={["month", "year"]}
                    // onAccept={(date) => { handleDateAccept(date) }} value={dayjs((new Date().getFullYear()) + '-' + (new Date().getMonth() + 1))}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Stack>
          </FormGrid>
          <FormGrid item xs={12} md={2} alignItems="center">
            <Button
              sx={{ width: { xs: "100%" } }}
              variant="contained"
              color="primary"
            >
              검색
            </Button>
          </FormGrid>
        </Grid>
      </Paper>
      <br/>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Grid
          container
          sx={{
            pl: { sm: 15 },
            pr: { sm: 15 },
            pb: { sm: 3 },
          }}
          spacing={2}
          alignItems="center"
          alignSelf="center"
        >
            
        {/* 1행 */}
          <FormGrid item xs={12} md={5}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignSelf="center"
              spacing={1}
              useFlexGap
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              <Typography
                sx={{ width: { xs: "100%" } }}
                variant="h6"
                id="tableTitle"
                component="div"
                textAlign="center"
              >
                자산수량(주)
              </Typography>
              <TextField
                variant="standard"
                value={0}
                // helperText={
                //   validationList.find((item) => item.id === row.id)?.amount
                //     ? "숫자 입력"
                //     : ""
                // }
                // error={
                //   validationList.find((item) => item.id === row.id)?.amount
                // }
                // value={row.amount || 0}
                // onChange={(event: ChangeEvent<any>) =>
                //   handleDataChange(event, row.id, "amount")
                // }
                // onBlur={(event) => handleDataBlur(event, row.id, "amount")}
              />
            </Stack>
          </FormGrid>
          <FormGrid item xs={12} md={5}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignSelf="center"
              spacing={1}
              useFlexGap
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              <Typography
                sx={{ width: { xs: "100%" } }}
                variant="h6"
                id="tableTitle"
                component="div"
                alignSelf="center"
                textAlign="center"
              >
                주당 확정배당금(원)
              </Typography>
              <TextField
                variant="standard"
                value={0}
                // helperText={
                //   validationList.find((item) => item.id === row.id)?.amount
                //     ? "숫자 입력"
                //     : ""
                // }
                // error={
                //   validationList.find((item) => item.id === row.id)?.amount
                // }
                // value={row.amount || 0}
                // onChange={(event: ChangeEvent<any>) =>
                //   handleDataChange(event, row.id, "amount")
                // }
                // onBlur={(event) => handleDataBlur(event, row.id, "amount")}
              />
            </Stack>
          </FormGrid>
          <FormGrid item xs={12} md={2} alignItems="center">
            <Button
              sx={{ width: { xs: "100%" } }}
              variant="contained"
              color="primary"
            >
              확정배당금 저장
            </Button>
          </FormGrid>
        {/* 2행 */}
          <FormGrid item xs={12} md={5}>
          </FormGrid>
          <FormGrid item xs={12} md={5}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignSelf="center"
              spacing={1}
              useFlexGap
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              <Typography
                sx={{ width: { xs: "100%" } }}
                variant="h6"
                id="tableTitle"
                component="div"
                alignSelf="center"
                textAlign="center"
              >
                총 배당금(원)
              </Typography>
              <TextField
                variant="standard"
                value={0}
                // helperText={
                //   validationList.find((item) => item.id === row.id)?.amount
                //     ? "숫자 입력"
                //     : ""
                // }
                // error={
                //   validationList.find((item) => item.id === row.id)?.amount
                // }
                // value={row.amount || 0}
                // onChange={(event: ChangeEvent<any>) =>
                //   handleDataChange(event, row.id, "amount")
                // }
                // onBlur={(event) => handleDataBlur(event, row.id, "amount")}
              />
            </Stack>
          </FormGrid>
          <FormGrid item xs={12} md={2} alignItems="center">
          </FormGrid>
          {/* 3행 */}
          <FormGrid item xs={12} md={4}>
          </FormGrid>
          <FormGrid item xs={12} md={6}>
          <Stack
              direction={{ xs: "column", sm: "row" }}
              alignSelf="center"
              spacing={1}
              useFlexGap
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              <Typography
                sx={{ width: "150px" }}
                variant="h6"
                id="tableTitle"
                component="div"
                alignSelf="center"
                textAlign="center"
              >
                배당금 지급일
              </Typography>
              {/*  */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ width: { xs: "100%" } }}
                >
                  <MobileDatePicker
                    label="날짜 선택"
                    format="YYYY-MM"
                    sx={{ width: { xs: "100%" } }}
                    views={["month", "year"]}
                    // onAccept={(date) => { handleDateAccept(date) }} value={dayjs((new Date().getFullYear()) + '-' + (new Date().getMonth() + 1))}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Stack>
          </FormGrid>
          <FormGrid item xs={12} md={2} alignItems="center">
          </FormGrid>
        </Grid>
      </Paper>
    </>
  );
}
