module.exports = {
  env: {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  serverRuntimeConfig: {
    apiBaseUrl: process.env.SERVER_API_BASE_URL,
  },
};
