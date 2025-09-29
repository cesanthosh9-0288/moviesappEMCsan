import React, { createContext, useState, useEffect } from 'react';

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [genrelist, setGenrelist] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=40ad78ff7afeb912ba71945c747efb68`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setGenrelist(data.genres || []))
      .catch((err) => console.error(err));
  }, []); // ✅ run only once on mount

  const toggleWatchList = (movie) => {
    const index = watchlist.findIndex((m) => m.id === movie.id);
    if (index === -1) {
      setWatchlist([...watchlist, movie]);
    } else {
      setWatchlist([
        ...watchlist.slice(0, index),
        ...watchlist.slice(index + 1),
      ]);
    }
  };

  return (
    <WatchListContext.Provider value={{ watchlist, toggleWatchList, genrelist }}>
      {children}
    </WatchListContext.Provider>
  );
};
