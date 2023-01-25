/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['www.macorlux.pt'],
  }
}


/* --- module.exports = nextConfig */
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_SECRET_STRIPE_SECRET_KEY: process.env.NEXT_SECRET_STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  swcMinify: true,
  images:{
    domains:['www.macorlux.pt'],
  },
  /*async redirects() {
    return [
      {
        source: "/((?!maintenance).*)",
        destination: "/maintenance",
        permanent: false, //!!!IMPORTANT!!!
      },
    ];}
  */
  async redirects() {
    return [
      // {
      //   source: "/((?!maintenance).*)",
      //   destination: "/maintenance.html",
      //   permanent: false,
      // },
      {
        source: "/maintenance",
        destination: "/",
        permanent: false,
      },
    ];
  },
};