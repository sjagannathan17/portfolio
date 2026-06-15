/** @type {import('next').NextConfig} */

// Static export + project base path are only applied in CI (EXPORT_MODE=true),
// so local `next dev` / `next start` keep working normally.
const isExport = process.env.EXPORT_MODE === "true";
const basePath = isExport ? "/portfolio" : "";

const nextConfig = {
  ...(isExport ? { output: "export" } : {}),
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  // Exposed to the client so /public assets can be prefixed (next/image does
  // not auto-prefix basePath for string srcs in /public).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
