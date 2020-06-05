import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import './Register.css';
import PATHS from './paths';
import { Confirmation } from './RegistrationConfirmation';

/**
 * Sample file with registration, validation, and styling.
 *
 * TODO Decide if we want to create a json config and remove duplication of template.
 *      Possibly encapsulate input as forwardRef(Input).
 **/

export function BusinessAddress({values, handleChange}) {
    return (
        <div className="business-address">
            <h3>
                Business Address
            </h3>

            <br />

            <div className="business-fields">
                <input
                    className="input"
                    onChange={handleChange}
                    value={values.address1}
                    name="address1"
                    pattern=".{3,}"
                    data-message="Please enter at least 3 letters for address."
                    placeholder="Address 1 *"
                    required
                />

                <input
                    className="input optional"
                    onChange={handleChange}
                    value={values.address2}
                    name="address2"
                    placeholder="Address 2"
                />

                <input
                    className="input"
                    onChange={handleChange}
                    value={values.state}
                    pattern="[a-zA-Z]{2,}"
                    data-message="Enter at least 2 letters for state code or full state name."
                    name="state"
                    placeholder="State *"
                    required
                />

                <input
                    className="input"
                    onChange={handleChange}
                    value={values.zipCode}
                    pattern="[0-9]{5}|[0-9]{5}-[0-9]{4}"
                    data-message="Enter 5 digit zip code or 5+4 code."
                    name="zipCode"
                    placeholder="Zip Code *"
                    required
                />

            </div>
        </div>
    );
}

const fields = [
    'firstName',
    'lastName',
    'npiNumber',

    'address1',
    'address2',
    'state',
    'zipCode',

    'phone',
    'email'
];

const initialValues = Object.fromEntries(fields.map(name => [name, '']));

export function Register() {
  const [values, setValue] = useState(initialValues);

  /* Get a handle on the form element, in ordor to verify if its child input
   * elements are valid. Better than a ref per input, and knows of all deeply nested
   * form elements that need to be corrected across components */
  const formEl = useRef(null);

  function handleChange(event) {
    const { target } = event;
    // Reset validation onchange, assuming it has been fixed
    target.setCustomValidity('');

    setValue(state => ({
      ...state,
      [target.name]: target.value
    }));
  }

  function validate(event) {
    for(let input of formEl.current.elements) {
      const isInputValid = input.checkValidity();

      input.setCustomValidity(!isInputValid ? input.dataset.message : '');

      if (!isInputValid) {
        input.reportValidity();
        event.preventDefault();
        return false;
      }
    }
  }

  return (
    <div className="wrapper">

        <Switch>
            <Route
              path="/"
              exact>

                <form ref={formEl}>
                    <div className="fields">

                        <h3>
                            Healthcare Provider Registration
                        </h3>

                        <br />

                        <div className="name-fields">
                            <input
                              className="input"
                              onChange={handleChange}
                              value={values.firstName}
                              name="firstName"
                              pattern="[a-zA-Z]{1,}"
                              data-message="First name must be a name."
                              placeholder="First Name *"
                              required />

                            <input
                              className="input"
                              onChange={handleChange}
                              value={values.lastName}
                              name="lastName"
                              data-message="Last name must be a name of at least one character."
                              pattern="[a-zA-Z]{1,}"
                              placeholder="Last Name *"
                              required />

                            <input
                              className="input"
                              onChange={handleChange}
                              value={values.npiNumber}
                              name="npiNumber"
                              pattern="[0-9]{3,}"
                              placeholder="NPI Number *"
                              data-message="Must enter at least 3 numbers."
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
                            <input
                              className="input"
                              type="tel"
                              name="phone"
                              placeholder="Telephone *"
                              onChange={handleChange}
                              value={values.phone}
                              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}|[0-9]{10}"
                              data-message="Please enter 10 digits or digits with format: xxx-xxx-xxxx"
                              required />

                            <input
                              className="input"
                              name="email"
                              type="email"
                              onChange={handleChange}
                              value={values.email}
                              data-message="Email must include an '@' and letters afterwards."
                              placeholder="Email *"
                              required />
                        </div>

                    </div>
                </form>

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
