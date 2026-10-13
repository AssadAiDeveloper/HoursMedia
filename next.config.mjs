import createNextIntlPlugin from "next-intl/plugin";

/**
 * This config is authored as an ES module (`next.config.mjs`) on purpose.
 * next-intl exposes a separate ESM build of its plugin that does not pull in
 * the `@swc/core` native binding (only the CJS/development build does). Loading
 * the ESM build keeps config resolution working in environments where the SWC
 * native cache cannot be materialized.
 *
 * CSP is set here (rather than per-request with a nonce) so that all public
 * pages stay statically prerendered. If a nonce-based policy is ever required,
 * move this to `src/proxy.ts` and force dynamic rendering.
 *
 * `frame-src`, `script-src` and `connect-src` include the HighLevel /
 * LeadConnector embed origins so that approved booking, chat and form embeds
 * keep working once they are configured. Remove them if no embed is used.
 */
const isDev = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://*.gohighlevel.com https://*.leadconnectorhq.com https://*.msgsndr.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://*.gohighlevel.com https://*.leadconnectorhq.com https://*.msgsndr.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.gohighlevel.com https://*.leadconnectorhq.com https://*.msgsndr.com",
  "frame-src 'self' https://*.gohighlevel.com https://*.leadconnectorhq.com https://*.msgsndr.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    // Pin the workspace root so a stray lockfile outside the repo cannot be
    // mistaken for the root (which otherwise changes module resolution).
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
