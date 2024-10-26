/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{
        ignoreDuringBuilds:true
    },
    async redirects() {
        return [
          {
            source: '/',
            destination: '/sign-up',
            permanent: true,
          },
        ]
    },
};

export default nextConfig;
