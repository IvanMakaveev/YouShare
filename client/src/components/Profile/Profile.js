import { useContext, useEffect, useState } from 'react';
import { Image, ListGroup, Button } from 'react-bootstrap';
import { NavLink, Switch, Route } from 'react-router-dom';

import * as profileService from '../../services/profileService';
import UserContext from '../Contexts/UserContext';
import CreatePost from './CreatePost';
import ProfilePosts from './ProfilePosts';
import Delete from './Delete';
import Edit from './Edit';
import isAuthenticated from '../../hoc/isAuthenticated';
import style from './Profile.module.css'

const Profile = ({
    match,
    history
}) => {
    const [userData, setUserData] = useState({});
    const [userToken] = useContext(UserContext);

    const updateInfo = () => {
        profileService.getProfileData(match.params.profileId, userToken)
            .then(res => {
                if (res == undefined) {
                    history.push('/error')
                }
                else {
                    const date = new Date(res.birthDay);
                    const user = {
                        about: res.about,
                        birthday: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                        country: res.countryName,
                        name: `${res.firstName} ${res.lastName}`,
                        followers: res.followersCount,
                        gender: res.gender,
                        image: res.imagePath,
                        isOwner: res.isOwner,
                        isFollowing: res.isFollowing,
                    }
                    setUserData(user);
                }
            })
    }

    useEffect(() => {
        updateInfo();
    }, [match.params.profileId, userToken])

    const onFollowProfileHandler = () => {
        profileService.followProfile(match.params.profileId, userToken)
            .then(res => {
                if (res == "success") {

                    setUserData(prev => {
                        if (prev.isFollowing) {
                            return { ...prev, followers: prev.followers - 1, isFollowing: !prev.isFollowing }
                        }
                        else {
                            return { ...prev, followers: prev.followers + 1, isFollowing: !prev.isFollowing }
                        }
                    })
                }
                else if (res == "unauthorized") {
                    history.push("/login")
                }
                else {
                    history.push("/error");
                }
            });
    }

    const onInfoUpdateHandler = () => {
        updateInfo();
    }

    return (
        <div className="row mx-0">
            <div className="offset-md-1 col-md-10 row mt-3">
                <section className={`text-break col-md-4 py-3 align-self-start ${style.profileMenu}`}>
                    <div className={style.imgContainer}>
                        <Image src={userData.image} alt="Profile Image" roundedCircle className={style.img} />
                    </div>

                    <h1 className="my-3">{userData.name}</h1>
                    <p><b>Followers: </b>{userData.followers}</p>
                    <p><b>Country: </b>{userData.country}</p>
                    <p><b>Birthday: </b>{userData.birthday}</p>
                    <p><b>Gender: </b>{userData.gender}</p>
                    <p><b>About: </b>{userData.about ? userData.about : "There is no About info!"}</p>

                    <ListGroup className="overflow-hidden mt-4">
                        <NavLink exact to={`/profile/${match.params.profileId}`} className={`link ${style.link}`} activeClassName="bg-primary text-white">
                            <ListGroup.Item className="bg-transparent">
                                Posts
                            </ListGroup.Item>
                        </NavLink>
                        {
                            userData.isOwner &&
                            <>
                                <NavLink to={`/profile/${match.params.profileId}/post`} className={`link ${style.link}`} activeClassName="bg-primary text-white">
                                    <ListGroup.Item className="bg-transparent">
                                        Create Post
                                    </ListGroup.Item>
                                </NavLink>
                                <NavLink to={`/profile/${match.params.profileId}/edit`} className={`link ${style.link}`} activeClassName="bg-primary text-white">
                                    <ListGroup.Item className="bg-transparent">
                                        Edit Profile
                                    </ListGroup.Item>
                                </NavLink>
                                <NavLink to={`/profile/${match.params.profileId}/delete`} className={`link ${style.link}`} activeClassName="bg-danger text-white">
                                    <ListGroup.Item className="bg-transparent">
                                        Delete Profile
                                    </ListGroup.Item>
                                </NavLink>
                            </>
                        }
                    </ListGroup>
                    {
                        !userData.isOwner &&
                        <Button
                            variant={userData.isFollowing ? 'primary' : 'outline-primary'}
                            onClick={onFollowProfileHandler}
                            className="mt-1"
                            block
                        >
                            {userData.isFollowing ? 'Unfollow' : 'Follow'}
                        </Button>
                    }
                </section>
                <section className="col-md-8">
                    <Switch>
                        <Route exact path="/profile/:profileId" component={ProfilePosts} />
                        <Route path="/profile/:profileId/post" component={isAuthenticated(CreatePost)} />
                        <Route path="/profile/:profileId/edit" render={(props) => { return <Edit {...props} didUpdate={onInfoUpdateHandler} /> }} />
                        <Route path="/profile/:profileId/delete" component={isAuthenticated(Delete)} />
                    </Switch>
                </section>
            </div>
        </div>
    );
}

export default Profile;