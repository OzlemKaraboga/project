import { useState, createContext } from 'react';

export const FavoriteContext = createContext({
    favorites: [],
    toggleFavorite: () => { },
    isFavorite: () => { },
});

export function FavoriteContextProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    const isFavorite = (id) => {
        return favorites.includes(id);
    };

    const toggleFavorite = (id) => {
        const newFavorites = favorites.filter((favorite) => favorite !== id);
        if (newFavorites.length === favorites.length) {
            setFavorites([...newFavorites, id]);
        } else {
            setFavorites(newFavorites);
        }
    };

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
}

export default FavoriteContext;
