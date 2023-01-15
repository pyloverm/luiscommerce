/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['www.macorlux.pt'],
  }
}

module.exports = nextConfig
