import React, { useState, useContext } from 'react';
import Genrefilter from '../components/Genrefilter';
import Moviecard from '../components/Moviecard';
import { WatchListContext } from '../context/Watchlistcontext';

const Watchlist = () => {
    const { watchlist, genrelist } = useContext(WatchListContext);
    const [search, setSearch] = useState('');
    const [selectedGenre, setselectedGenre] = useState('');

    const filteredMovies = watchlist
        .filter(
            (movie) =>
                movie.title.toLowerCase().includes(search.toLowerCase()) ||
                movie.overview.toLowerCase().includes(search.toLowerCase())
        )
        .filter((movie) => {
            return !selectedGenre || movie.genre_ids.includes(Number(selectedGenre));
        });

    return (
        <div className="p-4 pt-16">
            <input
                type="text"
                placeholder="Search WatchList . . . "
                className="p-2 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-900  
                            bg-opacity-60 backdrop-blur-md 
                            text-white fixed top-16 left-1/2 transform -translate-x-1/2 z-10"
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className='mt-16 flex justify-center'>
                <Genrefilter genrelist={genrelist} setselectedGenre={setselectedGenre}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-20">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => <Moviecard key={movie.id} movie={movie} />)
                ) : (
                    <p className="text-white">No movies found.</p>
                )}
            </div>
        </div>
    );
};

export default Watchlist;
