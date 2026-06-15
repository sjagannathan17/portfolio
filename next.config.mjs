/** @type {import('next').NextConfig} */

// Static export is only applied in CI (EXPORT_MODE=true), so local
// `next dev` / `next start` keep working normally. The site is served at the
// root of the custom domain (srinidhijagannathan.com), so no basePath is used.
const isExport = process.env.EXPORT_MODE === "true";

const nextConfig = {
  ...(isExport ? { output: "export" } : {}),
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: "" },
};

export default nextConfig;
