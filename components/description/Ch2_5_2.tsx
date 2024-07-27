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

export default function Ch2_5_2Page() {
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
        2.5.현금자산 파해치기
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="h6"
        component="div"
      >
        2.5.2.파킹통장과 CMA
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
            href="/description/ch2_5_1"
          >
            2.5.1.입출식 통장
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
            href="/description/ch2_6"
          >
            2.6. 내 저축성향 파악하기
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
        <b>파킹통장과 CMA 비교</b>
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        파킹통장과 CMA는 일별 이자를 계산하여 일별, 월별로 지급하는 계좌입니다.
        이 둘의 차이는 파킹통장은 예금자보호가 되는 상품이고, CMA는 예금자보호가
        불가능한 상품이라는 큰 차이가 있습니다. 따라서 파킹통장보다 CMA의 금리가
        조금 더 높게 지급됩니다. 그러나 파킹통장은 은행별로 입금 한도가
        정해져있거나, 일정 한도 이상부터는 저율 금리가 적용되는 상품도 있습니다.
        파킹통장과 CMA에 목돈을 넣어두는 목적은 언제든지 필요할 때 돈을 찾아 쓸
        수 있다는 점과 입출식 통장보다 높은 이율을 받을 수 있다는 점 때문입니다.
        예금자보호의 안전함을 원한다면 파킹통장, 조금 더 높은 수익을 원한다면
        CMA를 선택하면 됩니다. 여기서 CMA가 파킹통장보다 덜 안전하다는 것도 주식
        등의 투자 상품에 비하면 매우 안전한 상품입니다. 파킹통장과 CMA의 차이를
        표로 정리하자면 다음과 같습니다.
      </Typography>

      <StyledTableContainer sx={{ mt: 2 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableHeadCell></StyledTableHeadCell>
              <StyledTableHeadCell>파킹통장</StyledTableHeadCell>
              <StyledTableHeadCell>CMA</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell>운용주체</StyledTableCell>
              <StyledTableCell>시중은행</StyledTableCell>
              <StyledTableCell>증권사</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>금리</StyledTableCell>
              <StyledTableCell>2.1~3.5%</StyledTableCell>
              <StyledTableCell>3~3.5%</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>안전성</StyledTableCell>
              <StyledTableCell>높음(예금자보호 가능)</StyledTableCell>
              <StyledTableCell>높음(예금자보호 불가능)</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>입금한도</StyledTableCell>
              <StyledTableCell>한도 있으나 높음(1억 이하)</StyledTableCell>
              <StyledTableCell>한도 없음</StyledTableCell>
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
        파킹통장의 경우 한도와 금리를 비교하며 1금융권이나 2금융권 중 선택하여
        가입하면 됩니다. 보통 2금융권이 금리를 더 많이 주고, 어차피
        5,000만원까지는 예금자보호가 가능하니, 2금융권도 선택은 가능합니다.
        허나, 저축은행이 부담스럽다면 1금융권에 넣는 것도 고려해보는 것이
        좋습니다.
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        <b>CMA 종류 및 특징</b>
      </Typography>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        CMA는 파킹통장과 다르게 운용하는 상품에 따라 특성이 달라지기에 어떤
        상품을 선택해야 하는지 고민하여야 합니다. CMA의 종류에는 RP형, MMF형,
        MMW형, 발행어음형으로 총 4가지로 나눠지게 됩니다. 종류에 따른 특성은
        다음과 같습니다.
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
          pl: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        1. RP(Repurchase Agreement:환매조건부채권)형
      </Typography>
      <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
        <ListItem>
          <ListItemText primary="증권사에 돈을 맡기고 맡긴 만큼 채권(국공채, 우량회사채)을 계좌에 넣어주는 상품" />
        </ListItem>
        <ListItem>
          <ListItemText primary="증권사가 망하게 되어도 채권으로 원금 보장 가능" />
        </ListItem>
        <ListItem>
          <ListItemText primary="비대면 계좌 시 자동으로 선택되는 상품" />
        </ListItem>
        <ListItem>
          <ListItemText primary="이자 계산을 월 복리로 적용(2.55~3.5%)" />
        </ListItem>
      </List>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
          pl: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        2. MMF(Money Market Fund:단기금융상품 펀드)형
      </Typography>
      <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
        <ListItem>
          <ListItemText primary="증권사의 단기 자금조달을 위해 조성된 펀드" />
        </ListItem>
        <ListItem>
          <ListItemText primary="증권사는 MMF에 투자를 도와주는 것일 뿐이라 증권사의 신용도와는 무관" />
        </ListItem>
        <ListItem>
          <ListItemText primary="이자 계산을 매일 정산" />
        </ListItem>
      </List>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
          pl: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        3. MMW(Money Market Wrap:한국증권금융의 예금)형
      </Typography>
      <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
        <ListItem>
          <ListItemText primary="증권사에서 증권사들의 은행격인 한국증권금융의 예금에 투자" />
        </ListItem>
        <ListItem>
          <ListItemText primary="이자 계산을 일 복리로 적용" />
        </ListItem>
      </List>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
          pl: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        4. 발행어음형
      </Typography>
      <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
        <ListItem>
          <ListItemText primary="증권사가 발행한 어음을 매수" />
        </ListItem>
        <ListItem>
          <ListItemText primary="증권사가 망하게 된다면 돈을 돌려받을 수 없음" />
        </ListItem>
        <ListItem>
          <ListItemText primary="발행 가능한 증권사는 초대형 IB이어야 가능(미래, 한투, NH, KB)" />
        </ListItem>
        <ListItem>
          <ListItemText primary="연 2.8~3.5% 이자 지급" />
        </ListItem>
      </List>
    </>
  );
}
