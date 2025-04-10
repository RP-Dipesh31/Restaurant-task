import { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.ProvidePlugin({
          process: "process/browser",
        })
      );
    }
    return config;
  },
};

export default nextConfig;
