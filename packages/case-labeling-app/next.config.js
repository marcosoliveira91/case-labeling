module.exports = {
  env: {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    secretCookiePassword: process.env.SECRET_COOKIE_PASSWORD,
  },
  serverRuntimeConfig: {
    apiBaseUrl: process.env.SERVER_API_BASE_URL,
  },
};
