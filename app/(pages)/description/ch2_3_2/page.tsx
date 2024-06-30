import Link from "next/link";

// material-ui 관련 임포트
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function DescriptionCH2_3_2Page() {
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
        2.3.2.개별주식
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
            href="/description/ch2_3_1"
          >
            2.3.1.배당자산은 무엇일까?
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
            href="/description/ch2_3_3"
          >
            2.3.3.배당성장 ETF
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
        배당을 주는 개별주식을 직접 구매하여 자신만의 배당자산 포트폴리오를
        만드는 방법입니다. 국내/해외 주식들 중 배당을 많이 주는 자산을 찾아
        매수하고 이를 보유하고 있으면 배당일이 되었을때 배당금을 줍니다.
        예를들어 국내 주식같은 경우에는 네이버증권 사이트에서 검색이 가능합니다.
        <Typography
          sx={{
            flex: "1 1 100%",
            pt: { sm: 2 },
          }}
          variant="body1"
          component="div"
        >
          {/* 네이버 증권에서 찾기 */}
          <img
            src={'https://assetinvader.s3.ap-northeast-2.amazonaws.com/ch2_3_2_img1.png'}
            alt={"ch2_3_2_img1"}
            loading="lazy"
            width={'100%'}
          />
        </Typography>
        위 네이버 증권에서 배당률을 보고 제 기준 최소 은행 정기예금의 1~2%p이상
        주는 종목을 구매하시는 것이 좋습니다. 정기예금 금리를 알고 싶다면
        네이버에 cofix를 검색하시면 시중금리를 알 수 있고 그때의 금리에 1~2%p를
        더하여 기준을 정하면 됩니다.
        <Typography
          sx={{
            flex: "1 1 100%",
            pt: { sm: 2 },
          }}
          variant="body1"
          component="div"
        >
          {/* cofix 사이트 사진 */}
          <img
            src={'https://assetinvader.s3.ap-northeast-2.amazonaws.com/ch2_3_2_img2.png'}
            alt={"ch2_3_2_img2"}
            loading="lazy"
            width={'100%'}
          />
        </Typography>
        그리고 네이버 증권에서 배당 주식을 고를때에는 배당률이 10%이상 넘어가는
        종목의 경우 일시적인지 아닌지 확인할 필요가 있습니다. 어떤 회사는
        일시적으로 이익이 증가하여 해당 연도에만 고배당을 주는 경우가 있을 수
        있기 때문입니다. 최종적으로 개별 배당주식 종목을 고를때에도 아래와 같은
        사항들을 고려하는것이 좋습니다.
      </Typography>

      <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
        <ListItem>
          <ListItemText primary="1. 투자하고자 하는 시장: 해당 주식이 포함된 섹터를 파악하여 되도록 동일한 섹터에 투자하지 않도록 주의하는것이 좋습니다. 예를 들면 고배당 주로 하나금융지주를 매수했다면 동일한 섹터인 KB금융지주를 매수하기보다는 SK텔레콤 같은 통신주를 매수하는것이 위험 분산에 더 효과적입니다." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. 배당률" />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. 배당지급 주기: 회사마다 배당금을 지급하는 주기가 다릅니다. 아직까지는 주로 연배당을 하는 회사가 대부분이나 점차 배당에 대한 중요성이 확대되면서 반기, 분기배당을 하는 회사가 늘어나고 있는 추세입니다." />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. 배당성장률: 배당성장률은 지급하는 배당금이 5년, 10년 전에도 같은 금액인지 확인하는 것을 말합니다. 5년전에 배당금을 100원을 줬는데 현재에도 100원을 준다면 배당성장률이 없는것이니 시간이 지나면 배당금의 가치가 떨어지게될 것입니다." />
        </ListItem>
        <ListItem>
          <ListItemText primary="5. 연속배당기간: 연속배당기간은 해당 기업이 배당을 빼먹지 않고 해주는지를 보는것으로서 기업의 상황이 좋지 않으면 배당을 줄이거나 안주는 경우가 있습니다. 그 경우 기대했던 현금흐름에 못 미칠 수 있으니 주의해야합니다." />
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
        위 5가지 고려사항을 파악하시어 개별주식을 선택하시고 투자하시면됩니다.
        하지만 배당 자산의 섹터는 많고, 이를 전부 투자하기에는 자산이 많이 않을
        수 있어 부담이 될 수도 있습니다. 그런경우 다음의 ETF를 통한 분산투자가
        가능하니 다음장을 살펴봐주세요.
      </Typography>
    </Box>
  );
}
