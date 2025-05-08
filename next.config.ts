import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    domains: ["example.com", "anotherdomain.com", "satupeta.jatim.prov.go.id"],
  },
};

export default nextConfig;
