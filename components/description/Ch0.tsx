"use client"

import * as React from 'react';
import Link from "next/link";

// material-ui 관련 임포트
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function Ch0Page() {
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
        0.서문
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
            href=""
          ></Typography>
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
            href="/description/ch1_1"
          >
            1. 자산관리의 핵심 자산배분!
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
        이 책은 자산을 모으고자하는 입문자들에게 제가 겪었던 짧은 경험을
        바탕으로 앞으로 자산을 모으는 방향을 안내하기 위해 작성했습니다. 제가
        처음 투자를 시작한건 코로나의 존재가 사회에 점차 익숙해질 때 쯤
        유튜브에서 자동매매라는 것을 보았을 때였습니다. 개발자였던 저는 자동매매
        프로그램을 만들어서 한 번 사용해보자는 생각이 들어 자동매매 프로그램을
        만들고 바로 실전 테스트를 해보았고, 매매 수익이 점차 늘어나는것을 보니
        저의 프로그램에 자신이 생겼었습니다. 하지만 제가 간과한 사실은 그때의
        유가증권 시장은 어떤 종목을 매매하였어도 수익이 발생하는 초호황기였다는
        것이었습니다. 그렇게 기쁨에 취해 투자금을 늘리고, 코인에도 자동매매
        프로그램을 만들면서 미래에 대한 행복을 그렸습니다. 허나 기쁨도 잠시,
        시장은 장기하락의 시기가 찾아왔습니다. 저의 프로그램은 매번 투자 손실을
        발생시키며, 투자금을 갉아먹었습니다. 이후 저는 주식과 코인 모두 큰
        손실을 보고나서야 프로그램 운영을 그만두게 되었습니다. 그 당시
        대학생이었던 저는 손실률은 높았으나, 그때의 제가 가진 돈이 많지
        않았던것도 있고, 빚을 내서 투자하지는 않았기에 다시 시작해보자는 마음을
        가질 수 있었습니다. 그 이후 뉴스, 유튜브 및 책 등을 계속 보면서
        금융지식을 공부를 하게되었고, 자산배분전략을 통한 자산관리 방법을
        알게되었습니다. 자산배분은 투자를 하는 대부분의 사람들이 어렴풋이 알고는
        있지만 큰 돈을 벌어다주지 못한다는 생각이 있어 선뜻하지 않는 전략입니다.
        하지만 자산배분전략은 개인투자자의 장점인 시간을 사용한 전략이기에
        누구나 꾸준한 수익을 내고, 리스크를 가지는 투자도 해볼 수 있습니다. 저는
        자산배분전략을 사용하여 자산관리를 하며, 매년 수익을 늘려가고 있습니다.
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        이 책에서는 열심히 일하고 지출을 줄여가며 모은 독자분들의 자산을
        늘리기위한 자산배분전략을 소개하기위해 작성했습니다. 또한, 웹 사이트를
        직접 개발하여 자산관리를 처음하는 분들에게 자산관리의 기초를 다지기 위한
        틀을 제공해드리려고 합니다. 앞으로 소개드릴 내용들 중 일부는 제가 만든
        웹 사이트를 기반으로 자산관리 전략을 세우는 방법에 대한 설명을 드리오니
        독자분들도 앉아서 책만 읽는 것이아니라 직접 자산관리에 도전해보시는걸
        추천합니다.
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        저는 전문투자가는 아니지만 제 주변에는 자산관리의 개념을 고민하지
        않는분들도 많고, 투자는 하고싶지만 잃기는 두려워 어떻게 해야할지 몰라
        방황하는 사람들도 많습니다. 제가 알려드리려는 전략은 적은 투자금으로
        많은 돈을 불려주지 않습니다. 다만, 이 책을 읽는 독자분들이 자기계발을
        통해 금융지식을 습득하고, 앞으로 인생을 살아가며 언제, 어떻게
        투자해야하는지 알게된다면 향후 언젠간 오는 기회를 반드시 잡을 수 있게 될
        것입니다.
      </Typography>
    </>
  )
}
