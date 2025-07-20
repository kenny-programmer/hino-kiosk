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

  // Enhanced security headers
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
            value: 'DENY' // Changed from SAMEORIGIN to DENY for better security
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
            value: 'accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), display-capture=(), document-domain=(), encrypted-media=(), fullscreen=(), gamepad=(), geolocation=(), gyroscope=(), hid=(), idle-detection=(), local-fonts=(), magnetometer=(), microphone=(), midi=(), otp-credentials=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), serial=(), speaker-selection=(), usb=(), web-share=(), xr-spatial-tracking=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // Additional security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Add missing headers from security report
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none' // Use 'require-corp' if you want stricter isolation
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups' // Allows popups while maintaining some security
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-site' // Allows same-site requests
          },
          // Server identification hiding
          {
            key: 'Server',
            value: '' // Hide server information
          },
          {
            key: 'X-Powered-By',
            value: '' // Hide X-Powered-By header
          }
        ]
      },
      // Specific headers for API routes
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          },
          {
            key: 'Surrogate-Control',
            value: 'no-store'
          }
        ]
      },
      // Security headers for static assets
      {
        source: '/((?!api/).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },

  // Additional security configurations
  poweredByHeader: false, // Remove X-Powered-By header
  
  // Redirect configuration for HTTPS enforcement
  async redirects() {
    return [
      // Force HTTPS in production
      ...(process.env.NODE_ENV === 'production' ? [
        {
          source: '/:path*',
          has: [
            {
              type: 'header',
              key: 'x-forwarded-proto',
              value: 'http',
            },
          ],
          destination: 'https://fairpointca.com/:path*',
          permanent: true,
        }
      ] : [])
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