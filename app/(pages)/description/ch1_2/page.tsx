// material-ui 관련 임포트
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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
          >
            1.1.자산을 배분한다는것이 무엇인가요?
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
            href="/description/ch2_1_1"
          >
            2.나도 한 번 해보자! 자산배분
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
        자산관리를 위해 자산배분 전략을 사용하는 여러 이유 중 가장 큰 이유는
        리스크를 분산시키기 위함입니다. 만약 자산분류 중 수익률이 큰 분류에 모든
        자산을 몰아넣으면 기대 수익은 커지지만 리스크도 그만큼 커집니다. 그러나
        혹자는 적은 자산을 나누면 얻을 수 있는 이익이 줄어들어 수익을 크게 낼 수
        있을때 많이 낼 수 없다고 얘기합니다.
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        하지만 자산관리는 저와 독자분들 모두 평생해야할 일이며, 이를 오래
        지속해나갈 수 있으려면 투자금을 보호할 수 있는 안정성이 중요합니다.
        그래서 이 책에서는 큰 수익과 큰 리스크를 가지는 분류를 투자자산(주식,
        장기채 등)이라는 분류로 구분하여 전체 자산 중 일정 비율을 분배하여
        투자하도록 하고있습니다.
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        투자자산 분류에 투자를 하시는 독자분들은 증시가 좋아질 때면 주변에서
        투자자산으로 큰 수익을 본 소식이 하나, 둘 씩 들려오기 시작합니다.
        안타깝게도 거래라는 구조상 대부분의 사람들이 동일한 수익을 낼 수
        없습니다. 누군가는 큰 수익이 있다면 누군가는 손실을 보고있고, 손실을
        보는 대상이 본인이 아니기만을 바라는 것이 현실입니다. 이 책을 읽는
        독자분들은 대부분 투자를 전업으로 살아가는 분들이 아니라고 생각됩니다.
        본인들의 현업에도 많은 시간을 쏟아야하는데 투자자산 분류의 변동성에 매일
        긴장하고 리스크를 신경쓰는것은 매우 비효율적이라고 생각합니다. 그렇다고
        투자자산에 투자를 아예하지 말라는 의미가 아닙니다. 자산배분 전략을 통해
        본인의 자산을 배분하여 리스크를 줄이고, 줄어든 리스크 만큼만 수익을
        가져오도록 해야합니다.
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        현재 독자분들 중 큰 수익을 바라면서 리스크가 높은 투자자산에 모든 자산을
        투자하였다면 본인이 투자한 투자자산에 그만큼 확신이 있는지 다시한번
        확인해 볼 필요가 있습니다. 독자분들이 자산을 모으는데 들어간 시간비용을
        투자한 투자자산이 가지고있는 기대수익과 리스크를 알고있는지 스스로에게
        물어보는것이 중요합니다. 만약 투자한 투자자산이 그정도의 확신이 없다면
        이 책을 끝까지 읽어보고, 본인만의 자산배분 전략을 세운 다음에 일정
        비율만큼 자산을 배분해놓아야 합니다.
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        그렇지만 자산배분은 단기적으로는 투자자산에 모두 투자하는것보다 큰
        수익을 가져오지 못 합니다. 하지만 자산배분을 수년간 계속하다보면 어느새
        큰 수익이 되어 독자분들에게 돌아올 것입니다. 제가 말씀드릴수 있는 이유는
        자산배분이 가지는 특징 중 하나인 섀넌의 도깨비현상이 있기 때문입니다.
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        위 그림은 자산배분을 장기적으로 하다보면 발생하는 현상을 나타낸
        도표입니다. 주가지수(코스피, S&P500 등)가 장기적으로 횡보를 하면서
        이어질때, 자신이 가진 자산을 안전자산(예적금, 채권 등)과 투자자산을
        50:50으로 나누어 포트폴리오는 갖추고 매년 리밸런싱을 하게되면
        장기적으로는 주가지수는 제자리에 있지만 내 자산은 계속 증가하는 현상을
        보입니다. 여기서 리밸런싱이란 주가지수가 변동됨에따라 안전자산과
        투자자산의 비율이 50:50이 아닌 비율로 변경되었을때 다시 50:50으로 비율을
        맞춰주는 작업을 뜻합니다.
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        예를들어 주가지수가 상승하는 경우와 하락하는 경우를 나누어 보자면,
      </Typography>

      <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
        <ListItem>
          <ListItemText primary="1. 주가지수가 상승할 때 자산분류의 비율 변화" />
        </ListItem>
        <ListItem>
          <ListItemText primary="- 안전자산 : 투자자산 대비 상대적인 상승률이 부족하므로 전체 자산대비 비율 감소" />
        </ListItem>
        <ListItem>
          <ListItemText primary="- 투자자산 : 주가지수 상승으로 인한 수익률이 안전자산의 수익률보다 증가하여 전체 자산대비 비율 증가" />
        </ListItem>
        <ListItem>
          <ListItemText primary="⇒ 두 자산분류(투자자산과 안전자산)의 비율 유지를 위해 투자자산을 매도하고 안전자산을 매수하면서 높은가격에서 투자자산을 매도" />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. 주가지수가 하락할 때 자산분류의 비율 변화" />
        </ListItem>
        <ListItem>
          <ListItemText primary="- 안전자산 : 하락하지 않거나 조금 상승하므로 전체 자산대비 비율 증가" />
        </ListItem>
        <ListItem>
          <ListItemText primary="- 투자자산 : 주가지수 하락으로 인한 수익률 감소로 전체 자산대비 비율 감소" />
        </ListItem>
        <ListItem>
          <ListItemText primary="⇒ 비율 유지를 위해 안전자산을 매도하고 투자자산을 매수하면서 낮은가격에서 투자자산을 매수" />
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
        위 두가지 경우를 보면 주가지수가 상승할 때는 투자자산을 100%인
        포트폴리오보다는 덜 벌지만, 주가지수가 하락할때 덜 잃는 방식으로 자산을
        꾸준히 늘려갈 수 있습니다. 이를 BLASH(Buy Low And Sell High) 효과라고
        합니다. 이 책에서는 위 예시와 다르게 자산분류를 안전자산, 투자자산,
        배당자산, 현금자산으로 나누어 더욱 리스크를 분할하고 꾸준히 투자할 수
        있는 원동력을 제공하기 위한 방법을 알려드립니다. 그러면 다음 장부터는
        실제로 독자분들의 은행, 증권사 어플, 제가 개발한 사이트(링크)를 가지고
        자산관리 방법을 실천해봅시다.
      </Typography>
    </Box>
  );
}
