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

/**
 * validationCheck 함수 : 유효성 검사 함수
 * @param {string} value - 입력값
 * @param {string} field - 필드명
 * @param {any} fieldDataType - 필드 데이터 타입
 * @param {any} fieldData - 필드 데이터
 * @returns {boolean} - 유효성 검사 결과
 */
export const validationCheck = (value: string, field: string, fieldDataType: any, fieldData: any) => {
    console.log(" ==== validationCheck ==== ");
    // 유효성 검사 타입
    let result = false;
    switch (fieldDataType[field]) {
        // 한글, 영문, 숫자, 공백, 일부 특수문자만 입력
        case "string":
            if (/^[가-힣a-zA-Z0-9\s{}[\]()-_/&]*$/.test(value)) {
                fieldData[field] = false;
                result = true;
            } else {
                fieldData[field] = true;
                result = false;
            }
            break;
        // 숫자만 입력
        case "number":
            if (/^[0-9]*$/.test(value)) {
                fieldData[field] = false;
                result = true;
            } else {
                fieldData[field] = true;
                result = false;
            }
            break;
        // 소수점 2자리까지 입력
        case "double":
            if (/^\d+(\.\d{1,2})?$/.test(value)) {
                fieldData[field] = false;
                result = true;
            } else {
                fieldData[field] = true;
                result = false;
            }
            break;
        // 소수점 8자리까지 입력
        case "double2":
            if (/^\d+\.\d{8}$/.test(value)) {
                fieldData[field] = false;
                result = true;
            } else {
                fieldData[field] = true;
                result = false;
            }
            break;
        // 날짜 형식 YYYY-MM
        case "date":
            if (/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) {
                fieldData[field] = false;
                result = true;
            } else {
                fieldData[field] = true;
                result = false;
            }
            break;
        // 날짜 형식 YYYY-MM-DD
        case "date2":
            if (/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(value)) {
                fieldData[field] = false;
                result = true;
            } else {
                fieldData[field] = true;
                result = false;
            }
            break;
        // 정규식 없음
        default:
            console.log(" === 정규식 없음 === ");
            result = true;
            break;
    }
    return result;
}

/**
 * getNextMonth 함수 : 다음 월을 찾아주는 함수
 * @param {string} date - 입력 월
 * @returns {string} - 입력월의 다음월
 */
export const getNextMonth = (date: string): string => {
    const [year, month] = date.split('-').map(Number);
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth > 12) {
        nextMonth = 1;
        nextYear++;
    }
    return `${nextYear}-${String(nextMonth).padStart(2, '0')}`;
}