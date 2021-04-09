import { useContext } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

import UserContext from '../Contexts/UserContext';
import CarouselCard from './CarouselCard'
import style from './Welcome.module.css';

const Welcome = () => {
    const [userToken] = useContext(UserContext);

    if (userToken) {
        return (<Redirect to="/home"/>)
    }

    return (
        <>
            <CarouselCard />

            <Jumbotron className={style.jumbotron}>
                <h1 className={style.heading}>What is our goal</h1>
                <p className={style.text}>
                    With YouShare, we aim to encourage people to be themselves. Share your own stories with the Internet and don't be afraid of being true to yourself. Our simple blog system allows anyone to create engaging posts about their daily life and gather followers who are interested in finding out more.
                </p>
            </Jumbotron>

            <Jumbotron className={style.jumbotron}>
                <h1 className={style.heading}>Shall we begin</h1>
                <p className={style.text}>
                    Create your own account and start your own journey! Are you read?
                </p>
                <p>
                    <Link to="/register">
                        <Button variant="outline-primary">
                            Register Now
                        </Button>
                    </Link>
                </p>
            </Jumbotron>
        </>
    );
}

export default Welcome;