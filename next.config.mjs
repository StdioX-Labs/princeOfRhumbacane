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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  // Exclude large media files from server build traces
  outputFileTracingExcludes: {
    '*': [
      'public/images/**/*.wav',
      'public/images/**/*.mp4',
      'public/images/**/*.mov',
      'public/images/**/*.avi',
      'public/images/**/*.flac',
    ],
  },
  // Ensure static files are properly handled
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }

    // Add rule to handle large media files as external resources
    config.module.rules.push({
      test: /\.(wav|mp3|flac|mp4|mov|avi)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    })

    // Ignore large files in server bundle
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push({
        '*.wav': 'commonjs *.wav',
        '*.mp4': 'commonjs *.mp4',
        '*.mov': 'commonjs *.mov',
      })
    }

    return config
  },
}

if (userConfig) {
  // ESM imports will have a "default" property
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
