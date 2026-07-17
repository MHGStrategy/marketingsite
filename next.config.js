/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only use static export for production builds, not for dev server
  ...(process.env.NODE_ENV === 'production' && process.env.NEXT_EXPORT !== 'false' ? { output: 'export' } : {}),
  images: { unoptimized: true },
  // Ensures routes export as /route/index.html (better for shared hosting + clean URLs)
  trailingSlash: true,
  async headers() {
    const portfolioEmbedCsp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.office.com https://*.office.net https://*.microsoft.com https://*.live.com",
      "style-src 'self' 'unsafe-inline' https://*.office.com https://*.office.net https://*.live.com",
      [
        'frame-src',
        "'self'",
        'https://1drv.ms',
        'https://*.1drv.ms',
        'https://onedrive.live.com',
        'https://*.live.com',
        'https://*.office.com',
        'https://*.office.net',
        'https://*.officeapps.live.com',
        'https://*.sharepoint.com',
        'https://*.microsoft.com',
      ].join(' '),
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://*.office.com https://*.office.net https://*.microsoft.com https://*.live.com",
      "font-src 'self' data: https://*.office.com https://*.office.net https://*.live.com",
    ].join('; ');

    return [
      {
        source: '/portfolio/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: portfolioEmbedCsp,
          },
        ],
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Reduce file watchers to avoid EMFILE on macOS (this repo contains large caches/zips).
      config.watchOptions = config.watchOptions || {};
      const currentIgnored = config.watchOptions.ignored;
      const baseIgnored = Array.isArray(currentIgnored) ? currentIgnored : currentIgnored ? [currentIgnored] : [];
      const ignored = new Set(baseIgnored);
      [
        '**/node_modules/**',
        '**/.next/**',
        '**/.git/**',
        '**/.cursor/**',
        '**/.npm-cache/**',
        '**/apps-script/**',
        '**/out/**',
        '**/*.zip',
      ].forEach((p) => ignored.add(p));
      config.watchOptions.ignored = Array.from(ignored);
      // Fall back to polling to avoid running out of file descriptors (EMFILE).
      // This is slower than native FS events but is much more reliable on large repos.
      config.watchOptions.poll = config.watchOptions.poll || 1000;
      config.watchOptions.aggregateTimeout = config.watchOptions.aggregateTimeout || 300;
    }
    return config;
  },
};

module.exports = nextConfig;

