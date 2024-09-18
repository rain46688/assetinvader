import { useState, useEffect } from "react";
import { sendPost } from "@/utils/fetch";
import { useRouter } from "next/navigation";
// redux 관련 임포트
import { setUser } from '@/redux/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';

export const useModify = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword_re, setNewPassword_re] = useState('');
  // 비밀번호 유효성 검사
  const [oldPasswordVaild, setOldPasswordVaild] = useState(false);
  // 비밀번호 유효성 검사
  const [newPasswordVaild, setNewPasswordVaild] = useState(false);
  // 비밀번호 유효성 검사2
  const [newPasswordReVaild, setNewPasswordReVaild] = useState(false);
  // 스낵바 관련
  const [snack, setSnack] = useState(false);
  // 스낵바 메시지 관련
  const [snackMessage, setSnackMessage] = useState('');
  // 정보수정 상태
  const [modifyState, setModifyState] = useState(false);

  // 회원정보 수정 함수
  const handleModify = async (event: React.FormEvent<HTMLFormElement>) => {
    const id = sessionStorage.getItem("id");
    console.log(" === handleSignup === ");
    // 화면 새로고침 방지
    event.preventDefault();

    // 유효성 검사
    if (oldPassword == '') {
      setOldPasswordVaild(true);
      return;
    } else {
      setOldPasswordVaild(false);
    }
    if (newPassword == '') {
      setNewPasswordVaild(true);
      return;
    } else {
      setNewPasswordVaild(false);
    }
    if (newPassword != newPassword_re) {
      setNewPasswordReVaild(true);
      return;
    } else {
      setNewPasswordReVaild(false);
    }

    const data = JSON.stringify({
      "oldPassword": oldPassword,
      "newPassword": newPassword
    });

    const result = await sendPost(data, 'member/update_member/'+id);
    if (result.status == 'success') {
        setModifyState(true);
    } else {
      // 실패시 스낵바 메시지 설정
      setSnackMessage("회원정보 수정에 실패하였습니다. 다시 시도해주세요.\n" + result.msg);
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

  const handleBack= () => {
    router.push('' + process.env.NEXT_PUBLIC_ROOT_URL);
  };


  return {
    handleModify,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    newPassword_re,
    setNewPassword_re,
    oldPasswordVaild,
    newPasswordVaild,
    newPasswordReVaild,
    snack,
    snackMessage,
    handleSnackClose,
    handleBack,
    modifyState
  };
}