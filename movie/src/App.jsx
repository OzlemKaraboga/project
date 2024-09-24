import './App.css';
import { FavoriteContextProvider } from './context/FavoritesContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Detail } from './pages/Detail';
import Favorites from './pages/Favorites';

function App() {
  return (
    <FavoriteContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:imdbID" element={<Detail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </FavoriteContextProvider>
  );
}

export default App;
