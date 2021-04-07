import { useContext, useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import * as postService from '../../services/postService';
import UserContext from '../Contexts/UserContext';

import style from './Post.module.css';

const Post = ({
    postObject
}) => {
    const [post, setPost] = useState(postObject);
    const [userToken] = useContext(UserContext);
    const history = useHistory();

    const onLikePostHandler = () => {
        postService.likePost(post.id, userToken)
            .then(res => {
                if(res == 'success'){
                    if (post.isLiked) {
                        setPost(prev => ({ ...post, likes: post.likes - 1, isLiked: !post.isLiked }))
                    }
                    else {
                        setPost(prev => ({ ...post, likes: post.likes + 1, isLiked: !post.isLiked }))
                    }
                }
                else if (res == "unauthorized") {
                    history.push("/login")
                }
                else {
                    history.push("/error");
                }
            })
    }

    return (
        <Card className="text-left">
            {post.isOwner &&
                <Card.Header>
                    <Button variant="danger">Delete</Button>
                </Card.Header>
            }
            <Card.Body>
                <Card.Title className="row pl-3 flex-nowrap mb-0">
                    <div className={style.imgContainer}>
                        <Image src={post.profileImage} alt="Profile Image" roundedCircle className={style.img} />
                    </div>
                    <div className="align-self-center">
                        <Link className={style.link} to={`/profile/${post.profileId}`}>{post.profileName}</Link> - {post.title}
                        <p><small className="text-muted">{post.createdOnString}</small></p>
                    </div>
                </Card.Title>
                <Card.Text>
                    {post.text}
                </Card.Text>
            </Card.Body>
            <Card.Img variant="center" src={post.imagePath} />
            <Card.Footer className="row mx-0 justify-content-between">
                <div className="mt-1 mr-3">
                    <Button
                        variant={post.isLiked ? 'primary' : 'outline-primary'}
                        onClick={onLikePostHandler}
                    >
                        {post.isLiked ? 'Liked' : 'Like'} <i className="fas fa-heart"></i>
                    </Button>
                    <span className="ml-2">{post.likes}</span>
                </div>
                <div className="row mx-0 mt-1 justify-content-right flex-grow-1">
                    <Button variant="primary" className="mr-2">Show</Button>
                    <Button variant="primary">Comment</Button>
                    <input type="text" name="comment" placeholder="Comment... (100 symbols max)" className="form-control w-auto flex-grow-1" />
                </div>
            </Card.Footer>
        </Card>
    );
}

export default Post;