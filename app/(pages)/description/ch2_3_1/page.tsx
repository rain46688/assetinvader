import Link from "next/link";

// material-ui 관련 임포트
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function DescriptionCH2_3_1Page() {
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
        2.3.배당자산 파해치기
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="h6"
        component="div"
      >
        2.3.1.배당자산은 무엇일까?
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
            component={Link}
            href="/description/ch2_2_3"
          >
            2.2.3.지수추종 ETF
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
            component={Link}
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
            component={Link}
            href="/description/ch2_3_2"
          >
            2.3.2.개별주식
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
        배당이란 투자를 일정기간 해보셨다면 많이 아시는 용어이지만 처음
        해보신다면 낯설을수도 있는 용어이기도 합니다. 자신이 어떤 회사의 주식을
        보유하는 경우 1년간 회사가 번 돈의 일부를 그 회사의 주주들에게 이익으로
        나누어 주는데 이것을 배당이라고 합니다. 회사마다 배당을 주는 회사도 있고
        안주거나 아주 적게주는 회사도 있습니다. 이 경우 배당이 적은 이유는
        회사의 이익을 다시 회사를 위해 투자하여 회사 가치를 높이는데 집중하기
        때문입니다. 여기에는 신생회사들이거나 애플, 테슬라 같은 성장하는
        회사들이 대부분입니다. 배당은 투자자들에게 일정한 현금을 제공하는 수단
        중 하나가 됩니다. 만약 자신이 주기적인 현금 수입이 필요하다면 고려해 볼
        자산분류가 되겠습니다.
      </Typography>
    </Box>
  );
}
