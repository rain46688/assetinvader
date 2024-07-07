import Link from "next/link";

// material-ui 관련 임포트
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

export default function DescriptionCH2_1_3Page() {
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
        2.1.3.유형별로 나눈 자산 분류별로 더 구체화해보자
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
            href="/description/ch2_1_2"
          >
            2.1.2.난 무엇에 돈을 넣고 있을까?
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
            href="/description/ch2_2_1"
          >
            2.2.투자자산 파해치기
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
        이전에 유형별은 유동성, 안정성, 이익률로 나누었다면 이번 분류별은
        유형별로 나눈 자산을 세분화하여 구체적인 목표를 정하는 단계입니다. 먼저
        유형별 자산과 분류별 자산의 관계를 알려드리겠습니다.
      </Typography>

      <TableContainer sx={{ mt: 2 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>자산유형</TableCell>
              <TableCell>자산분류</TableCell>
              <TableCell>자산세분류</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell rowSpan={3}>현금자산</TableCell>
              <TableCell rowSpan={3}>현금자산</TableCell>
              <TableCell>입출금 통장</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>파킹통장</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CMA</TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={2}>원금보장자산</TableCell>
              <TableCell rowSpan={2}>안전자산</TableCell>
              <TableCell>예금, 적금</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>개별채권</TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={8}>원금비보장자산</TableCell>
              <TableCell rowSpan={3}>안전자산</TableCell>
              <TableCell>외환</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>금</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>배당자산</TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={3}>배당자산</TableCell>
              <TableCell>개별주식</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>배당성장</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>고배당</TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={2}>투자자산</TableCell>
              <TableCell>개별주식</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>지수추종</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        위의 표처럼 유형별 자산을 위와 같이 분류별로 나누어 구체적인 자산배분
        분류를 정리할 수 있게됩니다. 이제 구체적으로 자산분류 및 세분류에 대한
        특징을 파악하고 이 책에서 나름대로 구분한 투자성향에 따라 자산배분을
        구체화 해봅시다.
      </Typography>
    </Box>
  );
}
