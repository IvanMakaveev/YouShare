import { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import * as userService from '../../services/userService'; 
import style from './Register.module.css';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: [],
            error: "",
        };

        this.onFormSubmitHandler = this.onFormSubmitHandler.bind(this);
    }

    componentDidMount() {
        userService.getRegisteredCountries()
            .then(countries => this.setState({countries}))
    }

    onFormSubmitHandler(e) {
        e.preventDefault();

        const { username, email, firstName, lastName, birthDate, password, confirmPassword, country, gender } = e.target;
        let error = "";

        if(username.value.length < 5 || username.value.length > 50){
            error = "The Username must be between 5 and 50 symbols";
            this.setState({error});
        }
        else if(firstName.value.length < 2 || firstName.value.length > 50){
            error = "The First Name must be between 2 and 50 symbols";
            this.setState({error});
        }
        else if(lastName.value.length < 2 || lastName.value.length > 50){
            error = "The Last Name must be between 2 and 50 symbols";
            this.setState({error});
        }
        else if(birthDate.value == '' || new Date(birthDate.value) < new Date(1899, 12, 31) || new Date(birthDate.value) > Date.now()){
            error = "The Birth Date must be after the 1900s and before now";
            this.setState({error});
        }
        else if(password.value.length < 6 || password.value.length > 100){
            error = "The Password must be between 6 and 100 symbols";
            this.setState({error});
        }
        else if(password.value != confirmPassword.value){
            error = "The two Passwords must match";
            this.setState({error});
        }
        else{
            const newUser = {
                username: username.value, 
                email: email.value, 
                firstName: firstName.value, 
                lastName: lastName.value, 
                birthDate: birthDate.value, 
                password: password.value, 
                confirmPassword: confirmPassword.value, 
                country: country.value, 
                gender: gender.value
            }

            userService.registerUser(newUser)
                .then(res => {
                    if(res == undefined){
                        let error = 'Server timed out';
                        this.setState({error});
                    }
                    else if(typeof(res) != "string"){
                        let error = Object.values(res).join('\n');
                        this.setState({error});
                    }
                    else{
                        localStorage.setItem("token", res)
                        this.props.history.push("/home");
                    }
                });
        }
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
                            <Form.Control type="text" name="username"/>
                            <Form.Text className="text-muted">
                                You will use this username to log into your account.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email"/>
                        </Form.Group>

                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstName"/>
                        </Form.Group>

                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName"/>
                        </Form.Group>

                        <Form.Group controlId="birthDate">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control type="date" name="birthDate"/>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password"/>
                        </Form.Group>

                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirmPassword"/>
                        </Form.Group>

                        <Form.Group controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control as="select" name="country">
                                {
                                    this.state.countries.map(x => 
                                        <option key={x.key} value={x.key}>{x.value}</option>
                                    )
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="country">
                            <Form.Label className="mr-2">Gender</Form.Label>
                            <Form.Check
                                inline
                                type='radio'
                                id='male'
                                name='gender'
                                label='Male'
                                value='Male'
                                defaultChecked
                            />
                            <Form.Check
                                inline
                                type='radio'
                                id='female'
                                name='gender'
                                label='Female'
                                value='Female'
                            />
                            <Form.Check
                                inline
                                type='radio'
                                id='other'
                                name='gender'
                                label='Other'
                                value='Other'
                            />
                        </Form.Group>

                        {this.state.error
                            ? <p className={style.error}>{this.state.error}</p>
                            : null
                        }

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