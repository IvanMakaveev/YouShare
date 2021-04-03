import { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import style from './Register.module.css';

class Register extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    onFormSubmitHandler(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="container mt-3">
                <h1>Register</h1>
                <div className="row">
                    <Form className={`offset-md-2 col-md-8 ${style.form}`} onSubmit={this.onFormSubmitHandler}>
                        <hr />
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" />
                            <Form.Text className="text-muted">
                                You will use this username to log into your account.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" />
                        </Form.Group>

                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group controlId="birthDate">
                            <Form.Label>Birth date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>

                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" />
                        </Form.Group>

                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" />
                        </Form.Group>

                        <Form.Group controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control as="select">
                                <option>####</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="country">
                            <Form.Label className="mr-2">Gender</Form.Label>
                            <Form.Check
                                inline
                                type='radio'
                                id='gender1'
                                name='gender'
                                label='first'
                            />
                            <Form.Check
                                inline
                                type='radio'
                                id='gender2'
                                name='gender'
                                label='second'
                            />
                            <Form.Check
                                inline
                                type='radio'
                                id='gender3'
                                name='gender'
                                label='third'
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Register;