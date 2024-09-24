import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Link to={'/'}>
                <img src={logo} alt="logo" />
            </Link>
            <p>Discover... Watch... Enjoy...</p>

            <div className="header-links">
                <Link to={'/favorites'}>
                    Favorites
                </Link>

                <Link to={'/'}>Home</Link>
            </div>

        </header>
    );
};

export default Header;