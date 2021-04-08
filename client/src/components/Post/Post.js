import { useContext, useState } from 'react';
import { Card, Button, Image, Collapse } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import * as postService from '../../services/postService';
import * as commentService from '../../services/commentService';
import Comment from './Comment';
import UserContext from '../Contexts/UserContext';

import style from './Post.module.css';

const Post = ({
    postObject,
    onDeleteHandler
}) => {
    const [post, setPost] = useState(postObject);
    const [showComments, setShowComments] = useState(false);
    const [userToken] = useContext(UserContext);
    const history = useHistory();

    const onLikePostHandler = () => {
        postService.likePost(post.id, userToken)
            .then(res => {
                if (res == 'success') {
                    if (post.isLiked) {
                        setPost(prev => ({ ...prev, likes: prev.likes - 1, isLiked: !prev.isLiked }))
                    }
                    else {
                        setPost(prev => ({ ...prev, likes: prev.likes + 1, isLiked: !prev.isLiked }))
                    }
                }
                else if (res == "unauthorized") {
                    history.push("/login")
                }
            })
    }

    const onCreateCommentSubmitHandler = (e) => {
        e.preventDefault();
        const { comment } = e.target;
        if (comment.value.length > 0 || comment.value.length <= 100) {
            commentService.createComment(post.id, comment.value, userToken)
                .then(res => {
                    console.log(res)
                    if (typeof (res) == 'object') {
                        const comments = post.comments;
                        comments.push(res)
                        setPost(prev => ({ ...prev, comments: comments }))
                    }
                    else if (res == "unauthorized") {
                        history.push("/login")
                    }
                })
        }
    }

    const onDeleteClickHandler = () =>{
        postService.deletePost(post.id, userToken)
            .then(res => {
                if(res == 'success'){
                    onDeleteHandler(post.id);
                }
                else if (res == 'unathorized'){
                    history.push("/login")
                }
            })
    }

    const onShowCommentsHandler = () => {
        setShowComments(prev => !prev);
    }

    return (
        <Card className="text-left mb-2">
            {post.isOwner &&
                <Card.Header>
                    <Button variant="danger" onClick={onDeleteClickHandler}>Delete</Button>
                </Card.Header>
            }
            <Card.Body>
                <Card.Title className="row mx-0 flex-nowrap mb-0">
                    <div className={style.imgContainer}>
                        <Image src={post.profileImage} alt="Profile Image" roundedCircle className={style.img} />
                    </div>
                    <div className="align-self-center">
                        <Link className='link' to={`/profile/${post.profileId}`}>{post.profileName}</Link> - {post.title}
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
                    <Button variant="primary" className="mr-2" onClick={onShowCommentsHandler}>Show</Button>
                    <form className="row mx-0 flex-grow-1" onSubmit={onCreateCommentSubmitHandler}>
                        <Button variant="primary" type="submit">Comment</Button>
                        <input type="text" name="comment" placeholder="Comment... (100 symbols max)" className="form-control w-auto flex-grow-1" />
                    </form>
                </div>
            </Card.Footer>
            <Collapse in={showComments}>
                <div>
                    {post.comments.map(x =>
                        <Comment key={x.id} commentObject={x} />
                    )}
                </div>
            </Collapse>
        </Card>
    );
}

export default Post;