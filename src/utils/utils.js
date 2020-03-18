import config from '../config';

/**
 * Get Imdb Image URL from it's Image Path.
 *
 * @param {String} imagePath
 * @returns {String} ImageUrl.
 */
export function getImageUrl(imagePath) {
  return imagePath && config.baseImageUrl + imagePath;
}

/**
 * Get IMDB Link Based on ImdbID.
 *
 * @param {*} imdbId
 * @returns
 */
export const getImdbLink = imdbId => {
  return imdbId && `https://www.imdb.com/title/${imdbId}`;
};

/**
 * Get YouTube Link From videoID Provided.
 *
 * @param {*} videoID
 * @returns
 */
export const getYoutubeLink = videoID => {
  return videoID && `https://www.youtube.com/watch?v=${videoID}`;
};
