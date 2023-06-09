/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_BASE_PUBLIC_URL : process.env.NEXT_BASE_PUBLIC_URL ,
    NEXT_TINYMCE_SECRET : process.env.NEXT_TINYMCE_SECRET ,
    SECRET_KEY : process.env.SECRET_KEY ,
    MONGO_URI : process.env.MONGO_URI ,
  },
  images: {
    domains: ["res.cloudinary.com"],
  }
}

module.exports = nextConfig
