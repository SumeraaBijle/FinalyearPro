/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "hebbkx1anhila5yf.public.blob.vercel-storage.com", 
      "res.cloudinary.com" // Added Cloudinary domain
    ],
  },
};

export default nextConfig;