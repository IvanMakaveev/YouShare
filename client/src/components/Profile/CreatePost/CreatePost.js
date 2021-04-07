import { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import * as postService from '../../../services/postService';
import * as profileService from '../../../services/profileService';
import UserContext from '../../Contexts/UserContext';

const CreatePost = ({
    history,
    match
}) => {
    const [error, setError] = useState('');
    const [userToken] = useContext(UserContext);
    const profileId = match.params.profileId;

    useEffect(() => {
        profileService.isOwner(profileId, userToken)
            .then(res => {
                if (!res) {
                    history.push(`/profile/${profileId}`)
                }
            })
    }, [])

    const onFormSubmitHandler = (e) => {
        e.preventDefault();

        const { title, text, isPublic, image } = e.target;

        if (title.value.length < 1 || title.value.length > 50) {
            setError('The Title must be between 1 and 50 symbols');
        }
        else if (text.value.length > 750) {
            setError('The Text must be up to 750 symbols');
        }
        else {
            const formData = new FormData();

            formData.append('title', title.value);
            formData.append('text', text.value);
            formData.append('isPublic', isPublic.checked);
            formData.append('image', image.files[0])

            postService.createPost(formData, userToken)
                .then(res => {
                    if (res == "success") {
                        history.push(`/profile/${profileId}`);
                    }
                    else if (res == "unauthorized") {
                        history.push(`/login`);
                    }
                    else if (res != undefined) {
                        const error = Object.values(res).join('\n');
                        setError(error);
                    }
                    else {
                        const error = 'Server timed out';
                        setError(error);
                    }
                });
        }
    }

    return (
        <div className="container mt-3">
            <h1>Create Post</h1>
            <div className="row">
                <Form className="offset-md-2 col-md-8 form" onSubmit={onFormSubmitHandler}>
                    <hr />
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" />
                    </Form.Group>

                    <Form.Group controlId="text">
                        <Form.Label>Text</Form.Label>
                        <Form.Control type="text" as="textarea" name="text" />
                    </Form.Group>

                    <Form.Group controlId="isPublic">
                        <Form.Label className="mr-2">Is Public</Form.Label>
                        <Form.Check defaultChecked type="checkbox" name="isPublic" inline />
                        <Form.Text className="text-muted">
                            Keep it checked if you want users who are not logged in to see your post
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.File name="image" id="image" />
                    </Form.Group>

                    {error
                        ? <p className="error">{error}</p>
                        : null
                    }

                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default CreatePost;