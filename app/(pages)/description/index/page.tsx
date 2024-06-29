import Link from "next/link";

// material-ui 관련 임포트
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function DescriptionIndexPage() {
  return (
    <Box sx={{ width: '100%' }}>
      {/* DescriptionIndexPage 컴포넌트 */}
      <List component="div" dense={true}>
        <ListItem component={Link} href={"/description/ch0" }>
          <ListItemText
            primary="0.서문"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="1. 자산관리의 핵심 자산배분!"
          />
        </ListItem>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem component={Link} href="/description/ch1_1">
            <ListItemText
              primary="1.1.자산을 배분한다는것이 무엇인가요?"
            />
          </ListItem>
          <ListItem component={Link} href="/description/ch1_2">
            <ListItemText
              primary="1.2.많지도 않은 내 자산 왜 배분해야 하는거예요?"
            />
          </ListItem>
        </List>
        <ListItem>
          <ListItemText
            primary="2.나도 한 번 해보자! 자산배분"
          />
        </ListItem>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem>
            <ListItemText
              primary="2.1.내 자산 파악하기"
            />
          </ListItem>
          <List component="div" sx={{ pl: 8, pt: 0, pb: 0 }} dense={true}>
            <ListItem component={Link} href="/description/ch2_1_1">
              <ListItemText
                primary="2.1.1.내가 가진 자산들이 어느 계좌에 숨어있을까?"
              />
            </ListItem>
            <ListItem component={Link} href="/description/ch2_1_2">
              <ListItemText
                primary="2.1.2.난 무엇에 돈을 넣고 있을까?"
              />
            </ListItem>
            <ListItem component={Link} href="/description/ch2_1_3">
              <ListItemText
                primary="2.1.3.유형별로 나눈 자산 분류별로 더 구체화해보자"
              />
            </ListItem>
          </List>
        </List>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem>
            <ListItemText
              primary="2.2.투자자산 파해치기"
            />
          </ListItem>
          <List component="div" sx={{ pl: 8, pt: 0, pb: 0 }} dense={true}>
            <ListItem component={Link} href="/description/ch2_2_1">
              <ListItemText
                primary="2.2.1.투자자산은 무엇일까?"
              />
            </ListItem>
            <ListItem component={Link} href="/description/ch2_2_2">
              <ListItemText
                primary="2.2.2.개별주식"
              />
            </ListItem>
            <ListItem component={Link} href="/description/ch2_2_3">
              <ListItemText
                primary="2.2.3.지수추종 ETF"
              />
            </ListItem>
          </List>
        </List>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem>
            <ListItemText
              primary="2.3.배당자산 파해치기"
            />
          </ListItem>
          <List component="div" sx={{ pl: 8, pt: 0, pb: 0 }} dense={true}>
            <ListItem component={Link} href="/description/ch2_3_1">
              <ListItemText
                primary="2.3.1.배당자산은 무엇일까?"
              />
            </ListItem>
            <ListItem component={Link} href="/description/ch2_3_2">
              <ListItemText
                primary="2.3.2.개별주식"
              />
            </ListItem>
            <ListItem component={Link} href="/description/ch2_3_3">
              <ListItemText
                primary="2.3.3.배당성장 ETF"
              />
            </ListItem>
            <ListItem component={Link} href="/description/ch2_3_4">
              <ListItemText
                primary="2.3.4.고배당 ETF"
              />
            </ListItem>
          </List>
        </List>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem>
            <ListItemText
              primary="2.4.안전자산 파해치기"
            />
          </ListItem>
          <List component="div" sx={{ pl: 8, pt: 0, pb: 0 }} dense={true}>
            <ListItem component={Link} href="/description/ch2_4_1">
              <ListItemText
                primary="2.4.1.안전자산은 무엇일까?"
              />
            </ListItem>
            <ListItem component={Link} href="/description/ch2_4_2">
              <ListItemText
                primary="2.4.2.예적금"
              />
            </ListItem>
            <ListItem component={Link} href="/description/ch2_4_3">
              <ListItemText
                primary="2.4.3.채권"
              />
            </ListItem>
            <ListItem component={Link} href="/description/ch2_4_4">
              <ListItemText
                primary="2.4.4.외화"
              />
            </ListItem>
            <ListItem component={Link} href="/description/ch2_4_5">
              <ListItemText
                primary="2.4.5.금"
              />
            </ListItem>
          </List>
        </List>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem>
            <ListItemText
              primary="2.5.현금자산 파해치기"
            />
          </ListItem>
          <List component="div" sx={{ pl: 8, pt: 0, pb: 0 }} dense={true}>
            <ListItem component={Link} href="/description/ch2_5_1">
              <ListItemText
                primary="2.5.1.입출식 통장"
              />
            </ListItem>
            <ListItem component={Link} href="/description/ch2_5_2">
              <ListItemText
                primary="2.5.2.파킹통장과 CMA"
              />
            </ListItem>
          </List>
        </List>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem component={Link} href="/description/ch2_6">
            <ListItemText
              primary="2.6. 내 저축성향 파악하기"
            />
          </ListItem>
        </List>
        <List component="div" sx={{ pl: 4, pt: 0, pb: 0 }} dense={true}>
          <ListItem component={Link} href="/description/ch2_7">
            <ListItemText
              primary="2.7.이제 알겠는데, 한번에 다 옮기기기 두렵다면?"
            />
          </ListItem>
        </List>
      </List>
    </Box>
  );
}
