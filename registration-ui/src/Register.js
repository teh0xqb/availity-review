import React, { useState, useRef } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import './Register.css';
import PATHS from './paths';
import { Confirmation } from './RegistrationConfirmation';

/**
 * Sample file with registration, validation, and styling.
 **/

/*
* Util fn that joins class names or potentially undefined classname properties
* receives an array of potential class name strings;
*/
function cx(arrNames) {
  return arrNames
    .filter(s => Boolean(s))
    .join(' ');
}

export const BusinessAddress = ({values, ...commonProps}) => (
  <div className="business-address">
      <h3>
          Business Address
      </h3>

      <br />

      <div className="business-fields">
          <input
            value={values.address1}
            name="address1"
            pattern=".{3,}"
            data-message="Please enter at least 3 letters for address."
            placeholder="Address 1 *"
            required
          {...commonProps}
          />

          <input
            {...commonProps}
            className={cx(["optional", commonProps.className])}
            value={values.address2}
            name="address2"
            placeholder="Address 2"
          />

          <input
            value={values.state}
            pattern="[a-zA-Z]{2,}"
            data-message="Enter at least 2 letters for state code or full state name."
            name="state"
            placeholder="State *"
            required
          {...commonProps}
          />

          <input
            className="input"
            value={values.zipCode}
            pattern="[0-9]{5}|[0-9]{5}-[0-9]{4}"
            data-message="Enter 5 digit zip code or 5+4 code."
            name="zipCode"
            placeholder="Zip Code *"
            required
          {...commonProps}
          />

      </div>
  </div>
);

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


const phonePatterns = [
  "[0-9]{3}-[0-9]{3}-[0-9]{4}",     // separates by dashes
  "[0-9]{10}",                      // plain old all 10 numbers in a row
];
const phoneNumberPattern = phonePatterns.join("|");


// array of {name, ''} init object value pairs for use on all fields (useState)
const initialFormValues = Object.fromEntries(fields.map(name => [name, '']));

/**
 * Given an input HTMLElement, returns if its valid provided it contains
 * validation attributes.
 **/
function validateAnInput(inputEl) {
  const isInputValid = inputEl.checkValidity();
  inputEl.setCustomValidity(!isInputValid ? inputEl.dataset.message : '');
  inputEl.reportValidity();

  return isInputValid;
}

export function Register() {
  const [values, setValue] = useState(initialFormValues);

  const [hasValidated, setHasValidated] = useState(false);

  /* Get a handle on the form element, in ordor to verify if its child input
   * elements are valid. Better than a ref per input, and knows of all deeply nested
   * form elements that need to be corrected across components */
  const formEl = useRef(null);

  function handleChange(event) {
    const { target } = event;

    // Reset validation message on change
    target.setCustomValidity('');

    setValue(state => ({
      ...state,
      [target.name]: target.value
    }));
  }

  function validate(event) {
    setHasValidated(true);

    for(let inputEl of formEl.current.elements) {
      const isInputValid = validateAnInput(inputEl);

      if (!isInputValid) {
        event.preventDefault();
        return false;
      }
    }
  }

  function handleFocus(event) {
    if (hasValidated) {
      const inputEl = event.target;
      validateAnInput(inputEl);
    }
  }

  const commonProps = {
    onChange: handleChange,
    onFocus: handleFocus,
    className: "input"
  };

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
                              value={values.firstName}
                              name="firstName"
                              pattern="[a-zA-Z]{1,}"
                              data-message="First name must be a name."
                              placeholder="First Name *"
                              required
                            {...commonProps}
                            />

                            <input
                              value={values.lastName}
                              name="lastName"
                              data-message="Last name must be a name of at least one character."
                              pattern="[a-zA-Z]{1,}"
                              placeholder="Last Name *"
                              required
                            {...commonProps}
                            />

                            <input
                              value={values.npiNumber}
                              name="npiNumber"
                              pattern="[0-9]{3,}"
                              placeholder="NPI Number *"
                              data-message="Must enter at least 3 numbers."
                              required
                            {...commonProps}
                            />
                        </div>

                        <br />

                        <BusinessAddress
                          {...commonProps}
                          values={values} />

                        <br />

                        <h3>Contact Information</h3>

                        <br />

                        <div className="contact">
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Telephone *"
                              value={values.phone}
                              pattern={phoneNumberPattern}
                              data-message="Please enter 10 digits or digits with format: xxx-xxx-xxxx"
                              required
                            {...commonProps}
                            />

                            <input
                              name="email"
                              type="email"
                              value={values.email}
                              data-message="Email must include an '@' and letters afterwards."
                              placeholder="Email *"
                              required
                            {...commonProps}
                            />
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
