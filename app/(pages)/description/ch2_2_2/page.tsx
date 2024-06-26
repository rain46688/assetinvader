// material-ui 관련 임포트
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function DescriptionCH2_2_2Page() {
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
        2.2.투자자산 파해치기
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="h6"
        component="div"
      >
        2.2.2.개별주식
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
            href="/description/ch2_2_1"
          >2.2.1.투자자산은 무엇일까?</Typography>
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
            href="/description/ch2_2_3"
          >
            2.2.3.지수추종 ETF
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
