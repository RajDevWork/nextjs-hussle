/** @type {import('next').NextConfig} */

/*
|--------------------------------------------------------------------------
| Next.js Security Hardened Configuration
|--------------------------------------------------------------------------
| Yeh configuration production-grade security practices ko follow karta hai.
| Har section ke sath comment diya gaya hai:
|
| - Yeh kya karta hai
| - Kyu use hota hai
| - Kis attack ko prevent karta hai
|
| IMPORTANT:
| Kuch headers deployment platform (Vercel, Nginx, Cloudflare)
| level par aur better work karte hain.
|--------------------------------------------------------------------------
*/

/**
 * Common Security Headers
 */
const securityHeaders = [
  /**
   * X-DNS-Prefetch-Control
   *
   * Browser ko DNS prefetching control karta hai.
   * DNS prefetching privacy leak kar sakta hai.
   *
   * off => unnecessary DNS lookups prevent
   */
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },

  /**
   * X-XSS-Protection
   *
   * Old browsers ke liye basic XSS protection.
   *
   * Modern browsers mostly ignore karte hain,
   * but legacy browser support ke liye useful.
   *
   * Prevents:
   * - reflected XSS attacks
   */
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },

  /**
   * X-Frame-Options
   *
   * Kisi dusri website ko iframe ke andar
   * aapki site embed karne se rokta hai.
   *
   * Prevents:
   * - Clickjacking attacks
   */
  {
    key: "X-Frame-Options",
    value: "DENY",
  },

  /**
   * X-Content-Type-Options
   *
   * Browser MIME sniffing disable karta hai.
   *
   * Prevents:
   * - malicious file execution
   * - content type confusion attacks
   */
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },

  /**
   * Referrer-Policy
   *
   * External sites ko kitna referrer data bhejna hai.
   *
   * strict-origin-when-cross-origin:
   * - same origin => full URL
   * - cross origin => only origin
   *
   * Prevents:
   * - sensitive URL leakage
   */
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },

  /**
   * Permissions-Policy
   *
   * Browser APIs ko restrict karta hai.
   *
   * Prevents:
   * - unauthorized camera/mic/location access
   */
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },

  /**
   * Strict-Transport-Security (HSTS)
   *
   * Browser ko force karta hai sirf HTTPS use karne ke liye.
   *
   * NOTE:
   * Sirf HTTPS production environment me enable karein.
   *
   * Prevents:
   * - SSL stripping attacks
   * - HTTP downgrade attacks
   */
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },

  /**
   * Content-Security-Policy (CSP)
   *
   * MOST IMPORTANT SECURITY HEADER
   *
   * Define karta hai:
   * - scripts kaha se load hongi
   * - images kaha se load hongi
   * - styles kaha se load hongi
   *
   * Prevents:
   * - XSS attacks
   * - malicious script injection
   * - data injection attacks
   *
   * WARNING:
   * Agar external CDN/scripts use karoge
   * toh unko yahan explicitly allow karna padega.
   */
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data:;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `
      .replace(/\n/g, ""),
  },

  /**
   * Cross-Origin-Opener-Policy
   *
   * Cross-origin window interaction isolate karta hai.
   *
   * Prevents:
   * - cross-origin attacks
   * - side-channel attacks
   */
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },

  /**
   * Cross-Origin-Resource-Policy
   *
   * External domains ko resources access karne se rokta hai.
   *
   * Prevents:
   * - unauthorized resource sharing
   */
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },

  /**
   * Cross-Origin-Embedder-Policy
   *
   * Resource isolation enforce karta hai.
   *
   * Useful for:
   * - SharedArrayBuffer
   * - advanced browser isolation
   */
  {
    key: "Cross-Origin-Embedder-Policy",
    value: "require-corp",
  },
];

const nextConfig = {
  /**
   * React Strict Mode
   *
   * Development me unsafe lifecycle,
   * side-effects aur potential bugs detect karta hai.
   *
   * Recommended: ALWAYS TRUE
   */
  reactStrictMode: true,

  /**
   * PoweredBy Header Remove
   *
   * Default:
   * x-powered-by: Next.js
   *
   * Yeh attackers ko framework identify karne deta hai.
   *
   * Prevents:
   * - basic fingerprinting
   */
  poweredByHeader: false,

  /**
   * SWC Minification
   *
   * Faster minification and optimization.
   */
  swcMinify: true,

  /**
   * Production Source Maps Disable
   *
   * Source maps production me expose nahi honge.
   *
   * Prevents:
   * - source code exposure
   * - internal logic leak
   */
  productionBrowserSourceMaps: false,

  /**
   * Image Security Configuration
   *
   * Dangerous SVG allow nahi karna.
   *
   * SVG me malicious JS inject ho sakta hai.
   */
  images: {
    dangerouslyAllowSVG: false,

    /**
     * Remote image domains whitelist
     *
     * Sirf trusted domains allow karo.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  /**
   * Experimental Security Features
   */
  experimental: {
    /**
     * Server Actions Allowed Origins
     *
     * Prevents:
     * - CSRF-like server action abuse
     */
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },

  /**
   * Global Security Headers
   *
   * Yeh headers har route par apply honge.
   */
  async headers() {
    return [
      {
        /**
         * Apply on ALL routes
         */
        source: "/(.*)",

        headers: securityHeaders,
      },

      /**
       * Example:
       * Custom header for specific route
       */
      {
        source: "/about",
        headers: [
          {
            key: "app-auth-key",
            value: "raj1234rn",
          },
        ],
      },
    ];
  },

  /**
   * Redirects Example
   *
   * HTTP to HTTPS redirect
   * (Mostly reverse proxy/Vercel level par hota hai)
   */
  async redirects() {
    return [];
  },

  /**
   * Rewrites Example
   */
  async rewrites() {
    return [];
  },
};

export default nextConfig;