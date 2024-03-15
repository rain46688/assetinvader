import { jwtDecode } from 'jwt-decode';

// 잡다한 함수들을 모아놓은 파일

/**
 * isExpirationJwtoken 함수 : 토큰 만료 여부 확인 함수
 * @param {string} jtoken - 토큰
 * @returns {boolean} - 토큰 만료 여부
 */
export const isExpirationJwtoken = (jtoken: string) => {
    // 토큰이 존재하지 않으면 만료로 처리
    const decoded: any = jwtDecode('' + jtoken);
    // 만료시간
    const expirationTime = decoded.exp;
    // 현재시간
    const currentTime = Math.floor(Date.now() / 1000);
    // 만료시간과 현재시간 비교
    const isExpiration = expirationTime < currentTime;
    // 토큰 만료 여부 반환
    return isExpiration;
}