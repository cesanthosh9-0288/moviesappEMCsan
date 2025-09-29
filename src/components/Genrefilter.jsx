import React from 'react';

const Genrefilter = ({ genrelist, setselectedGenre }) => {
  return (
    <select
      className="p-2 mb-4 bg-gray-900 bg-opacity-60 backdrop-blur-md border text-white rounded"
      onChange={(e) => setselectedGenre(e.target.value)}
    >
      <option value="">All Genres</option>
      {genrelist.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
};

export default Genrefilter;
