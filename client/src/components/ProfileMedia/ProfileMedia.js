import { Media, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import style from './ProfileMedia.module.css';

const ProfileMedia = ({
    profile
}) => {
    return (
        <Media className="text-left border rounded p-2">
            <div className={style.imgContainer}>
                <img
                    className={`d-block mr-3 ${style.img} rounded-circle`}
                    src={`${profile.imagePath}`}
                    alt="Profile Picture"
                />
            </div>
            <Media.Body className="row mx-0 align-self-center justify-content-between">
                <big>{profile.name}</big>
                <Link to={`/profile/${profile.id}`} className="link">
                    <Button varitant="primary" size="sm">Go to profile</Button>
                </Link>
            </Media.Body>
        </Media>
    );
}

export default ProfileMedia;