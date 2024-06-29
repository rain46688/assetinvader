// material-ui 관련 임포트
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

export default function DescriptionCH2_2_1Page() {
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
        2.2.1.투자자산은 무엇일까?
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
            href="/description/ch2_1_3"
          >
            2.1.3.유형별로 나눈 자산 분류별로 더 구체화해보자
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
            href="/description/ch2_2_2"
          >
            2.2.2.개별주식
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
        먼저 많은 사람들이 제테크, 투자라고 할 때 떠올리기 쉬운 분류입니다.
        투자자산은 시장이 상승할 때 가장 큰 수익을 가져갈 수 있고, 큰 수익을 낸
        사람들이 가장 많이 알리는 분류이기도 합니다. 투자자산에는 주식, 코인,
        선물, 옵션 등을 포함하고 있으며 물론 원금은 보장되지 않는 자산입니다.
        투자에 대해 알고 있든, 알지 못하든 주변에서는 이번에 어떤 주식을 샀는데
        200% 수익을 냈었다더라, 어떤 코인은 1000%로 올랐다더라 하는 얘기가 많이
        들리고, 주변에는 성공한 사람들이 많은 것처럼 느껴지고는 합니다. 하지만
        투자자산은 시장이 좋을 때는 큰 수익을 얻을 수 있지만 반대로 시장이 안
        좋을 때는 가장 많은 피해를 보는 자산분류이기도 하여 시장이 안 좋을 때는
        가장 먼저 외면당하는 시장입니다. 대부분의 사람들이 본인이 손해를 보고
        있다는 것을 인정하고 싶지 않기 때문입니다. 저는 개인적으로 투자자산을
        좋아하지는 않습니다. 하지만 저도 투자자산을 시작으로 금융지식이
        시작되었기도 하여 전혀 하지 말라는 것은 아닙니다. 다만 본인이 가지는
        모든 자산을 투자자산에 넣는 것을 추천드리지 않는 것입니다. 각
        자산분류에는 장단점이 있기에 이를 파악하고 투자해야 합니다. 투자자산에는
        크게 삼성전자, SK하이닉스와 같은 회사의 주식을 직접 매수하는 개별주식과
        인덱스펀드를 투자하는 ETF가 있습니다.
      </Typography>

      <Box
        sx={{
          bgcolor: "grey.200",
          p: 2,
          borderRadius: 2,
          mt: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          💡 ETF란?
        </Typography>
        <Typography
          sx={{
            pt: 1,
          }}
          variant="body2"
          component="div"
        >
          ETF는 Exchange Traded Fund의 약자로 인덱스펀드를 거래소에 상장시켜
          투자자들이 주식처럼 편리하게 거래할 수 있도록 만든 상품입니다. 이는
          투자자들이 개별주식을 고르는 수고를 하지 않아도 되는 펀드투자의
          장점과, 언제든지 시장에서 원하는 가격에 매매할 수 있는 주식투자의
          장점을 모두 가지고 있습니다. ETF에는 시장의 지수를 추종하는 상품부터
          배당주, 특징주(금리, 업종, 그룹, 테마 등) 같은 상품을 담고 있는 것도
          있습니다.
        </Typography>
        <Typography
          sx={{
            pt: 2,
          }}
          variant="body1"
          component="div"
        >
          ETF를 매수할 때에 고려해야 할 사항은 다음과 같습니다.
        </Typography>
        <Typography
          sx={{
            pt: 1,
          }}
          variant="body2"
          component="div"
        >
          1. 운용사
        </Typography>
        <Typography
          sx={{
            pl: 2,
          }}
          variant="body2"
          component="div"
        >
          ETF를 만들고 운용하는 회사입니다. 삼성자산운용, 미래에셋자산운용 등이
          있으며 각 자산운용사마다 각자의 브랜드명을 가지고 ETF를 상장시킵니다.
        </Typography>
        <TableContainer sx={{ mt: 1, mb: 2 }}>
          <Table aria-label="ETF 운용사 테이블">
            <TableHead>
              <TableRow>
                <TableCell>브랜드명</TableCell>
                <TableCell>자산운용사명</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>TIGER</TableCell>
                <TableCell>미래에셋</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>KODEX</TableCell>
                <TableCell>삼성</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SOL</TableCell>
                <TableCell>신한</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>KBSTAR</TableCell>
                <TableCell>국민(KB)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>KOSEF</TableCell>
                <TableCell>키움</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ACE</TableCell>
                <TableCell>한국투자</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ARIRANG</TableCell>
                <TableCell>한화</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SPDR</TableCell>
                <TableCell>State Street</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>iShares</TableCell>
                <TableCell>BlackRock</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Vanguard</TableCell>
                <TableCell>Vanguard</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          sx={{
            pt: 1,
          }}
          variant="body2"
          component="div"
        >
          2. ETF의 종류(테마, 배당, 섹터 등)
        </Typography>
        <Typography
          sx={{
            pl: 2,
          }}
          variant="body2"
          component="div"
        >
          해당 ETF가 투자하는 시장을 나타내는데 KODEX 자동차, KODEX 200, SOL
          국고채10년, KODEX 삼성그룹 등 수많은 종류가 있습니다.
        </Typography>
        <Typography
          sx={{
            pt: 1,
          }}
          variant="body2"
          component="div"
        >
          3. 운용자산의 크기
        </Typography>
        <Typography
          sx={{
            pl: 2,
          }}
          variant="body2"
          component="div"
        >
          해당 ETF를 운용하는데 사용되는 자산의 양을 나타내며, 운용자산이 클수록
          많은 사람들이 투자하고 있다고 볼 수 있습니다. 운용자산이 크다고 무조건
          수익을 가져다준다는 의미는 아니므로 절대적인 지표로 사용하지 않아야
          합니다.
        </Typography>
        <Typography
          sx={{
            pt: 1,
          }}
          variant="body2"
          component="div"
        >
          4. 분배금(분배금 지급률, 지급주기)
        </Typography>
        <Typography
          sx={{
            pl: 2,
          }}
          variant="body2"
          component="div"
        >
          ETF에도 자산 중 배당을 주는 자산이 담겨있을 수 있는데, 이를 다시
          재투자하는 경우 ETF의 이름 뒤에 TR을 붙입니다. 하지만 TR이 없는
          대부분의 ETF는 배당을 받은 배당금을 일정 주기마다 모아서 분배금이라는
          형태로 지급하게 됩니다. 이를 응용하여 고배당 자산(주식, 채권 등)을
          담고 일정 주기마다 분배금을 지급하는 자산도 있습니다.
        </Typography>
        <Typography
          sx={{
            pt: 1,
          }}
          variant="body2"
          component="div"
        >
          5. 보수
        </Typography>
        <Typography
          sx={{
            pl: 2,
          }}
          variant="body2"
          component="div"
        >
          ETF를 운용하면서 운용력(자산운용가)을 유지하기위해 필요한 비용입니다.
          ETF에는 운용방법에 따라 액티브와 패시브가 존재하며, 문자 그대로
          자산운용가의 의견이 반영되는 것이 액티브, ETF 생성 시 운용수칙에
          따라서만 운용되면 패시브라고 합니다. 액티브의 경우 ETF 명칭에 명시되어
          있으며, 아무것도 명시되지 않으면 패시브라고 보시면 됩니다. 보수는 물론
          액티브가 더 많게 책정되어 있습니다. 요즘 국내 ETF 시장에서는 보수가
          현저히 낮은 수준이므로 보수를 민감하게 고려하지 않아도 되나, 같은
          조건이라면 보수를 한번 확인해보는 것도 좋은 비교 방법입니다.
        </Typography>
      </Box>

      <Typography
        sx={{
          pt: 2,
        }}
        variant="body1"
        component="div"
      >
        제가 여기서 소개하려는 상품은 시장 전체를 투자하는 상품과 시장의 지수를
        추종하는 상품과 금리를 투자하는 상품을 알려드리겠습니다.
      </Typography>
    </Box>
  );
}
