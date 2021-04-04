import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import * as userService from '../../services/userService';
import style from './Login.module.css';

const Login = ({
    history
}) => {
    const [error, setError] = useState('');

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
                    if(typeof(res) != "string"){
                        let error = Object.values(res).join('\n');
                        setError(error);
                    }
                    else{
                        localStorage.setItem("token", res)
                        history.push("/");
                    }
                });
        }
    }

    return (
        <div className="container mt-3">
            <h1>Login</h1>
            <div className="row">
                <Form className={`offset-md-2 col-md-8 ${style.form}`} onSubmit={onFormSubmitHandler}>
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
                        ? <p className={style.error}>{error}</p>
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