// 쿠키 추가 함수 
// string : 이름, value  : 값, exp : 1=1분
export function setCookie(name: string, value: string, exp: number) {
    const date = new Date();
    date.setTime(date.getTime() + exp * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

// 쿠키 호출 함수 
// string : 이름
export function getCookie(name: string) {
    const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}

// 쿠키 삭제 함수
// string : 이름
export function deleteCookie (name: string){
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}