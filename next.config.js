/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['www.macorlux.pt'],
  }
}


/* --- module.exports = nextConfig */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['www.macorlux.pt'],
  },
  async redirects() {
    return [
      {
        source: "/((?!maintenance).*)",
        destination: "/maintenance",
        permanent: false, //!!!IMPORTANT!!!
      },
    ];}
};