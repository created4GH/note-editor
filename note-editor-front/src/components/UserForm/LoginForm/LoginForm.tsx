import React from 'react';
import { LoginFormInitVals } from '../../../formik/initialValues';
import { LoginFormValidSchema } from '../../../formik/validationSchema';
import { login } from '../../../requests/user';
import UserForm from '../template';

interface Props {
    updateIsDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<Props> = ({ updateIsDisplayLoginForm }) => {
    const headerInfo = {
        title: 'Account Login',
        btnText: 'Sign up?'
    };
    const inputsInfo = [
        {
            title: 'Username',
            name: 'username',
            type: 'text',
            placeholder: 'Enter your username'
        },
        {
            title: 'Password',
            name: 'password',
            type: 'text',
            placeholder: 'Enter your password'
        }
    ];

    const submitBtnText = 'Log in';

    return (
        <UserForm
            apiRequest={login}
            headerInfo={headerInfo}
            updateIsDisplayLoginForm={updateIsDisplayLoginForm}
            inputsInfo={inputsInfo}
            submitBtnText={submitBtnText}
            validationSchema={LoginFormValidSchema}
            initialValues={LoginFormInitVals}
        />
    );
};

export default LoginForm;