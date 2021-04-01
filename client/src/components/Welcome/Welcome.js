import { Carousel } from 'react-bootstrap';

import style from './Welcome.module.css';

const Welcome = () => {
    return (
        <Carousel fade>
            <Carousel.Item>
                <img
                    className={`d-block w-100 ${style.blur}`}
                    src="welcome1.jpg"
                    alt="First slide"
                />
                <Carousel.Caption className={style.caption}>
                    <h1>Welcome to <span className={style.brandPrimary}>You</span><span className={style.brandSecondary}>Share</span></h1>
                    <h4>Toghether we are stronger!</h4>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Welcome;