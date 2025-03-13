import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: ''
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
        pathname: ''
       },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: ''
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: ''
      },
      {
        protocol: 'https',
        hostname: 'ae01.alicdn.com',
        pathname: ''
      }
    ]
  }
};

export default nextConfig; 
