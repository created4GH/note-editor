import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import './style.scss';

const LoginForm = () => {
    const initialValues = {
        username: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .matches(/^[A-Za-z][A-Za-z0-9_]{3,10}$/)
            .required("Username is required!"),
        password: Yup.string()
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
            .required("Password is required!"),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    const onSubmit = () => { };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
        </Formik>
    );
};

export default LoginForm;