import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Set the correct workspace root to silence multiple lockfile warning
  outputFileTracingRoot: path.join(__dirname, './'),

  // Empty turbopack config to silence Next.js 16 warning
  turbopack: {},

  // Image configuration for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://vercel.live",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.stripe.com https://*.supabase.co https://api.openai.com https://vercel.live wss://ws.pusherapp.com",
              "frame-src 'self' https://js.stripe.com",
              "media-src 'self' https://*.supabase.co",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
        ],
      },
    ];
  },

  // Optional: Redirect from root domain to app subdomain
  // Uncomment if you want repostai.io to redirect to app.repostai.io
  // async redirects() {
  //   return [
  //     {
  //       source: '/:path*',
  //       has: [
  //         {
  //           type: 'host',
  //           value: 'repostai.io',
  //         },
  //       ],
  //       destination: 'https://app.repostai.io/:path*',
  //       permanent: true,
  //     },
  //   ];
  // },

  // Webpack configuration for server-side dependencies
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize canvas and pdf-parse for server-side rendering
      config.externals.push('canvas', '@napi-rs/canvas', 'pdf-parse');
    }
    return config;
  },
};

export default nextConfig;
