import React, { useState } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import './Register.css';
import PATHS from './paths';
import { Confirmation } from './RegistrationConfirmation';

const Input = ({label, value, onChange, ...props}) => (
    <label>
        {label}

        <input
            className="input"
            value={value}
            onChange={onChange}
            {...props} />

    </label>
);

export function BusinessAddress({values, handleChange}) {
    return (
        <div className="business-address">
            <h3>
                Business Address
            </h3>

            <br />

            <div className="business-fields">
                <Input
                    onChange={handleChange}
                    value={values.address1}
                    name="address1"
                    pattern="[a-zA-Z0-9]{10,}"
                    placeholder="Address 1"
                    required
                />

                <Input
                    onChange={handleChange}
                    value={values.address2}
                    name="address2"
                    placeholder="Address 2"
                    required
                />

                <Input
                    onChange={handleChange}
                    value={values.state}
                    pattern="[a-zA-Z]{2,}"
                    name="state"
                    placeholder="State"
                    required
                />

                <Input
                    onChange={handleChange}
                    value={values.zipCode}
                    pattern="[0-9]{5}"
                    name="zipCode"
                    placeholder="Zip Code"
                    required
                />

            </div>
        </div>
    );
}

const initialValues = {
    'firstName': '',
    'lastName': '',
    'npiNumber': '',

    'address1': '',
    'address2': '',
    'state': '',
    'zipCode': '',

    'phone': '',
    'email': ''
};

export function Register() {

    const [values, setValue] = useState(initialValues);

    function handleChange(event) {
        const { target } = event;

        setValue(state => ({
            ...state,
            [target.name]: target.value
        }));
    }

    /**
     * TODO create validationPatterns that maps field names to validation
     * to then set errors on the form. Out of scope for this exercise.
     **/
    function validate(event) {
        const valid = true; // TODO Calculate and use setErrors

        /* const isValid = event.target.checkValidity(); */
        /* event.target.reportValidity(); */
        /* const inputEl = useRef(null); */

        if (!valid) {
            event.preventDefault();
        }
    }

    return (
        <div className="wrapper">

            <Switch>
                <Route
                    path="/"
                    exact>

                    <div className="fields">

                        <h3>
                            Healthcare Provider Registration
                        </h3>

                        <br />

                        <div className="name-fields">
                            <Input
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                pattern="[a-zA-Z]{1,}"
                                placeholder="First Name"
                                required />

                            <Input
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                pattern="[a-zA-Z]{1,}"
                                placeholder="Last Name"
                                required />

                            <Input
                                onChange={handleChange}
                                value={values.npiNumber}
                                name="npiNumber"
                                pattern="[0-9]{10}"
                                placeholder="NPI Number"
                                required />
                        </div>

                        <br />

                        <BusinessAddress
                            handleChange={handleChange}
                            values={values} />

                        <br />

                        <h3>Contact Information</h3>

                        <br />

                        <div className="contact">
                            <Input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Telephone"
                                onChange={handleChange}
                                value={values.phone}
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                validationMessage="Please enter 123-123-1234"
                                required />

                            <Input
                                name="email"
                                type="email"
                                onChange={handleChange}
                                value={values.email}
                                placeholder="Email"
                                required
                            />
                        </div>

                    </div>

                    <Link
                        onClick={validate}
                        to={`${PATHS.confirmation}`}
                        className="register-button">
                        Register
                    </Link>
                </Route>

                <Route
                    path={`${PATHS.confirmation}`}
                    exact
                    render={props =>
                        <Confirmation
                            values={values}
                            {...props} />
                    } />

            </Switch>

        </div>
    );
}
