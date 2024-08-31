import { useState, useEffect } from "react";
import { sendPost } from "@/utils/fetch";
import { useRouter } from "next/navigation";
// redux 관련 임포트
import { setUser } from '@/redux/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';

export const useLogin = () => {
  const userouter = useRouter();
  // redux 사용
  const dispatch = useAppDispatch();
  // 유저아이디와 비밀번호 값 가져오기
  const user_id = useAppSelector(state => state.userReducer.user_id);
  const password = useAppSelector(state => state.userReducer.password);
  const role = useAppSelector(state => state.userReducer.role);
  const locked = useAppSelector(state => state.userReducer.locked);
  // 아이디 유효성 검사
  const [idVaild, setIdVaild] = useState(false);
  // 비밀번호 유효성 검사
  const [passwordVaild, setPasswordVaild] = useState(false);
  // 스낵바 관련
  const [snack, setSnack] = useState(false);
  // 스낵바 메시지 관련
  const [snackMessage, setSnackMessage] = useState('');

  useEffect(() => {
    // 토큰이 존재하면 기본 페이지로 이동 (일단 유형별 자산관리 /asset_type)
    const jtoken = sessionStorage.getItem('jtoken');
    if (jtoken != null) {
      userouter.push('' + process.env.NEXT_PUBLIC_ROOT_URL);
    }
  }, []);

  // 로그인 함수
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(" === handleLogin === ");
    // 화면 새로고침 방지
    event.preventDefault();

    // 유효성 검사
    if (user_id == '') {
      setIdVaild(true);
      return;
    } else {
      setIdVaild(false);
    }
    if (password == '') {
      setPasswordVaild(true);
      return;
    } else {
      setPasswordVaild(false);
    }

    const data = JSON.stringify({
      "user_id": user_id,
      "password": password
    });

    const result = await sendPost(data, 'member/login');
    if (result.status == 'success') {
      // token 저장
      sessionStorage.setItem('jtoken', result.data.jtoken);
      // 아이디와 유저아이디 값은 세션 스토리지에 저장
      sessionStorage.setItem('id', result.data.id);
      sessionStorage.setItem('user_id', result.data.user_id);
      sessionStorage.setItem('role', result.data.role);
      sessionStorage.setItem('locked', result.data.locked);
      if (result.data.locked) { // 잠금체크
        // 실패시 스낵바 메시지 설정
        setSnackMessage("해당 계정이 잠겨있습니다. 관리자에게 문의해주세요.");
        // 스낵바 오픈
        setSnack(true);
      } else {
        // 성공 후 빈값으로 초기화
        dispatch(setUser({ user_id: '', password: '', role: 2, locked: false }))
        // 성공 후 라우팅
        userouter.push('' + process.env.NEXT_PUBLIC_ROOT_URL);
      }
    } else {
      // 실패시 스낵바 메시지 설정
      setSnackMessage("로그인에 실패하였습니다. 다시 시도해주세요.");
      // 스낵바 오픈
      setSnack(true);
    }
  };

  // 스낵바 닫기 함수
  const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack(false);
  };

  return { handleLogin, user_id, password, role, locked, dispatch, idVaild, passwordVaild, snack, snackMessage, handleSnackClose };
}