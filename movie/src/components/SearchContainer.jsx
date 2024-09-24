import { useState } from 'react';
import MovieCard from './MovieCard';
import { useFetch } from '../hooks/useFetch';
import { API_URL, API_KEY } from '../constants';

const MovieSearchContainer = (props) => {
    const { movies, setMovies } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const currentYear = new Date().getFullYear();

    const apiUrl = API_URL;
    const apiKey = API_KEY;

    const [isLoading, error, getJson] = useFetch(
        `${apiUrl}?apikey=${apiKey}&s=${searchTerm}${selectedYear ? `&y=${selectedYear}` : ''}`,
        setMovies
    );

    const handleSearch = () => {
        getJson();
    };

    const years = [];
    let year = currentYear;
    while (year > 1990) {
        years.push(year);
        year--;
    }

    return (
        <div className="container" id="container">
            <div className="search-bar" id="search-bar">
                <input
                    className="search-input"
                    id="search-input"
                    type="text"
                    placeholder="Search with title"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select className="selectYear" id="selectYear" onChange={(e) => setSelectedYear(e.target.value)}>
                    <option value="">Select Year</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <button className="search-button" id="search-button" onClick={handleSearch}>
                    Search
                </button>
            </div>
            <div className="results" style={{ color: 'white' }}>
                {movies && movies.length > 0 ? (
                    movies.map((movie) => {
                        return <MovieCard key={movie.imdbID} movie={movie} />;
                    })
                ) : (
                    <p>No movies found</p>
                )}
            </div>
        </div>
    );
};

export default MovieSearchContainer;