import { useState, useEffect } from "react";
import { sendPost } from "@/utils/fetch";
import { useRouter } from "next/navigation";
// redux 관련 임포트
import { setUser } from '@/redux/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';

export const useSignup = () => {
  const router = useRouter();
  // redux 사용
  const dispatch = useAppDispatch();
  // 유저아이디와 비밀번호 값 가져오기
  const user_id = useAppSelector(state => state.userReducer.user_id);
  const password = useAppSelector(state => state.userReducer.password);
  const [password_re, setPassword_re] = useState('');
  const [invitecode, setInvitecode] = useState('');
  const role = useAppSelector(state => state.userReducer.role);
  const locked = useAppSelector(state => state.userReducer.locked);
  // 아이디 유효성 검사
  const [idVaild, setIdVaild] = useState(false);
  // 비밀번호 유효성 검사
  const [passwordVaild, setPasswordVaild] = useState(false);
  // 초대코드 유효성 검사
  const [invitecodeVaild, setInvitecodeVaild] = useState(false);
  // 스낵바 관련
  const [snack, setSnack] = useState(false);
  // 스낵바 메시지 관련
  const [snackMessage, setSnackMessage] = useState('');

  useEffect(() => {
    // 토큰이 존재하면 기본 페이지로 이동 (일단 유형별 자산관리 /asset_type)
    const jtoken = sessionStorage.getItem('jtoken');
    if (jtoken != null) {
      router.push('' + process.env.NEXT_PUBLIC_ROOT_URL);
    }
  }, []);

  // 회원가입 함수
  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(" === handleSignup === ");
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

    const result = await sendPost(data, 'member/add_member');
    
  };

  // 스낵바 닫기 함수
  const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack(false);
  };

  return { 
    handleSignup, 
    user_id, 
    password,
    password_re,
    setPassword_re,
    invitecode, 
    setInvitecode, 
    role, 
    locked, 
    dispatch, 
    idVaild, 
    passwordVaild, 
    invitecodeVaild, 
    snack, 
    snackMessage, 
    handleSnackClose };
}