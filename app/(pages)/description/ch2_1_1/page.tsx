import Link from "next/link";

// material-ui 관련 임포트
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function DescriptionCH2_1_1Page() {
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
        2.1.내 자산 파악하기
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="h6"
        component="div"
      >
        2.1.1.내가 가진 자산들이 어느 계좌에 숨어있을까?
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
            href="/description/ch1_2"
          >
            1.2.많지도 않은 내 자산 왜 배분해야 하는거예요?
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
            href="/description/ch2_1_2"
          >
            2.1.2.난 무엇에 돈을 넣고 있을까?
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
        먼저 자산배분을 시작하기 전 독자분들의 자산을 모두 파악하여 자산의
        유동성을 기준으로 분류를 해야합니다. 여기서 자산의 유동성이란, 현재
        본인이 가지고 있는 자산이 즉시 원하는 용도로 가능한것을 유동성이 있다고
        합니다. 이제 이 책에서는 자산의 유동성에 따라 현금자산, 원금보장자산,
        원금비보장자산 3가지 유형으로 구분하게 되는데 구분하는 조건은 아래와
        같습니다.
      </Typography>

      <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
        <ListItem>
          <ListItemText primary="현금자산 : 현금이 필요할 때 리스크 없이 사용이 가능한 자산(입출금 통장, 파킹통장, CMA 등)" />
        </ListItem>
        <ListItem>
          <ListItemText primary="원금보장자산 : 현금전환 시 원금은 항상 보장해주지만 약속된 이자는 받지 못하는 리스크가 있는 자산(예금, 적금 등)" />
        </ListItem>
        <ListItem>
          <ListItemText primary="원금비보장자산 : 현금전환 시 원금이 사라질 수 있는 리스크가 있는 자산(주식, 채권 등)" />
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
        이제 자산을 파악하기 위해 은행 어플이나 증권사 어플을 사용하셔도 되고,
        요즘은 뱅크샐러드나, 신한은행의 머니버스와 같이 모든 은행과 증권사를
        통합하여 자산을 조회해주는 마이데이터 서비스가 많이 나와있습니다. 이를
        통해 자산들을 조회하여 일정 주기마다 시스템에 수기로 입력합니다. 입력
        주기는 독자분들이 실천할 수 있는 정도로 정하면 되나, 주기적으로 급여를
        받는 독자분들이라면 1달에 1~2번정도가 적당합니다. 처음 시스템에
        입력하는것은 번거로울 수 있으나, 독자분들이 주기적으로 본인의 자산을
        파악하는 습관을 가지는게 자산관리의 시작입니다. 내가 어디에 돈을
        넣어두었는지 모른다면 자산관리를 시작할 수도 없습니다.
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        먼저 자산파악을 해봅시다. 저는 신한 머니버스, 대신증권, KB증권 어플을 주
        거래 및 투자에 사용하고 있습니다.
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        아래 예시를 보면 머니버스에 등록되어있는 자산들이 있고, 해당 자산의 이름
        및 유형을 지정한 다음 그 자산의 현재 가치를 적어놓으면 됩니다. 유형은
        위에서 말씀드린 3가지 중에 해당하는 조건의 유형을 선택하면됩니다.
      </Typography>

      {/* 머니버스 계좌 화면, 시스템 입력화면 예시 */}
      <img
        src={'https://assetinvader.s3.ap-northeast-2.amazonaws.com/ch2_1_1_img1.png'}
        alt={"ch2_1_1_img1"}
        loading="lazy"
        width={'100%'}
      />
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        - 증권사 위탁계좌 연금계좌가 아닌 계좌는 자산계좌명에 해당 자산이 포함된
        은행명을 작성
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        - 증권사의 CMA는 자산계좌명에 증권사명 자산이름에 CMA로 작성하는것이
        관리에 편리
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        - 자산의 수익률은 예금의 경우 금리, 적금의 경우 금리/2가 통상적인 수익률
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        그 다음 자산들 중 증권자산의 경우 위 예시처럼 머니버스에서 확인하셔도
        되고, 증권사 어플을 통해 확인하여도 됩니다. 간혹 증권사들 중 당일
        매수처리된 자산이 바로 오픈뱅킹에 반영되지 않아 시스템 등록시점에서
        증권자산의 양이 달라질 수 있습니다.
      </Typography>

      {/* 대신증권 자산 화면, 시스템 입력화면 예시 */}
      <img
        src={'https://assetinvader.s3.ap-northeast-2.amazonaws.com/ch2_1_1_img2.png'}
        alt={"ch2_1_1_img2"}
        loading="lazy"
        width={'100%'}
      />
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        - 가치가 변동되는 자산의 경우 확정된 수익률만 작성하므로 주식은
        자산가치의 상승은 반영하지 않고, 배당이 있는경우 배당 수익률 작성하며
        채권은 매수수익률로 작성
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        그럼 위 방법대로 자산을 시스템에 입력하였다면, 다음 단계에서 자산을
        분류별로 나누어서 어디에 주로 투자를 하는지 알아봅시다.
      </Typography>
    </Box>
  );
}
