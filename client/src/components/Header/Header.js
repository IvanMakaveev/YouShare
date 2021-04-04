import { Link } from 'react-router-dom'

import style from './Header.module.css';
import SearchBar from './../SearchBar'

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-md bg-white border-bottom box-shadow">
                <div className="container">
                    <Link className={`navbar-brand ${style.brand}`} to="/">
                        <span className={style.brandPrimary}>You</span><span className={style.brandSecondary}>Share</span>
                    </Link>
                    <div className="navbar-collapse collapse d-md-inline-flex flex-md-row">
                        <ul className="navbar-nav">
                            <li className={`nav-item mr-1 ${style.navBtn}`}>
                                <Link className={`nav-link ${style.navBtnLink}`} to="/privacy">Privacy</Link>
                            </li>
                        </ul>
                        <SearchBar />
                        <ul className="navbar-nav">
                            <li className={`nav-item mr-1 ${style.navBtn}`}>
                                <Link className={`nav-link ${style.navBtnLink}`} to="/register">Register</Link>
                            </li>
                            <li className={`nav-item mr-1 ${style.navBtn}`}>
                                <Link className={`nav-link ${style.navBtnLink}`} to="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;