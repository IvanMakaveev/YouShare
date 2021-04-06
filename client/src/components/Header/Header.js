import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import * as profileService from '../../services/profileService';
import SearchBar from './../SearchBar'
import UserContext from '../Contexts/UserContext';

import style from './Header.module.css';

const Header = () => {
    const [userToken] = useContext(UserContext);
    const [userData, setUserData] = useState();

    useEffect(() => {
        if(userToken){
            profileService.getCurrentProfileData(userToken)
            .then(res => {
                if (res){
                    setUserData({...res});
                }
            });
        }
        else {
            setUserData();
        }
    }, [userToken])
    
    const renderNavButtons = () => {
        if (userData) {
            return (
                <ul className="navbar-nav">
                    <li className={`nav-item mr-1 ${style.navBtn}`}>
                        <Link className={`text-nowrap nav-link ${style.navBtnLink}`} to={`/profile/${userData.id}`}>Hello {userData.firstName}</Link>
                    </li>
                    <li className={`nav-item mr-1 ${style.navBtn}`}>
                        <Link className={`nav-link ${style.navBtnLink}`} to="/logout">Logout</Link>
                    </li>
                </ul>
            );
        }
        else {
            return (
                <ul className="navbar-nav">
                    <li className={`nav-item mr-1 ${style.navBtn}`}>
                        <Link className={`nav-link ${style.navBtnLink}`} to="/register">Register</Link>
                    </li>
                    <li className={`nav-item mr-1 ${style.navBtn}`}>
                        <Link className={`nav-link ${style.navBtnLink}`} to="/login">Login</Link>
                    </li>
                </ul>
            );
        }
    }


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
                        {renderNavButtons()}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;