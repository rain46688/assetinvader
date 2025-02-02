import axios from 'axios';
import { refresh_jwtoken } from './util';

/**
 * sendPost 함수 : POST 요청을 보내는 함수
 * @param {string} data - 요청 데이터
 * @param {string} url - 요청 URL
 * @returns {Promise<any>} - API 요청 결과
 */
export async function sendPost(data: string, url: string): Promise<any> {
    // 로그인 페이지가 아닌 경우
    if (url != 'member/login') {
        // 리프레쉬 토큰이 만료 안됬으면 액세스 토큰 재발급
        await refresh_jwtoken();
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jtoken')}`
        },
        data: data,
    };

    return axios(process.env.NEXT_PUBLIC_API_URL + url, options)
        .then((response) => {
            const result = response.data;
            if (result.status === 'success') {
                console.log(" === API Success === ");
                return result;
            } else {
                console.log(" === API Error === ");
                return { 'status': 'fail', 'msg': result.msg}
            }
        })
        .catch((error) => {
            console.log(" === API Error : ", error);
            return { 'status': 'fail', 'msg': error}
        });
};

/**
 * sendGet 함수 : GET 요청을 보내는 함수
 * @param {string} url - 요청 URL
 * @returns {Promise<any>} - API 요청 결과
*/
export async function sendGet(url: string): Promise<any> {
    // 리프레쉬 토큰이 만료 안됬으면 액세스 토큰 재발급
    await refresh_jwtoken();
    const options = {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jtoken')}`
        },
    };

    return axios(process.env.NEXT_PUBLIC_API_URL + url, options)
        .then((response) => {
            const result = response.data;
            if (result.status === 'success') {
                console.log(" === API Success === ");
                return result;
            } else {
                console.log(" === API Error === ");
                return { 'status': 'fail', 'msg': result.msg}
            }
        })
        .catch((error) => {
            console.log(" === API Error : ", error);
            return { 'status': 'fail', 'msg': error}
        });
}

/**
 * sendPut 함수 : PUT 요청을 보내는 함수
 * @param {string} data - 요청 데이터
 * @param {string} url - 요청 URL
 * @returns {Promise<any>} - API 요청 결과
 */
export async function sendPut(data: string, url: string): Promise<any> {
    // 리프레쉬 토큰이 만료 안됬으면 액세스 토큰 재발급
    await refresh_jwtoken();
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jtoken')}`
        },
        data: data,
    };

    return axios(process.env.NEXT_PUBLIC_API_URL + url, options)
        .then((response) => {
            const result = response.data;
            if (result.status === 'success') {
                console.log(" === API Success === ");
                return result;
            } else {
                console.log(" === API Error === ");
                return { 'status': 'fail', 'msg': result.msg}
            }
        })
        .catch((error) => {
            console.log(" === API Error : ", error);
            return { 'status': 'fail', 'msg': error}
        });
}

/**
 * sendDelete 함수 : DELETE 요청을 보내는 함수
 * @param {string} url - 요청 URL
 * @returns {Promise<any>} - API 요청 결과
 */
export async function sendDelete(url: string): Promise<any> {
    // 리프레쉬 토큰이 만료 안됬으면 액세스 토큰 재발급
    await refresh_jwtoken();
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jtoken')}`
        },
    };

    return axios(process.env.NEXT_PUBLIC_API_URL + url, options)
        .then((response) => {
            const result = response.data;
            if (result.status === 'success') {
                console.log(" === API Success === ");
                return result;
            } else {
                console.log(" === API Error === ");
                return { 'status': 'fail', 'msg': result.msg}
            }
        })
        .catch((error) => {
            console.log(" === API Error : ", error);
            return { 'status': 'fail', 'msg': error}
        });
}

/**
 * sendFile 함수 : 파일 전송 요청을 보내는 함수
 * @param {FormData} data - 요청 데이터
 * @param {string} url - 요청 URL
 * @returns {Promise<any>} - API 요청 결과
 */
export async function sendFile(data: FormData, url: string): Promise<any> {
    // 리프레쉬 토큰이 만료 안됬으면 액세스 토큰 재발급
    await refresh_jwtoken();
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${sessionStorage.getItem('jtoken')}`
        },
        data: data,
    };

    return axios(process.env.NEXT_PUBLIC_API_URL + url, options)
        .then((response) => {
            const result = response.data;
            if (result.status === 'success') {
                console.log(" === API Success === ");
                return result;
            } else {
                console.log(" === API Error === ");
                return { 'status': 'fail', 'msg': result.msg}
            }
        })
        .catch((error) => {
            console.log(" === API Error : ", error);
            return { 'status': 'fail', 'msg': error}
        });
}