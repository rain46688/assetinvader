// material-ui 관련 임포트
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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
          >
            2.2.1.투자자산은 무엇일까?
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
            href="/description/ch2_2_3"
          >
            2.2.3.지수추종 ETF
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
        저는 여태까지 투자를 해보면서 개별주식 투자에 대한 소질이 없다는 것을
        느꼈습니다. 제가 매수했다하면 수익률이 음수로 향하는 경우가 더러 있기
        때문입니다. 그리고 이 책에서는 어떤 회사의 주식을 사라는 권유는 드리지
        않습니다. 독자분들의 투자 지향성을 파악하여 투자하는 것이 중요합니다.
        만약 투자를 처음 시작하신다면, 어느 시장에 투자할지 정하게 되고, 직접
        투자를 시작하기 전에 해당 시장을 분석한 증권사 리포트를 먼저 보는것이
        중요합니다. 특히 증권사 리포트 중에서 처음 시장동향분석 리포트를 작성한
        애널리스트들의 리포트를 보는것이 더 중요합니다. 그 이유는 애널리스트도
        처음 리포트를 작성하기에 해당 시장에 자세한 조사를 마치고 리포트를
        작성하기 때문에 더욱 자세한 정보를 압축하여 놓은 경우가 많고, 이해하기
        쉽게 설명해놓기 때문입니다. 현 시대에는 증권사에 접속하면 시장의
        리포트를 무료로 볼 수 있는 시대이므로 꼭 참고하시기 바랍니다.
      </Typography>
    </Box>
  );
}
