
// 포멧 관련 함수들을 모아둔 파일

/**
 * formatDate 함수 : 날짜를 받아서 yyyy-mm-dd hh:mm:ss 형태로 변환
 * @param dateString : 날짜
 * @returns : yyyy-mm-dd hh:mm:ss 형태의 날짜
 */
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * formatDateV2 함수 : 날짜를 받아서 yyyy-mm-dd 형태로 변환
 * @param dateString : 날짜
 * @returns : yyyy-mm-dd 형태의 날짜
 */
export const formatDateV2 = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * formatDateV3 함수 : 날짜를 받아서 yyyy-mm 형태로 변환
 * @param dateString : 날짜
 * @returns : yyyy-mm 형태의 날짜
 */
export const formatDateV3 = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
};

/**
 * parseDate 함수 : yyyy-mm-dd 형태의 날짜를 받아서 날짜 타입으로 변경
 * @param yyyy-mm-dd 형태의 날짜
 * @returns : 날짜 객체
 */
export const parseDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}