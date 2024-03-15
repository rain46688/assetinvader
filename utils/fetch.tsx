import axios from 'axios';
import { getCookie } from './cookie';

/**
 * sendPost 함수 : POST 요청을 보내는 함수
 * @param {string} data - 요청 데이터
 * @param {string} url - 요청 URL
 * @returns {Promise<any>} - API 요청 결과
 */
export function sendPost(data: string, url: string): Promise<any> {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('jtoken')}`
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
                return { 'status': 'fail' }
            }
        })
        .catch((error) => {
            console.log(" === API Error : ", error);
            return { 'status': 'fail' }
        });
};

/**
 * sendGet 함수 : GET 요청을 보내는 함수
 * @param {string} url - 요청 URL
 * @returns {Promise<any>} - API 요청 결과
*/
export function sendGet(url: string): Promise<any> {
    const options = {
        headers: {
            Authorization: `Bearer ${getCookie('jtoken')}`
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
                return { 'status': 'fail' }
            }
        })
        .catch((error) => {
            console.log(" === API Error : ", error);
            return { 'status': 'fail' }
        });
}

/**
 * sendPut 함수 : PUT 요청을 보내는 함수
 * @param {string} data - 요청 데이터
 * @param {string} url - 요청 URL
 * @returns {Promise<any>} - API 요청 결과
 */
export function sendPut(data: string, url: string): Promise<any> {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('jtoken')}`
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
                return { 'status': 'fail' }
            }
        })
        .catch((error) => {
            console.log(" === API Error : ", error);
            return { 'status': 'fail' }
        });
}

/**
 * sendDelete 함수 : DELETE 요청을 보내는 함수
 * @param {string} url - 요청 URL
 * @returns {Promise<any>} - API 요청 결과
 */
export function sendDelete(url: string): Promise<any> {
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getCookie('jtoken')}`
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
                return { 'status': 'fail' }
            }
        })
        .catch((error) => {
            console.log(" === API Error : ", error);
            return { 'status': 'fail' }
        });
}