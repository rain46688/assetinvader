// material-ui 관련 임포트
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function DescriptionCH2_4_3Page() {
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
        2.4.안전자산 파해치기
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="h6"
        component="div"
      >
        2.4.3.채권
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
            href="/description/ch2_4_2"
          >
            2.4.2.예적금
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
            href="/description/ch2_4_4"
          >
            2.4.4.외화
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
        채권은 국가, 공공기관, 기업등에서 자금이 필요할때 돈을 수급하기 위한
        방법으로 사용됩니다. 채권은 일정기간 돈을 빌려주고 정해진 주기마다
        이자를 받으며, 만기가 되면 빌려간 금액을 돌려주는 방식으로 설계되어
        있습니다. 독자분들이 흔히 아는 예적금 상품과 비슷하게 느껴지면서도 다른
        상품입니다. 채권의 종류에는 개별채권투자, 채권ETF 투자가 있고 다음과
        같은 차이점이 있습니다.
      </Typography>

      <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
        <ListItem>
          <ListItemText primary="1. 개별채권" />
        </ListItem>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem>
            <ListItemText primary="만기가 존재" />
          </ListItem>
          <ListItem>
            <ListItemText primary="정해진 이자 지급시기에 이자가 지급됨" />
          </ListItem>
          <ListItem>
            <ListItemText primary="원금을 항상 보장받음" />
          </ListItem>
        </List>
        <ListItem>
          <ListItemText primary="2. 채권ETF" />
        </ListItem>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem>
            <ListItemText primary="만기가 없고 듀레이션이 존재함" />
          </ListItem>
          <ListItem>
            <ListItemText primary="이자 지급을 명시하지 않은 상품의 경우 재투자됨" />
          </ListItem>
          <ListItem>
            <ListItemText primary="만기가 없기때문에 원금을 보장받지 못함" />
          </ListItem>
        </List>
      </List>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        개별채권투자란 돈이 필요한 국가, 공공기관, 기업등에서 발행한 채권을 직접
        매수하는 방법입니다. 이는 발행주체의 신용을 가장 중요시하며 발행주체가
        파산하지 않는이상 이자 및 원금을 지급받게됩니다. 여기서 은행의 예적금도
        마찬가지로 만기시 이자 및 원금을 지급합니다. 하지만 예적금과 차이는 이자
        지급이 만기 일시지급이 아닌 여러 주기별로 다르다는 점입니다. 채권은
        종류별로 1개월부터 3, 6개월까지 이자 지급 주기가 다릅니다. 그리고 은행과
        동일하게 만기 일시 지급도 있습니다.
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        은행 예적금과의 가장 큰 차이점을 꼽는다면 바로 채권은 거래가 가능하다는
        점입니다. 거래가 가능하다는 것은 매수, 매도를 하는 시점에서 채권의
        가격이 달라지게 된다는 의미입니다. 그럼 채권의 가격은 어떻게 정해질까요?
        채권은 현재 시장금리에 따라 정해지게 됩니다. 채권은 아래 그림과 같이
        일정 주기마다 정해진 이자를 지급하고 만기가 되면 이자와 원금을 지급하는
        상품입니다.
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        지급하는 이자와 만기에 돌려주는 원금이 정해져있기 때문에, 시장에서
        채권의 가치를 정하는것은 채권의 매수가격만 남게 됩니다. 예를들면서
        채권의 가격변화에 대해 설명드리겠습니다. A 기업에서 23년에 A-23이라는
        이름의 채권을 연 5% 이자를 주면서 판매한다고 가정해봅시다. 그 다음해에는
        A 기업이 마차가지로 A-24라는 채권을 연 10%에 발행하게 된다면, 기존에
        A-23 채권을 가지고 있는 사람들은 해당 채권을 팔고 A-24 채권으로
        갈아타는것이 이득이라고 생각하게 될겁니다. 하지만 이 생각은 A-23을
        가지고 있는 사람들은 모두 생각하게 될것이고 이에따라 처음 구매했던
        가격으로 사는 사람들은 없을 것입니다. 왜냐하면 지금 구매하는 입장에서는
        굳이 A-23 채권을 사지않고 A-24 채권을 사면 더 많은 이자를 받을 수 있기
        때문입니다. 그렇다면 A-23 채권을 가지고있는 사람의 입장에서는 채권의
        가격을 구매가격보다 낮춰서 팔아야 누군가 구매해줄 수 있게됩니다. 반대의
        경우에도 같은 원리로 채권의 가격이 상승하게 됩니다. 이러한 과정으로
        채권의 가격이 정해지게되고 매수하는 시점에서 실제 발행할 때와 다른
        수익률이 정해지는 것이므로 이를 매수수익률이라 합니다.
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        그렇다면 개별채권 투자를 할 때에는 무엇을 고려해야하는지
        알려드리겠습니다. 개별채권은 투자상품이므로 은행의 예적금과 다르게
        예금자보호가 되지 않는 상품이므로 특정경우에는 원금이 보장되지 않을 수
        있습니다. 그러니 꼼꼼히 따져보고 투자하는것이 바람직합니다.
      </Typography>

      <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
        <ListItem>
          <ListItemText primary="1. 신용도" />
        </ListItem>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem>
            <ListItemText primary="신용도란 발행주체가 해당 채권의 지급을 얼마나 안전하게 보장해 줄 수 있는지를 나타내는 지표라고 할 수 있습니다. 우리 사회에서도 개인이 은행에 돈을 빌릴때 개인의 신용을 수치화하여 점수로 나타내고 있듯이 기업도 신용을 평가하여 등급을 매깁니다. 신용평가는 한국기업평가(한기평), 한국신용평가(한신평), NICE신용평가에서 기업의 신용을 평가합니다. 등급은 AAA~D까지 있고 각 단계별 +,-로 구분되어 윗단계, 아래단계로 나뉘어집니다. 안전자산으로 채권투자를 한다면 AAA~A-까지만 고려해야하며 그 아래부터는 리스크가 점점 증가합니다." />
          </ListItem>
        </List>
        <ListItem>
          <ListItemText primary="2. 상품위험도" />
        </ListItem>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem>
            <ListItemText primary="상품위험도란 기업의 신용도와 더불어 해당 상품의 위험도를 구분하여 표기해줍니다. 상품위험도는 기업의 신용에 가장 영향을 받지만 간혹 기업의 신용도가 높아도 위험한 상품들이 존재합니다. 예를들면 은행에서 발행하는 신종자본증권이나 조건부자본증권 같은 채권들이 있습니다." />
          </ListItem>
          <ListItem>
            <ListItemText primary="💡 신종자본증권 : 원금을 상환할 의무가 없고 이자만 지급하는 채권" />
          </ListItem>
          <ListItem>
            <ListItemText primary="조건부자본증권 : 금융기관에 위기가 발생하면 채권이 주식으로 전환되거나 상각된다는 조건이 붙은 신종자본증권" />
          </ListItem>
        </List>
        <ListItem>
          <ListItemText primary="3. 잔존기간" />
        </ListItem>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem>
            <ListItemText primary="잔존기간이란 매수한 채권의 만기까지 남은 기간을 의미합니다. 만약 현재처럼 금리가 높으면서 곧 금리가 낮아질 것이라는 예측을 하고 있다면 높은 수익율을 가지는 상품이면서 잔존기간이 많은 상품을 고르는것이 장기적으로 유리할 것이고, 반대로 계속 금리가 높아질 것으로 예상되면 잔존기한이 적은 상품을 선택하는것이 좋습니다." />
          </ListItem>
        </List>
        <ListItem>
          <ListItemText primary="4. 매수수익률" />
        </ListItem>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem>
            <ListItemText primary="매수수익률은 채권을 구매하는 시점에서 본인이 만기까지 보유하면 얻을수 있는 총 수익률을 의미합니다. 당연히 매수수익률이 높을 수록 좋지만 이전의 상품위험도에서 설명드렸다 싶이 위험도를 고려하여 적정수준에서 매수수익률을 고르는것이 중요합니다." />
          </ListItem>
        </List>
        <ListItem>
          <ListItemText primary="5. 이자지급주기 및 이자율" />
        </ListItem>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem>
            <ListItemText primary="채권 매수를 통해 이자를 지급받을때 현금흐름에 따라 채권의 이자지급주기 및 이자율을 고려해야합니다. 이자지급주기가 자주 있을수록 주기적으로 현금흐름을 제공받을 수 있어 돈이 모인다는 느낌을 받을 수 있다는 장점이 있습니다. 그리고 이자율이 높을수록 지급되는 이자가 많아 적은 투자금액으로도 많은 이자를 받는 느낌 또한 받을 수 있습니다. 하지만 실제 이자를 많이 받는것이 좋은것은 아닌데 이자에는 이자소득세가 발생하기 때문입니다. 채권의 가격차이에 따른 거래수익에는 세금이 발생하지 않지만 이자에는 발생하므로 투자금 대비 같은 비율로 수익을 얻는다고 하여도 이자수익의 비중이 크다면 매수수익률은 감소하게 됩니다. 현금흐름이 중요하다면 이자지급주기가 짧고 이자율이 높은 채권을 수익률이 높은게 중요하다면 이자지급주기가 길고 이자율이 낮은 채권을 매수하시면 됩니다." />
          </ListItem>
        </List>
      </List>

      <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
        <ListItem>
          <ListItemText primary="- ISA(개인종합자산관리계좌)에서 채권을 매수하시는경우 이자소득세가 비과세되거나 감면되는 혜택을 받을 수 있으니 확인하여 혜택을 누릴 수 있습니다." />
        </ListItem>
        <ListItem>
          <ListItemText primary="- 금투세 도입 시 채권의 거래수익에도 세금이 부과될 수 있습니다." />
        </ListItem>
      </List>
    </Box>
  );
}
