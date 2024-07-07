import Link from "next/link";

// material-ui 관련 임포트
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function DescriptionCH1_1Page() {
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
        1.1.자산을 배분한다는것이 무엇인가요?
      </Typography>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "left",
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
            href="/description/ch0"
          >
            0.서문
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
            href="/description/ch1_2"
          >
            1.2.많지도 않은 내 자산 왜 배분해야 하는거예요?
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
        자산관리의 핵심은 제목에서도 나와있다 싶이 자산배분입니다. 여기서
        자산배분이란 현재 독자분들이 가지고있는 자산의 종류 및 금액을 파악하고,
        적절한 자산분류(예금, 적금, 주식 등)에 본인만의 비율로 자산을 나누어
        담아 놓는것입니다. 그럼 적절한 자산분류는 어떻게 찾아야할까요? 이
        책에서는 적절한 자산분류를 크게 투자자산, 배당자산, 안전자산, 현금자산
        총 4가지로 분류합니다.
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        자산분류의 종류
      </Typography>

      <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
        <ListItem>
          <ListItemText primary="1. 투자자산 : 높은 기대수익률을 바라고 투자하는 자산(주식, 펀드, 장기채권 등)" />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. 배당자산 : 높은 연간 배당률 또는 지속적인 배당성장률을 바라는 자산(주식, 펀드 등)" />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. 안전자산 : 낮은 기대수익률이지만 변동성이 적어 원금보장이 가능한 자산(예적금, 개별채권, 금 등)" />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. 현금자산 : 어느 투자처에도 투자되어있지않고 바로 사용할 수 있는 현금(입출금통장, 파킹통장, CMA 등)" />
        </ListItem>
      </List>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        이후 장에서 설명드릴 자산분류의 특징을 파악하고, 독자분들의
        투자성향에따라 일정 비율만큼 분류된 자산에 나누어 담으면 됩니다.
        그렇다면 우리는 왜 자산배분을 해야할까요?
      </Typography>
    </Box>
  );
}
