import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import defaultImage from '../assets/default-card-image.png';
import { API_URL, API_KEY } from '../constants';
import Header from '../components/Header';
import Footer from '../components/Footer';


export const Detail = () => {
    const apiUrl = API_URL;
    const apiKey = API_KEY;
    const { imdbID } = useParams();
    const navigate = useNavigate();

    const url = `${apiUrl}?apikey=${apiKey}&i=${imdbID}`;
    const [movieInfo, setMovieInfo] = useState(null);
    const [isLoading, error, getJson] = useFetch(url, setMovieInfo);

    useEffect(() => {
        getJson();
    }, []);

    const handleCloseDetail = () => {
        navigate('/');
    };

    return (
        <>
            <Header />
            <div className="movie-info-container">
                <button onClick={handleCloseDetail} className="close-button">X</button>

                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>There was an error</p>
                ) : (
                    <div className="movie-detail">
                        <h1>{movieInfo && movieInfo.Title}</h1>
                        <div className='movie-container'>
                            <img className='movie-info-img'
                                src={
                                    movieInfo && movieInfo.Poster !== 'N/A'
                                        ? movieInfo.Poster
                                        : defaultImage
                                }
                                alt={movieInfo && movieInfo.Title}

                            />
                            <div className="movie-info-content">
                                <p>Year: {movieInfo && movieInfo.Year}</p>
                                <p>Language: {movieInfo && movieInfo.Language}</p>
                                <p>Duration: {movieInfo && movieInfo.Runtime}</p>
                                <p>Imdb Rating: {movieInfo && movieInfo.imdbRating}</p>
                                <p>Director: {movieInfo && movieInfo.Director}</p>
                                <p>Writer: {movieInfo && movieInfo.Writer}</p>
                                <p>Actors: {movieInfo && movieInfo.Actors}</p>
                                <p>Description: {movieInfo && movieInfo.Plot}</p>
                            </div>
                        </div>
                    </div>

                )}
            </div>
            <Footer />
        </>
    );
};

export default Detail;