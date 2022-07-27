import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import http from '../../utils/http';
import { getImageUrl, getImdbLink, getYoutubeLink } from '../../utils/utils';

import config from '../../config';

/**
 *
 *
 * @param {*} showObj
 * @returns
 */
export default function SingleShowCardView({ showObj, getGenre }) {
  const [links, setLinks] = useState({});

  /**
   * Get Show Name based on media Type with it's Original Name.
   *
   * @returns {String} ShowName.
   */
  const getShowName = () => {
    if (showObj.media_type === 'tv') {
      const originalName = showObj.name !== showObj.original_name ? ` (${showObj.original_name})` : '';

      return showObj.name + originalName;
    }

    const originalTitle = showObj.title !== showObj.original_title ? ` (${showObj.original_title})` : '';

    return showObj.title + originalTitle;
  };

  /**
   * Get Youtube Link from Videos Object Provided.
   *
   * @param {Object[]} videosObj
   * @returns {String | null}
   */
  const findAndGetYoutubeLink = (videosObj) => {
    const videoDetail = videosObj.find((video) => video.site === 'YouTube' && video.type === 'Trailer');

    return videoDetail && getYoutubeLink(videoDetail.key);
  };

  /**
   * Fetch IMDB Video Detail, External ID's, and Videos and set Links to State.
   *
   */
  const fetchIMDBExternalDetail = async () => {
    // External Id url for IMDB Link
    const externalIdURL = `${config.baseApiURI}/${showObj.media_type}/${showObj.id}/external_ids`;

    // Video URL for Movie Trailer Link
    const videoURL = `${config.baseApiURI}/${showObj.media_type}/${showObj.id}/videos`;

    // Video URL for Movie Trailer Link
    const videoDetail = `${config.baseApiURI}/${showObj.media_type}/${showObj.id}`;

    const result = await Promise.all([http.get(externalIdURL), http.get(videoURL), http.get(videoDetail)]);

    // Get imdb link
    const imdbLink = result[0] && getImdbLink(result[0].imdb_id);

    // Get Video Link
    const youtubeLink = result[1] && findAndGetYoutubeLink(result[1].results);

    // Get Network Detail
    const homepageLink = result[2] && result[2].homepage;

    const networks = result[2] && result[2].networks && result[2].networks[0].name;

    const links = {
      imdbLink,
      youtubeLink,
      homepageLink,
      networks
    };

    setLinks(links);
  };

  useEffect(() => {
    fetchIMDBExternalDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex flex-row primary-text-color card-background-color font-15 mb-10 p-10">
      <div className="mr-10 image-card">
        <a target="_blank" href={links.imdbLink} rel="noopener noreferrer">
          <img className="show-image" src={getImageUrl(showObj.poster_path)} alt={getShowName()} />
        </a>
      </div>
      <div className="d-flex flex-column">
        <div>
          <span className="font-20">{showObj.vote_average}</span>
          <span className="secondary-text-color">/10</span>
        </div>

        <div className="mt-10">
          <a
            target="_blank"
            href={links.imdbLink}
            className="font-18 mr-10 primary-text-color link"
            rel="noopener noreferrer"
          >
            {getShowName()}
          </a>
          <span className="font-12 secondary-text-color">
            {showObj.genre_ids.map((genreId, index) => (
              <React.Fragment key={genreId}>
                {index !== 0 ? <>&nbsp;&bull;&nbsp;</> : ''} {getGenre(genreId)}
              </React.Fragment>
            ))}
          </span>
        </div>
        {showObj.media_type === 'tv' && links.networks && (
          <div className="secondary-text-color mt-15">
            <span className="mr-5">Playing On:</span>
            <a
              target="_blank"
              href={links.homepageLink}
              className="secondary-text-color link"
              rel="noopener noreferrer"
            >
              {links.networks}
            </a>
          </div>
        )}
        <div className="mt-10">
          <a target="_blank" href={links.youtubeLink} rel="noopener noreferrer" className="primary-text-color link">
            Watch Trailer
          </a>
        </div>
      </div>
    </div>
  );
}

SingleShowCardView.propTypes = {
  getGenre: PropTypes.func,
  showObj: PropTypes.any
};
