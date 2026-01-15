/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/26-kimnamchoiko',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
