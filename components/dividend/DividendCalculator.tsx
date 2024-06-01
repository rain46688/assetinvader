"use client";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { ChangeEvent } from 'react';

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";

// 스낵바 관련 임포트
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AlertColor } from "@mui/material";

import AssetNameInput from "./AssetNameInput";
import { useDividend } from "@/hooks/dividend/useDividend";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function DividendCalculator() {
  const {
    openCalPage,
    exDividendDate,
    selectedAssetAmount,
    dividendPricePerAmount,
    dividendPrice,
    dividendDate,
    snack,
    snackBarStatus,
    snackMessage,
    handleSelectAssetName,
    handleSearchAssetAmount,
    handleDateAccept,
    handlePriceDataChange,
    hadleSavePriceData,
    handleSnackClose,
  } = useDividend();
  return (
    <>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* 스낵바 설정 */}
        <Snackbar
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
        </Snackbar>
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
            variant="h6"
            id="tableTitle"
            component="div"
          >
            확정배당금 입력
          </Typography>
        </Toolbar>

        <Grid
          container
          alignItems="center"
          alignSelf="center"
        >
          <FormGrid item xs={12} md={1}></FormGrid>
          <FormGrid item xs={12} md={2}>
            <Typography
              sx={{ width: { xs: "100%" } }}
              variant="body1"
              component="div"
              textAlign="center"
            >
              자산이름
            </Typography>
          </FormGrid>
          <FormGrid item xs={12} md={2}>
            <AssetNameInput handleSelectAssetName={handleSelectAssetName} />
          </FormGrid>
          <FormGrid item xs={12} md={2}>
            <Typography
              sx={{ width: "100%" }}
              variant="body1"
              id="tableTitle"
              component="div"
              alignSelf="center"
              textAlign="center"
            >
              배당락일
            </Typography>
            {/*  */}
          </FormGrid>
          <FormGrid item xs={12} md={2.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ width: "33%s" }}>
                <MobileDatePicker
                  label="날짜 선택"
                  format="YYYY-MM-DD"
                  sx={{ width: "33%" }}
                  onAccept={(date) => {
                    handleDateAccept(date, "exDividendDate");
                  }}
                  value={exDividendDate == '' ? '' : dayjs(exDividendDate)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </FormGrid>
          <FormGrid item xs={12} md={1.5}>
            <Button
              sx={{ width: { xs: "100%" } }}
              variant="contained"
              color="primary"
              onClick={() => {
                handleSearchAssetAmount();
              }}
            >
              검색
            </Button>
          </FormGrid>
          <FormGrid item xs={12} md={1}></FormGrid>
        </Grid>
        <br />
      </Paper>
      {openCalPage ? (
        <>
          <br />
          <Paper sx={{ width: "100%", mb: 2 }}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              alignSelf="center"
            >
              {/* 1행 */}
              <FormGrid item xs={12} md={1}></FormGrid>
              <FormGrid item xs={12} md={2}>
                <Typography
                  sx={{ width: { xs: "100%" } }}
                  variant="body1"
                  id="tableTitle"
                  component="div"
                  textAlign="center"
                >
                  자산수량(주)
                </Typography>
              </FormGrid>
              <FormGrid item xs={12} md={2}>
                <TextField
                  variant="standard"
                  disabled={true}
                  value={selectedAssetAmount}
                />
              </FormGrid>
              <FormGrid item xs={12} md={2}>
                <Typography
                  sx={{ width: { xs: "100%" } }}
                  variant="body1"
                  id="tableTitle"
                  component="div"
                  alignSelf="center"
                  textAlign="center"
                >
                  주당 확정배당금(원)
                </Typography>
              </FormGrid>
              <FormGrid item xs={12} md={2}>
                <TextField
                  variant="standard"
                  value={dividendPricePerAmount}
                  onChange={(event: ChangeEvent<any>) =>
                    handlePriceDataChange(event)
                  }
                />
              </FormGrid>
              <FormGrid item xs={12} md={0.5}></FormGrid>
              <FormGrid item xs={12} md={1.5}>
                <Button
                  sx={{ width: { xs: "100%" } }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    hadleSavePriceData();
                  }}
                >
                  저장
                </Button>
              </FormGrid>
              <FormGrid item xs={12} md={1}></FormGrid>
              {/* 2행 */}
              <FormGrid item xs={12} md={1}></FormGrid>
              <FormGrid item xs={12} md={2}></FormGrid>
              <FormGrid item xs={12} md={2}></FormGrid>
              <FormGrid item xs={12} md={2}>
                <Typography
                  sx={{ width: { xs: "100%" } }}
                  variant="body1"
                  id="tableTitle"
                  component="div"
                  alignSelf="center"
                  textAlign="center"
                >
                  확정 배당금(원)
                </Typography>
              </FormGrid>
              <FormGrid item xs={12} md={2}>
                <TextField
                  variant="standard"
                  disabled={true}
                  value={dividendPrice}
                />
              </FormGrid>
              <FormGrid item xs={12} md={2}></FormGrid>
              <FormGrid item xs={12} md={1}></FormGrid>
              {/* 3행 */}
              <FormGrid item xs={12} md={1}></FormGrid>
              <FormGrid item xs={12} md={2}></FormGrid>
              <FormGrid item xs={12} md={2}></FormGrid>
              <FormGrid item xs={12} md={2}>
                <Typography
                  sx={{ width: "100%" }}
                  variant="body1"
                  id="tableTitle"
                  component="div"
                  alignSelf="center"
                  textAlign="center"
                >
                  배당금 지급일
                </Typography>
                {/*  */}
              </FormGrid>
              <FormGrid item xs={12} md={2.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DatePicker"]}
                    sx={{ width: "33%" }}
                  >
                    <MobileDatePicker
                      label="날짜 선택"
                      format="YYYY-MM-DD"
                      sx={{ width: "33%" }}
                      onAccept={(date) => {
                        handleDateAccept(date, "DividendDate");
                      }}
                      value={dividendDate == '' ? '' : dayjs(dividendDate)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </FormGrid>
              <FormGrid item xs={12} md={1.5}></FormGrid>
              <FormGrid item xs={12} md={1}></FormGrid>
            </Grid>
            <br />
          </Paper>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
