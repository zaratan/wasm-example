module.exports = {
  reactStrictMode: true,
  webpack: (config, _ctx) => {
    config.experiments = { asyncWebAssembly: true };

    return config;
  },
};
