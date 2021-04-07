import { Redirect } from 'react-router';
import { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import UserContext from '../Contexts/UserContext';
import * as userService from '../../services/userService';

const Login = ({
    history
}) => {
    const [error, setError] = useState('');
    const [userToken, setUserToken] = useContext(UserContext);

    const onFormSubmitHandler = (e) => {
        e.preventDefault();

        const { username, password } = e.target;

        if (username.value.length < 1) {
            setError('The Username must have a value');
        }
        else if (password.value.length < 1) {
            setError('The Password must have a value');
        }
        else {
            let userData = {
                username: username.value,
                password: password.value
            }

            userService.loginUser(userData)
                .then(res => {
                    if (res == undefined) {
                        let error = 'Server timed out';
                        setError(error);
                    }
                    else if (typeof (res) != "string") {
                        let error = Object.values(res).join('\n');
                        setError(error);
                    }
                    else {
                        setUserToken(res);
                        localStorage.setItem("token", res)
                        history.push("/home");
                    }
                });
        }
    }

    if (userToken) {
        return <Redirect to="/home" />
    }

    return (
        <div className="container mt-3">
            <h1>Login</h1>
            <div className="row">
                <Form className="offset-md-2 col-md-8 form" onSubmit={onFormSubmitHandler}>
                    <hr />
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" />
                    </Form.Group>

                    {error
                        ? <p className="error">{error}</p>
                        : null
                    }

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;