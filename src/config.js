/**
 * Application wide configuration.
 */
const config = {
  baseApiURI: process.env.REACT_APP_API_URL || 'API BASE URL',
  baseImageUrl: process.env.REACT_APP_IMAGE_URL || 'IMAGE BASE URL',

  apiKey: process.env.REACT_APP_API_KEY || 'Create API KEY at https://www.themoviedb.org/settings/api',

  endpoints: {
    tv: '/tv',
    movie: '/movie',
    trending: '/trending',
    trendingMovie: '/trending/movie/day',
    trendingTV: '/trending/tv/day',
    movieGenre: '/genre/movie/list',
    tvGenre: '/genre/tv/list'
  }
};

export default config;
