import { useEffect, useState } from 'react';
import { Image, ListGroup, Button } from 'react-bootstrap';
import { NavLink, Switch, Route } from 'react-router-dom';

import * as profileService from '../../services/profileService';
import Edit from './Edit';
import style from './Profile.module.css'

const Profile = ({
    match,
    history
}) => {
    const [name, setName] = useState("");
    const [followers, setFollowers] = useState(0);
    const [birthday, setBirthday] = useState("");
    const [country, setCountry] = useState("");
    const [gender, setGender] = useState("");
    const [about, setAbout] = useState("");
    const [image, setImage] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const [isFollowing, setFollowing] = useState(false);

    const updateInfo = () => {
        profileService.getProfileData(match.params.profileId)
        .then(res => {
            if (res == undefined) {
                history.push('/error')
            }
            else {
                var date = new Date(res.birthDay);

                setAbout(res.about);
                setBirthday(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
                setCountry(res.countryName);
                setName(`${res.firstName} ${res.lastName}`);
                setFollowers(res.followersCount);
                setGender(res.gender);
                setImage(res.imagePath);
                setIsOwner(res.isOwner);
                setFollowing(res.isFollowing);
            }
        })
    }

    useEffect(() => {
        updateInfo();
    }, [match.params.profileId])

    const onFollowProfileHandler = () => {
        profileService.followProfile(match.params.profileId)
            .then(res => {
                if (res == "success") {
                    setFollowing(prev => !prev)
                }
                else if (res == "unauthorized") {
                    history.push("/login")
                }
                else{
                    history.push("/error");
                }
            });
    }

    const onInfoUpdateHandler = () => {
        updateInfo();
    }

    return (
        <div className="row">
            <div className="offset-md-1 col-md-10 row mt-3">
                <section className={`text-break col-md-4 py-3 ${style.profileMenu}`}>
                    <div className={style.imgContainer}>
                        <Image src={image} alt="Profile Image" roundedCircle className={style.img} />
                    </div>

                    <h1 className="my-3">{name}</h1>
                    <p><b>Followers: </b>{followers}</p>
                    <p><b>Country: </b>{country}</p>
                    <p><b>Birthday: </b>{birthday}</p>
                    <p><b>Gender: </b>{gender}</p>
                    <p><b>About: </b>{about ? about : "There is no About info!"}</p>

                    <ListGroup className="overflow-hidden mt-4">
                        <NavLink exact to={`/profile/${match.params.profileId}`} className={style.link} activeClassName="bg-primary text-white">
                            <ListGroup.Item className="bg-transparent">
                                Posts
                            </ListGroup.Item>
                        </NavLink>
                        {
                            isOwner &&
                            <>
                                <NavLink to={`/profile/${match.params.profileId}/post`} className={style.link} activeClassName="bg-primary text-white">
                                    <ListGroup.Item className="bg-transparent">
                                        Create Post
                                        </ListGroup.Item>
                                </NavLink>
                                <NavLink to={`/profile/${match.params.profileId}/edit`} className={style.link} activeClassName="bg-primary text-white">
                                    <ListGroup.Item className="bg-transparent">
                                        Edit Profile
                                        </ListGroup.Item>
                                </NavLink>
                                <NavLink to={`/profile/${match.params.profileId}/delete`} className={style.link} activeClassName="bg-danger text-white">
                                    <ListGroup.Item className="bg-transparent">
                                        Delete Profile
                                        </ListGroup.Item>
                                </NavLink>
                            </>
                        }
                    </ListGroup>
                    {
                        !isOwner &&
                        <Button
                            variant={isFollowing ? 'primary' : 'outline-primary'}
                            onClick={onFollowProfileHandler}
                            className="mt-1"
                            block
                        >
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </Button>
                    }
                </section>
                <section className="col-md-8">
                    <Switch>
                        <Route exact path="/profile/:profileId" render={() => { return (<h1>asd1</h1>) }} />
                        <Route path="/profile/:profileId/post" render={() => { return (<h1>asd2</h1>) }} />
                        <Route path="/profile/:profileId/edit" render={(props) => { return <Edit {...props} didUpdate={onInfoUpdateHandler}/>}} />
                        <Route path="/profile/:profileId/delete" render={() => { return (<h1>asd4</h1>) }} />
                    </Switch>
                </section>
            </div>
        </div>
    );
}

export default Profile;