import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    domains: [
      "example.com",
      "anotherdomain.com",
      "satupeta.jatimprov.go.id",
      "demo-maps.trikintech.id",
    ],
  },
};

export default nextConfig;
