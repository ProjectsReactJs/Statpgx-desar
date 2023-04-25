/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  i18n,
  env: {
    FROGMD_API_URL: process.env.FROGMD_API_URL,
    FROGMD_AUTH_URL: process.env.FROGMD_AUTH_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    TURNSTILE_SITE_KEY: process.env.TURNSTILE_SITE_KEY
  }
};
