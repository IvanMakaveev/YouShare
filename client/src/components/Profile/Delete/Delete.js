import { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

import * as profileService from '../../../services/profileService';
import UserContext from '../../Contexts/UserContext';

const Delete = ({
    match,
    history
}) => {
    const [userToken, setUserToken] = useContext(UserContext);
    const profileId = match.params.profileId;

    useEffect(() => {
        profileService.isOwner(profileId, userToken)
            .then(res => {
                if (!res) {
                    history.push(`/profile/${profileId}`)
                }
            })
    }, [])

    const onDeleteProfileHandler = () => {
        profileService.deleteProfile(profileId, userToken)
            .then(res => {
                if (res == 'success') {
                    setUserToken(null);
                    localStorage.removeItem('token');
                    history.push(`/`);
                }
                else if (res == 'error') {
                    history.push(`/profile/${profileId}`);
                }
            })
    }

    return (
        <section className="offset-md-2 col-md-8">
            <h1>Are you sure you want to delete your profile?</h1>
            <div className="row justify-content-around">
                <Button variant="danger" size="lg" onClick={onDeleteProfileHandler}>Delete</Button>
                <Link to={`/profile/${profileId}`}>
                    <Button variant="primary" size="lg">Cancel</Button>
                </Link>
            </div>
        </section>
    );
}

export default Delete;