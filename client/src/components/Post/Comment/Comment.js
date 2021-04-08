import { Link, useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

import * as commentService from '../../../services/commentService';
import { useContext, useState } from 'react';
import UserContext from '../../Contexts/UserContext';

const Comment = ({
    commentObject
}) => {
    const [comment, setComment] = useState(commentObject);
    const [userToken] = useContext(UserContext);
    const history = useHistory();

    const onLikeCommentHandler = () => {
        commentService.likeComment(comment.id, userToken)
            .then(res => {
                if (res == 'success') {
                    if (comment.isLiked) {
                        setComment(prev => ({ ...prev, likes: prev.likes - 1, isLiked: !prev.isLiked }))
                    }
                    else {
                        setComment(prev => ({ ...prev, likes: prev.likes + 1, isLiked: !prev.isLiked }))
                    }
                }
                else if (res == "unauthorized") {
                    history.push("/login")
                }
            })
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title className="row pl-3 flex-nowrap mb-0">
                    <div className="align-self-center">
                        <Link className='link' to={`/profile/${comment.profileId}`}>{comment.profileFirstName} {comment.profileLastName}</Link>
                        <p><small className="text-muted">{comment.createdOnString}</small></p>
                    </div>
                </Card.Title>
                <Card.Text>
                    {comment.text}
                </Card.Text>
                <Button
                    variant={comment.isLiked ? 'primary' : 'outline-primary'}
                    onClick={onLikeCommentHandler}
                >
                    {comment.isLiked ? 'Liked' : 'Like'} <i className="fas fa-heart"></i>
                </Button>
                <span className="ml-2">{comment.likes}</span>
            </Card.Body>
        </Card>
    );
}

export default Comment;