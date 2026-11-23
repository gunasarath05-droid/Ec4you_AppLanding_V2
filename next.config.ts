import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // No ESLint dependency in this project; type checking runs as part of `next build`.
  eslint: {ignoreDuringBuilds: true},
};

export default nextConfig;
