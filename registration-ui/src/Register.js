import React, { useState, useReducer } from 'react';
import './Register.css';

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
                    name="state"
                    placeholder="State"
                    required
                />

                <Input
                    onChange={handleChange}
                    value={values.zipCode}
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

function reducer(state, action, ...args) {
    return {[action.name]: action.value};
}

export function Register() {

    const [values, dispatch] = useReducer(reducer, initialValues);

    function handleChange(e) {
        /* e.persist(); */

        dispatch({
            name: e.target.name,
            value: e.target.value
        });
    }

    return (
        <div className="wrapper">

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
                        placeholder="First Name"
                        required />

                    <Input
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        placeholder="Last Name"
                        required />

                    <Input
                        onChange={handleChange}
                        value={values.npiNumber}
                        name="npiNumber"
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

            <button className="register-button">
                Register
            </button>

        </div>
    );
}
