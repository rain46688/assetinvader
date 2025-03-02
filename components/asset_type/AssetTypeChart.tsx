"use client";

import { useState, useEffect } from "react";
import { sendGet } from "@/utils/fetch";
import { parseNumber } from "@/utils/format";
import { useMediaQuery } from "@mui/material";

// material-ui 관련 임포트
import Paper from "@mui/material/Paper";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";

export default function AssetTypeChart() {
  // get으로 가져온 데이터
  const [rawData, setRawData] = useState<any[]>([]);
  // 메인차트 데이터
  const [chartData, setChartData] = useState<any[]>([]);
  // 차트 합계값 저장
  const [sumChartData, setSumChartData] = useState(0);
  // 선택한 차트 컬럼명 저장
  const [chartItemData, setChartItemData] = useState("");
  // 세부차트 데이터
  const [detailChartData, setDetailChartData] = useState<any[]>([]);
  // 세부차트크기 관련
  const [detailChartHeight, setDetailChartHeight] = useState(0);
  const [detailChartLPadding, setDetailChartLPadding] = useState(0);

  // 모바일 페이지 체크
  const isMobile = useMediaQuery('(max-width:600px) or (max-height:600px)');
  const isMobileWith = useMediaQuery('(max-height:600px)');

  useEffect(() => {
    console.log(" === AssetTypeChart === ");
    CreateChart();
  }, []);

  useEffect(() => {
    console.log(" === AssetSubBarChart === ");
    CreateDetailChart();
  }, [chartItemData]);

  // 차트 생성 함수
  const CreateChart = async () => {
    const id = sessionStorage.getItem("id");
    const res = await sendGet("/asset/getlist_asset_type/" + id);
    let sumAmount = 0;
    if (res.status === "success") {
      // 데이터 저장
      const list = res.data;
      // 데이터 그룹핑
      const groupedData = list.reduce(
        (
          acc: { [key: string]: number },
          current: { asset_type: string; amount: number }
        ) => {
          if (!acc[current.asset_type]) {
            acc[current.asset_type] = 0;
          }
          acc[current.asset_type] += current.amount;
          sumAmount += current.amount;
          return acc;
        },
        {}
      );

      // 형식에 맞게 변환된 데이터
      const data = Object.entries(groupedData).map(([label, value], id) => ({
        id,
        value,
        label,
      }));
      // 데이터 저장
      setRawData(res.data);
      setChartData(data);
      setSumChartData(sumAmount);
    } else {
      console.log("error");
    }
  };

  // 새로고침 버튼 클릭 이벤트
  const handleRefreshClick = () => {
    CreateChart();
    setChartItemData("");
  };

  // 상세차트 생성 함수
  const CreateDetailChart = async () => {
    // 차트 데이터 설정
    const filteredList = rawData.filter(
      (item) => item.asset_type == chartItemData
    );
    const data = filteredList.map(({ asset_name, amount }) => ({
      asset_name,
      amount,
    }));
    const sortedData = data.sort((a, b) => b.amount - a.amount);
    setDetailChartData(sortedData);

    // 왼쪽 패딩을 계산하기 위함(자동으로 차트영역을 구해주면 필요가 없을듯)
    let maxLength = 0;
    for (const item of sortedData) {
      const nameLength = item.asset_name.length;
      if (nameLength > maxLength) {
        maxLength = nameLength;
      }
    }
    setDetailChartHeight(200 + sortedData.length * 15);
    setDetailChartLPadding(75 + maxLength * 7);
  };

  return (
    <>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography
            sx={{
              flex: "1 1 100%",
              pt: { sm: 2 },
            }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            유형별 자산차트
            <br />
            (총합 : {parseNumber(sumChartData)}원)
          </Typography>
          <Tooltip title="Refresh">
            <IconButton aria-label="refresh" onClick={handleRefreshClick}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        {chartData.length > 0 ? (
          <>
            <Typography
              sx={{ pl: { sm: 2 }, flex: "1 1 100%" }}
              variant="subtitle2"
              id="tableTitle"
              component="div"
            >
                · 파이차트의 각 항목을 선택하여 자산별 상세차트를 확인할 수 있습니다.
            </Typography>
            <Typography
              sx={{ pl: { sm: 2 }, flex: "1 1 100%" }}
              variant="subtitle2"
              id="tableTitle"
              component="div"
            >
              {isMobile && !isMobileWith ? "  · 더 넓은 화면에서 차트를 확인하려면 가로 모드로 전환해 보세요!" : ""}
            </Typography>
            <PieChart
              series={[
                {
                  arcLabel: (item) =>
                    `${Math.round((item.value / sumChartData) * 100)}%`,
                  data: chartData,
                  innerRadius: 30,
                  outerRadius: 120,
                  paddingAngle: 2,
                  cornerRadius: 5,
                  cy: 120,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              height={300}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontWeight: "bold",
                },
              }}
              onItemClick={(event, d) => {
                setChartItemData(chartData[d.dataIndex].label);
              }}
            />
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "8vh",
            }}
          >
            <Typography variant="body1" align="center">
              {"데이터가 없습니다."}
            </Typography>
          </Box>
        )}
      </Paper>
      {chartItemData != "" ? (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            }}
          >
            <Typography
              sx={{
                flex: "1 1 100%",
                pt: { sm: 2 },
              }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {chartItemData} 상세차트
            </Typography>
          </Toolbar>
          <BarChart
            dataset={detailChartData}
            xAxis={[{ label: "자산 금액(원)" }]}
            yAxis={[{ scaleType: "band", dataKey: "asset_name" }]}
            series={[{ dataKey: "amount", label: "자산 금액(원)" }]}
            layout="horizontal"
            height={detailChartHeight}
            margin={{ left: detailChartLPadding, right: 30 }}
            colors={["#af7aa1"]}
          />
        </Paper>
      ) : (
        <></>
      )}
    </>
  );
}
