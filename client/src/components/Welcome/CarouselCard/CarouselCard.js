import { Carousel } from 'react-bootstrap';

import style from './CarouselCard.module.css';

const CarouselCard = () => {
    return (
        <Carousel fade>
            <Carousel.Item>
                <img
                    className={`d-block w-100 ${style.image} ${style.centerImage}`}
                    src="welcome1.jpg"
                    alt="First slide"
                />
                <Carousel.Caption className={style.caption}>
                    <h1 className={style.mainText}>Welcome to <span className={style.brandPrimary}>You</span><span className={style.brandSecondary}>Share</span></h1>
                    <h2>Toghether we are better!</h2>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={`d-block w-100 ${style.image} ${style.centerImage}`}
                    src="welcome2.jpeg"
                    alt="Second slide"
                />
                <Carousel.Caption className={style.caption}>
                    <h1 className={style.mainText}>Post your stories for the world to hear</h1>
                    <h2>Don't be afraid!</h2>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={`d-block w-100 ${style.image} ${style.topImage}`}
                    src="welcome3.jpeg"
                    alt="Second slide"
                />
                <Carousel.Caption className={style.caption}>
                    <h1 className={style.mainText}>Comment on other people's experiences</h1>
                    <h2>Discover others like you!</h2>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselCard;