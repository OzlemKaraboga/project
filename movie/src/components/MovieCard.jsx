import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteContext from '../context/FavoritesContext';
import heartEmpty from '../assets/heart-regular.svg';
import heartSolid from '../assets/heart-solid.svg';

const MovieCard = ({ movie }) => {
    const { Poster, Title, imdbID } = movie;

    if (Poster === 'N/A') {
        return null;
    }

    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useContext(FavoriteContext);
    const isFav = isFavorite(imdbID);

    const handleClick = async () => {
        navigate(`/movie/${imdbID}`);
    };

    return (
        <div className="movie-card">
            <img
                className="movie-img"
                src={Poster}
                alt={Title}
            />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <p className="see-more" onClick={handleClick}>
                    See more
                </p>
                <p className="favorite-icon" onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(imdbID);
                }}>
                    <img className="heart-icon" src={isFav ? heartSolid : heartEmpty} alt={isFav ? "Remove from favorites" : "Add to favorites"} />
                </p>
            </div>
        </div>
    );
};

export default MovieCard;