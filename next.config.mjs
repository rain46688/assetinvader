/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    devServer: {
        // 개발 서버를 모든 IP 주소에 바인딩
        // 이렇게 하면 외부에서도 접속할 수 있게 됩니다.
        host: '0.0.0.0'
    }
};

export default nextConfig;