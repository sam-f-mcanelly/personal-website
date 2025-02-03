/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["c.media-amazon.com"],
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**.mzstatic.com", // Allows any subdomain of mzstatic.com
            },
          ],
    }
};

export default nextConfig;
