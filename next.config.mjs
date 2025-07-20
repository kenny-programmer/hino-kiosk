let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },

  // Add security headers with cross-browser compatibility
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval needed for Next.js
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Allow Google Fonts
              "img-src 'self' data: blob: https:", // Allow images from https sources
              "font-src 'self' https://fonts.gstatic.com data:", // Allow Google Fonts
              "connect-src 'self' https://tsoipxivyikuvlgsjdl.supabase.co https://api.supabase.co https://*.supabase.co wss://tsoipxivyikuvlgsjdl.supabase.co", // Supabase connections
              "media-src 'self' blob: data:", // Allow media files
              "worker-src 'self' blob:", // Allow web workers
              "child-src 'self'", // Allow iframes from same origin
              "frame-src 'self'", // Allow frames from same origin
              "object-src 'none'", // Block objects for security
              "base-uri 'self'", // Restrict base URI
              "form-action 'self'", // Allow form submissions to same origin
              "frame-ancestors 'none'", // Prevent clickjacking
              "upgrade-insecure-requests" // Upgrade HTTP to HTTPS
            ].join('; ')
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), speaker=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // Additional headers for cross-browser compatibility
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  }
}

// Merge userConfig if available
if (userConfig) {
  const config = userConfig.default || userConfig
  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig