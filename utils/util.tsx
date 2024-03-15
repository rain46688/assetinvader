import axios from 'axios';

// 잡다한 함수들을 모아놓은 파일

/**
 * refresh_jwtoken 함수 : 토큰 재발급 함수
 * @returns {Promise<any>} - API 요청 결과
 */
export const refresh_jwtoken = async () => {
    const user_id = await sessionStorage.getItem('user_id');
    // 사용자 아이디가 없으면 실패로 처리
    if (user_id == null) {
        return { 'status': 'fail' }
    }

    // 사용자 아이디로 토큰 재발급 요청
    const data = JSON.stringify({
        "user_id": user_id
    });
    // 헤더 설정
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jtoken')}`
        },
        data: data,
    };
    // API 요청
    return await axios(process.env.NEXT_PUBLIC_API_URL + 'member/refresh', options)
        .then((response) => {
            const result = response.data;
            if (result.status === 'success') {
                // 재발급 성공시 토큰을 세션 스토리지에 저장
                console.log(" === 토큰 재발급 가능 === ");
                sessionStorage.setItem('jtoken', result.data.jtoken);
                return result;
            } else {
                // 재발급 실패시 실패로 처리
                console.log(" === 토큰 재발급 불가능 === ");
                return { 'status': 'fail' }
            }
        })
        .catch((error) => {
            // 에러 발생시 실패로 처리
            console.log(" === 토큰 재발급 Error : ", error);
            return { 'status': 'fail' }
        });
}