import React from 'react';
import { Redirect } from "react-router-dom";
import './RegistrationConfirmation.css';

export const Confirmation = ({values}) => values.email ? (
    <div className="registered">
        <p>You have successfully registered, {values.firstName}!</p>
        <p>An e-mail will be sent to {values.email} to verify your account</p>
    </div>
) : <Redirect to={{pathname: "/"}} />;
