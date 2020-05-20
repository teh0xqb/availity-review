import React from 'react';
import { Redirect } from "react-router-dom";
import './RegistrationConfirmation.css';

/**
 * Simple registration confirmation.
 * Redirects to registration page if navigating directly to this route
 * with no previous values from the user.
 **/
export const Confirmation = ({values}) => values.email ? (
    <div className="registered">
        <p>You have successfully registered, {values.firstName}!</p>
        <p>An e-mail will be sent to {values.email} to verify your account.</p>
    </div>
) : <Redirect to={{pathname: "/"}} />;
