import {Link} from 'react-router-dom'

import style from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={`${style.footer} text-muted border-top`}>
            <div className="container">
                &copy; {new Date().getFullYear()} - YouShare - <Link to="/privacy">Privacy</Link>
            </div>
        </footer>
    );
}

export default Footer;