"use client";

import * as React from "react";
import Link from "next/link";

// material-ui 관련 임포트
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

import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export default function Ch2_4_2Page() {
  const StyledTableContainer = styled(TableContainer)({
    border: "1px solid rgba(224, 224, 224, 1)",
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    textAlign: "center",
    border: "1px solid rgba(224, 224, 224, 1)",
  }));

  const StyledTableHeadCell = styled(StyledTableCell)({
    fontWeight: "bold",
    backgroundColor: grey[300], // 원하는 배경색으로 설정
  });

  return (
    <>
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
        2.4.2.예적금
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
            href="/description/ch2_4_1"
          >
            2.4.1.안전자산은 무엇일까?
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
            href="/description/ch2_4_3"
          >
            2.4.3.채권
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
        예적금은 대표적인 안전자산입니다. 자산관리를 따로 하지않는 사람들도
        예적금은 보유하고 있습니다. 가장 접하기 쉬우며 은행과 거래를 한다는
        측면에서 매우 안정적이라고 느껴지기 때문입니다. 실제로도 은행의 예적금
        상품은 예금자보호가 되기 때문에 최대 5,000만원 한도 내에서는 보장이 되기
        때문에 안전하다고 볼 수 있습니다. 그러나 제가 주변 사람들에게 들었을 때
        예적금을 드는 것이 자산 형성에는 도움이 된다고는 알고 있으나, 예금과
        적금 선택 목적의 차이를 잘 구분하지 못하거나, 금리에 따른 이자에 차이가
        있다는 것을 고려하지 않는 분들이 있어 정리해보려고 합니다.
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        <b>예금과 적금의 목적</b>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem>
            <ListItemText primary="예금과 적금은 둘의 목적이 다릅니다. 먼저 적금의 경우 내가 가지고 있는 목돈이 없지만 꾸준한 수입이 있을 때 은행에 맡겨놓음으로써 이자 소득과 해당 금액만큼 소비를 강제하려는 목적으로 가입하게 됩니다. 시간이 지날수록 해지할 때 받을 수 없는 이자 금액이 커지므로 더욱 해지하기 어렵게 만들어 처음에 목표로 했던 목돈을 마련할 동기를 부여해줍니다." />
          </ListItem>
          <ListItem>
            <ListItemText primary="그럼 예금은 적금과 어떤 차이가 있을까요? 바로 목돈이 있다는 데에서 차이가 발생합니다. 예금은 정해진 금액을 일정 기간 동안 은행에 맡겨두면 은행에서 이자를 주는 구조입니다. 즉, 가지고 있는 돈을 스스로 일하게 만드는 것입니다. 예금도 적금과 마찬가지로 정해진 기간 동안은 출금하지 못하기에 불필요한 소비를 막는 역할을 합니다." />
          </ListItem>
          <ListItem>
            <ListItemText primary="정리하자면 아직 모아둔 돈은 없으나 꾸준한 수입이 예상되면 적금을 먼저 가입하고, 가입한 적금이 만기되면 마련한 목돈을 예금에 가입하고, 다시 적금을 가입하여 추가적인 목돈을 마련하면서 장기적인 자산형성 사이클을 형성할 수 있습니다." />
          </ListItem>
        </List>
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        <b>예금과 적금의 이자율</b>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem>
            <ListItemText primary="만약 원금이 같다고 할 때, 동일한 4%의 이자를 준다면 예금과 적금 중 어떤 게 더 많은 이자를 줄까요? 아니면 예금은 3% 적금은 5%일 때 어떤 게 더 많은 이자를 줄까요?" />
          </ListItem>
          <ListItem>
            <ListItemText primary="이는 예금과 적금의 이자 계산법을 확인하면 쉽게 이해할 수 있습니다. 먼저 간단하게 계산하면 '예금 이자율 ≒ 적금 이자율 * 1.7'이라고 보면 됩니다. 즉, 3%의 예금과 그보다 2배 많은 6%의 적금이 비슷한 이자를 지급한다는 의미입니다. 왜 이런 차이가 있을지 계산해보겠습니다." />
          </ListItem>
          <ListItem>
            <ListItemText primary="간단하게 600만원을 6개월에 나눠내면 이자는 동일하게 10%라고 생각하며 세금은 무시하겠습니다." />
          </ListItem>
        </List>
      </Typography>

      <StyledTableContainer sx={{ mt: 2 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>회차</StyledTableHeadCell>
              <StyledTableHeadCell>1M</StyledTableHeadCell>
              <StyledTableHeadCell>2M</StyledTableHeadCell>
              <StyledTableHeadCell>3M</StyledTableHeadCell>
              <StyledTableHeadCell>4M</StyledTableHeadCell>
              <StyledTableHeadCell>5M</StyledTableHeadCell>
              <StyledTableHeadCell>6M</StyledTableHeadCell>
              <StyledTableHeadCell>이자합</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell>1회차</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>49,998</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>2회차</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>41,665</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>3회차</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>33,332</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>4회차</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>24,999</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>5회차</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>16,666</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>6회차</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
              <StyledTableCell>8,333</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </StyledTableContainer>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        위 모든 이자를 합하면 총 174,993원(세금제외)입니다. 실제로 소수점 단위
        계산을 하면 175,000원으로 나오게 되지만 비슷하게 계산되었습니다.
        그렇다면 같은 조건에서 예금의 이자를 계산해보겠습니다. 예금은 1회차에
        모든 금액을 넣기 때문에 회차는 구분하지 않습니다. 예금은 한번에
        600만원을 모두 넣기에 첫 달부터 600만원의 이자인 5만원을 받게 됩니다.
      </Typography>

      <StyledTableContainer sx={{ mt: 2 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>1M</StyledTableHeadCell>
              <StyledTableHeadCell>2M</StyledTableHeadCell>
              <StyledTableHeadCell>3M</StyledTableHeadCell>
              <StyledTableHeadCell>4M</StyledTableHeadCell>
              <StyledTableHeadCell>5M</StyledTableHeadCell>
              <StyledTableHeadCell>6M</StyledTableHeadCell>
              <StyledTableHeadCell>이자합</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell>50,000</StyledTableCell>
              <StyledTableCell>50,000</StyledTableCell>
              <StyledTableCell>50,000</StyledTableCell>
              <StyledTableCell>50,000</StyledTableCell>
              <StyledTableCell>50,000</StyledTableCell>
              <StyledTableCell>50,000</StyledTableCell>
              <StyledTableCell>300,000</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </StyledTableContainer>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        계산해보면 같은 기간 같은 이자율임에도 예금은 30만원 적금은 17.5만원으로
        예금이 더 많은 이자를 받게 되는 것을 알 수 있습니다. 그렇듯 목돈이
        있다면 예금을 당장 목돈이 없다면 적금을 가입하는 것을 추천드립니다.
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        간혹 고금리 특판 예적금이 나오는데, 이는 이벤트성 상품이므로 해당 은행에
        가입하지 않은 고객들이 보통 대상이 됩니다. 지금과 같이 금리가 높은
        시기에는 예적금도 충분히 매력이 있으므로 고민하여 투자 성향에 맞게
        정해진 비율에 따라 가입하시기 바랍니다. 추가로 이제 금리인하 논의가
        나오고 있고, 시장 금리는 이에 따라 반응하고 있으므로 지금의 고금리
        상품을 장기간 가입해두면 오랜 기간 일정 수익률은 보장받을 수 있어
        포트폴리오에 안정된 수익을 가져다줄 수 있습니다.
      </Typography>
    </>
  );
}
