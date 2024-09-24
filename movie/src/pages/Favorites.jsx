import { useContext, useEffect, useState } from 'react';

import MovieSearchContainer from '../components/SearchContainer';
import FavoriteContext from '../context/FavoritesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { API_URL, API_KEY } from '../constants';

function Favorites() {
    const apiUrl = API_URL;
    const apiKey = API_KEY;
    const { favorites } = useContext(FavoriteContext);

    const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetches = favorites.map((id) =>
            fetch(
                `${apiUrl}?apikey=${apiKey}&i=${id}&plot=full`,
            ),
        );

        setError(false);

        Promise.all(fetches)
            .then((results) => {
                return Promise.all(results.map((result) => result.json()));
            })
            .then((movies) => {
                setMovies(movies);
            })
            .finally(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            });
    }, [favorites]);
    if (error) {
        return 'Something went wrong finding the movie. Please try again!';
    } else if (isLoading) {
        return 'Loading...';
    } else if (movies === null || movies.length === 0) {
        return (
            <>
                <Header />
                <h4>You haven't chosen any favorites yet!</h4>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <MovieSearchContainer movies={movies} setMovies={setMovies} />
            <Footer />
        </>
    );
}

export default Favorites;
