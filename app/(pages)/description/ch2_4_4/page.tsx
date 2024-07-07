import Link from "next/link";

// material-ui 관련 임포트
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function DescriptionCH2_4_4Page() {
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
        2.4.4.외화
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
            href="/description/ch2_4_3"
          >
            2.4.3.채권
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
            href="/description/ch2_4_5"
          >
            2.4.5.금
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
        외화자산은 환차익을 목적으로 일정비중을 가지고 있는 자산입니다. 환차익이란 환율차이로 인해 이익을 보는것을 말합니다. 그렇다면 나라별로 환율 차이가 발생하는 이유는 무엇일까요? 그 이유는 나라별 화폐가치의 차이가 발생하기 때문입니다. 화폐가치를 결정하는 여러가지 요인이 있지만 가장 연관이 많고 1차적인 요인은 금리입니다. 금리가 높으면 해당 화폐가치는 높아지고 금리가 낮아지면 해당 화폐가치는 낮아지게 됩니다.
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        예를들면, 미국에서는 기준금리가 연 5%대이고, 우리나라는 연 3%대입니다. 만약 독자분들이 예금을 들으려고 한다면 연 5%짜리 예금을 주는 미국에서 예금을 들으려고 할 것입니다. 하지만 미국의 예금을 들으려면 원화를 달러로 환전해야하고, 이로서 미국을 제외한 다른나라 사람들의 달러수요가 높아지게 됩니다. 그럼 결국 시장의 수요공급에의해 수요가 높아진 달러의 가치가 높아지게 되고, 환율 차이가 발생하게됩니다.
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        현 시점에서는 미국의 기준금리가 5.25~5.5%수준으로 높은금리를 가지고있고, 그에 반에 우리나라는 3.5%라는 상대적으로 낮은 금리를 가지고 있습니다. 만약 원/달러 환율이 높아지기 전에 미국주식을 보유하고 있다면 주식가치 상승이 없어도 환율으로인한 평가이익이 있을 수 있습니다.
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        이제 환율에 대해 알아봤으니 주로 투자하는 외화에 대해 알려드리겠습니다. 제가 생각하기에 주로 투자하는 외화는 달러, 엔화, 유로 등이 있습니다. 외화투자는 주로 투자하는 시장에따라 달라지는데, 국내시장에서만 투자를 한다면, 달러현물 또는 달러 ETF를 일정 비율 가지고 있을때 달러가치 상승으로 인한 국내주식 하락을 어느정도는 커버할 수 있게됩니다. 하지만 미국시장을 주로 투자하시는 분이라면 달러를 보유하고 있을 필요는 없습니다. 어차피 미국주식을 매수할때 달러로 환전하여 매수하기에 매수 단가에 환율이 포함되어있기 때문입니다.
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        추가적으로 요즘 엔화약세에 따라 엔화를 환전하는 사람들이 많아지고 있습니다. 일본의 금리인상 가능성과 미국의 금리인하 가능성에 베팅하여 투자하고 있는경향이 많이 보이는데, 환율은 금리의 영향이 제일 크지만 나라간 외교, 수입/수출 등 여러가지 원인이 복합적으로 반영된 결과이기에 신중하게 투자할 필요가 있습니다.
      </Typography>
    </Box>
  );
}
