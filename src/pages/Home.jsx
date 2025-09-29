import React, { useEffect, useState } from 'react';
import Moviecard from '../components/Moviecard';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let url = `https://api.themoviedb.org/3/movie/popular?page=${pages}&api_key=40ad78ff7afeb912ba71945c747efb68`;

    if (search.trim() !== "") {
      url = `https://api.themoviedb.org/3/search/movie?query=${search}&page=${pages}&api_key=40ad78ff7afeb912ba71945c747efb68`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch((err) => console.error(err));
  }, [pages, search]);

  return (
    <div className="p-4 pt-20">
      <input
        type="text"
        placeholder="Search Movies..."
        className="p-2 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-900 bg-opacity-60 backdrop-blur-md text-white fixed top-16 left-1/2 transform -translate-x-1/2 z-10"
        onChange={(e) => {
          setPages(1); // reset to page 1 when starting a new search
          setSearch(e.target.value);
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-20">
        {movies.length > 0 ? (
          movies.map((movie) => <Moviecard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-white">No movies found.</p>
        )}
      </div>

      <div className="flex justify-between mt-5">
        <button
          disabled={pages === 1}
          className="p-2 bg-gray-700 text-white rounded disabled:opacity-50"
          onClick={() => setPages((prev) => prev - 1)}
        >
          PREV
        </button>

        <button
          className="p-2 bg-gray-700 text-white rounded"
          onClick={() => setPages((prev) => prev + 1)}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Home;
