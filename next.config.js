const APP_DOMAIN = process.env.APP_DOMAIN || 'localhost';

module.exports = {
  test: /\.svg$/,
  use: ['@svgr/webpack'],
  images: {
    domains: ['www.gravatar.com', APP_DOMAIN],
  },
};
