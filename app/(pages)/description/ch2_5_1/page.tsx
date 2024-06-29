// material-ui 관련 임포트
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function DescriptionCH2_5_1Page() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="h4"
        component="div"
      >
        2.나도 한 번 해보자! 자산배분
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="h5"
        component="div"
      >
        2.5.현금자산 파해치기
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="h6"
        component="div"
      >
        2.5.1.입출식 통장
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography
            sx={{
              flex: "1 1 100%",
              pt: { sm: 2 },
              textDecoration: "none", // 밑줄 제거
            }}
            variant="subtitle1"
            component="a"
            href="/description/ch2_4_5"
          >
            2.4.5.금
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              flex: "1 1 100%",
              pt: { sm: 2 },
              textDecoration: "none", // 밑줄 제거
            }}
            variant="subtitle1"
            component="a"
            href="/description/index"
          >
            목록으로
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "right",
          }}
        >
          <Typography
            sx={{
              flex: "1 1 100%",
              pt: { sm: 2 },
              textDecoration: "none", // 밑줄 제거
            }}
            variant="subtitle1"
            component="a"
            href="/description/ch2_5_2"
          >
            2.5.2.파킹통장과 CMA
          </Typography>
        </Grid>
      </Grid>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        입출식 통장은 은행의 계좌를 개설할 때 처음 만드는 계좌를 의미합니다.
        보통 금리가 0.1~0.3%대의 통장을 입출식 통장으로 구분합니다. 그렇다면 이
        계좌가 저축을 위해서는 필요가 없을 것으로 보이나, 은행에서는
        입출식통장에서 입출금이 가능하며, 파킹통장으로 돈을 넣을때에도 입출식
        계좌가 있어야만 가능한 경우가 있어 해당 은행의 서비스를 이용하기
        위해서는 필수적으로 개설해야 하는 계좌입니다. 그래서 입출식 계좌에는
        자동이체, 급여통장 등으로 사용하고, 저금을 위한 돈은 다음에 설명할
        파킹통장과 CMA에 넣는것이 좋습니다.
      </Typography>
    </Box>
  );
}
