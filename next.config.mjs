/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Tells Next.js to build static HTML/CSS files for S3
  output: 'export', 
  
  images: {
    // 2. Disables the built-in server-side image optimization 
    // (Required for standard S3 hosting)
    unoptimized: true, 
  },
  // Optional: Ensures folder-based structure for better SEO/S3 routing
  trailingSlash: true,
};

export default nextConfig;