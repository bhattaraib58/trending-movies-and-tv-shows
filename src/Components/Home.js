import React, { useEffect, useState } from 'react';

import http from '../utils/http';
import config from '../config';
import SingleShowCardView from './SingleShowView/SingleShowCardView';

/**
 * Home Component.
 *
 * @returns {Component}
 */
export default function Home() {
  const [isLoading, setLoading] = useState(true);

  const [trendingMovies, setTrendingMovies] = useState();
  const [trendingTV, setTrendingTV] = useState();
  const [movieGenres, setMovieGenres] = useState();

  /**
   * Find Movie Genre from Available List.
   *
   * @param {*} genreId
   * @returns
   */
  const getMovieGenre = genreId => {
    const genre = movieGenres.find(genre => genre.id === genreId);

    return genre ? genre.name : '';
  };

  /**
   * Fetch Trending Movies, TV and Genre.
   *
   */
  const getTrendingShows = async () => {
    setLoading(true);

    const { genres: movieGenres } = await http.getAll(config.baseApiURI + config.endpoints.movieGenre);
    const { results: trendingTV } = await http.getAll(config.baseApiURI + config.endpoints.trendingTV);
    const { results: trendingMovies } = await http.getAll(config.baseApiURI + config.endpoints.trendingMovie);

    setTrendingTV(trendingTV);
    setMovieGenres(movieGenres);
    setTrendingMovies(trendingMovies);
    setLoading(false);
  };

  useEffect(() => {
    getTrendingShows();
  }, []);

  return isLoading ? (
    <div className="primary-text-color">Loading</div>
  ) : (
    <div className="container d-flex flex-row name-wrap">
      <div className="momr-20">
        <h2 className="primary-text-color">Trending TV Shows</h2>
        <div>
          {trendingTV.map(shows => (
            <SingleShowCardView showObj={shows} key={shows.id} getMovieGenre={getMovieGenre} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="primary-text-color">Trending Movies</h2>
        <div>
          {trendingMovies.map(shows => (
            <SingleShowCardView showObj={shows} key={shows.id} getMovieGenre={getMovieGenre} />
          ))}
        </div>
      </div>
    </div>
  );
}
