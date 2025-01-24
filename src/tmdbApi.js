const getTmdbHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };
};

/**
 *
 * @param {*} query
 * @returns
 */
export const searchMovies = async (query) => {
  const headers = getTmdbHeaders();
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    {
      ...headers,
    }
  );
  console.log(response.status);

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status}`);
  }

  const data = await response.json();

  return data.results;
};

export const getUserWatchlist = async () => {
  const headers = getTmdbHeaders();
  const accountId = process.env.TMDB_ACCOUNT_ID;
  const response = await fetch(
    `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies`,
    {
      ...headers,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch watchlist: ${response.status}`);
  }

  const data = await response.json();

  return data.results;
};
