/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.steamstatic.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'steamcdn-a.akamaihd.net',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
