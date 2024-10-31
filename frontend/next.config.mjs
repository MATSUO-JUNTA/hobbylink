/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hobbylink-dev.s3.ap-northeast-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'hobbylink.s3.ap-northeast-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'hobbylink-66d327f4790b.herokuapp.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
}

export default nextConfig
