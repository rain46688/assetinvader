// material-ui 관련 임포트
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function DescriptionCH2_7Page() {
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
        2.7.이제 알겠는데, 한번에 다 옮기기기 두렵다면?
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
            href="/description/ch2_5_2"
          >
            2.6. 내 저축성향 파악하기
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
            href=""
          ></Typography>
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
        ## 저는 어느정도 목돈이 모인 후에 자산배분을 하기로 마음먹었습니다.
        그렇기에 큰 돈을 분류별로 옮기는 것이 두려웠습니다. 만약 지금 이 금액을
        옮겼는데 자산 가치가 떨어지면 어떻하지 싶기도 했고, 배당을 갑자기 덜
        주거나, 더 좋은 배당을 주는 상품이 나오면 어떻게 해야하는가 고민이
        되었습니다. 저는 그래서 한번에 모두 옮기지 않고, 각 분류별로
        파킹통장이나 CMA를 활용했습니다. 예를들면 투자를 하기로 한 금액은 투자를
        위한 증권사의 CMA를 가입하여 일단 넣어두고 어떤 종목을 투자할지
        고민했습니다. 고민하는 동안에는 CMA 이자를 받으니 손해를 보고 있다는
        생각은 좀 덜들게 됩니다. 그리고 배당자산의 경우는 월별 일정금액을 계속
        매수하여 최적의 금액에 사야한다는 압박감에서 벗어날 수 있게되었습니다.
        내가 어느시점을 지정해놓고 고민하지 않고 매수하면 그 이후 가격이 오르든
        떨어지는 내가 그 시점을 선택한것에 책임을 덜 질 수 있게됩니다. 위 두가지
        방법을 통해 목돈을 적절하게 배분할 수 있습니다.
      </Typography>
    </Box>
  );
}
