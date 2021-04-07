import { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import * as profileService from '../../../services/profileService';
import * as userService from '../../../services/userService';
import UserContext from '../../Contexts/UserContext';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            birthDate: "",
            about: "",
            country: "",
            gender: "",
            countries: [],
            error: "",
        };

        this.onFormSubmitHandler = this.onFormSubmitHandler.bind(this);
        this.onAboutChangeHandler = this.onAboutChangeHandler.bind(this);
    }

    componentDidMount() {
        profileService.getProfileData(this.props.match.params.profileId, this.context[0])
            .then(res => {
                if (res == undefined) {
                    this.props.history.push('/error')
                }
                else if (res.isOwner == false) {
                    this.props.history.push(`/profile/${this.props.match.params.profileId}`)
                }
                else {
                    const date = new Date(res.birthDay);
                    const user = {
                        firstName: res.firstName,
                        lastName: res.lastName,
                        birthDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                        about: res.about,
                        country: res.countryName,
                        gender: res.gender,
                    }

                    this.setState({ ...user });
                }
            });

        userService.getRegisteredCountries()
            .then(countries => this.setState({ countries }))
    }

    onFormSubmitHandler(e) {
        e.preventDefault();

        const { firstName, lastName, birthDate, about, country, gender, image } = e.target;
        let error = "";

        if (firstName.value.length < 2 || firstName.value.length > 50) {
            error = "The First Name must be between 2 and 50 symbols";
            this.setState({ error });
        }
        else if (lastName.value.length < 2 || lastName.value.length > 50) {
            error = "The Last Name must be between 2 and 50 symbols";
            this.setState({ error });
        }
        else if (birthDate.value == '' || new Date(birthDate.value) < new Date(1899, 12, 31) || new Date(birthDate.value) > Date.now()) {
            error = "The Birth Date must be after the 1900s and before now";
            this.setState({ error });
        }
        else if (about.value.length > 250) {
            error = "The About info must be up to 250 symbols";
            this.setState({ error });
        }
        else {
            const formData = new FormData();

            formData.append('firstName', firstName.value);
            formData.append('lastName', lastName.value);
            formData.append('birthDate', birthDate.value);
            formData.append('about', about.value);
            formData.append('country', country.value);
            formData.append('gender', gender.value);
            formData.append('image', image.files[0])

            profileService.editProfile(this.props.match.params.profileId, formData, this.context[0])
                .then(res => {
                    if (res == "success") {
                        this.props.didUpdate();
                        this.props.history.push(`/profile/${this.props.match.params.profileId}`);
                    }
                    else if (res == "unauthorized") {
                        this.props.history.push(`/login`);
                    }
                    else if (res != undefined) {
                        const error = Object.values(res).join('\n');
                        this.setState({ error });
                    }
                    else {
                        const error = 'Server timed out';
                        this.setState({ error });
                    }
                });
        }

    }

    onAboutChangeHandler(e) {
        const value = e.target.value;
        let error = '';

        this.setState({ about: value })

        if (value.length > 250) {
            error = 'The About info must be up to 250 symbols';
            this.setState({ error });
        }
        else {
            this.setState({ error });
        }
    }

    render() {
        return (
            <>
                <h1>Edit</h1>
                <div className="row">
                    <Form className="offset-md-2 col-md-8 form" encType="multipart/form-data" onSubmit={this.onFormSubmitHandler}>
                        <hr />
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstName" defaultValue={this.state.firstName} />
                        </Form.Group>

                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" defaultValue={this.state.lastName} />
                        </Form.Group>

                        <Form.Group controlId="birthDate">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control type="date" name="birthDate" defaultValue={this.state.birthDate} />
                        </Form.Group>

                        <Form.Group controlId="about">
                            <Form.Label>About</Form.Label>
                            <Form.Control type="text" as="textarea" name="about" value={this.state.about} onChange={this.onAboutChangeHandler} />
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.File name="image" id="image" />
                        </Form.Group>

                        <Form.Group controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control as="select" name="country">
                                {
                                    this.state.countries.map(x =>
                                        <option key={x.key} value={x.key} selected={x.value == this.state.country}>{x.value}</option>
                                    )
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="gender">
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
                            ? <p className="error">{this.state.error}</p>
                            : null
                        }

                        <Button variant="primary" type="submit">
                            Edit
                        </Button>
                    </Form>
                </div>
            </>
        );
    }
}

Edit.contextType = UserContext;

export default Edit;