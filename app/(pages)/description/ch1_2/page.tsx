// material-ui 관련 임포트
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function DescriptionCH1_2Page() {
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
        1. 자산관리의 핵심 자산배분!
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="h5"
        component="div"
      >
        1.2.많지도 않은 내 자산 왜 배분해야 하는거예요?
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
            href="/description/ch1_1"
          >1.1.자산을 배분한다는것이 무엇인가요?</Typography>
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
            href="/description/ch2_1_1"
          >
            2.나도 한 번 해보자! 자산배분
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
