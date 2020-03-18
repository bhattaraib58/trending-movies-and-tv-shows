/**
 * Application wide configuration.
 */
const config = {
  baseApiURI: process.env.REACT_APP_API_URL || 'API BASE URL',

  apiKey: process.env.REACT_APP_API_KEY || 'Create API KEY at https://www.themoviedb.org/settings/api',

  endpoints: {
    tv: '/tv',
    movie: '/movie',
    trending: '/trending'
  }
};

export default config;
