import React from 'react';
import { SignUpFormInitVals } from '../../../formik/initialValues';
import { SignUpFormValidSchema } from '../../../formik/validationSchema';
import { register } from '../../../requests/user';
import UserForm from '../template';

interface Props {
    updateIsDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpForm: React.FC<Props> = ({ updateIsDisplayLoginForm }) => {

    const headerInfo = {
        title: 'Account registration',
        btnText: 'Log in?'
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
        },
        {
            title: 'Confirm Password',
            name: 'passwordConfirmation',
            type: 'text',
            placeholder: 'Confirm your password'
        }
    ];
    const submitBtnText = 'Sign up';

    return (
        <UserForm
            apiRequest={register}
            headerInfo={headerInfo}
            updateIsDisplayLoginForm={updateIsDisplayLoginForm}
            inputsInfo={inputsInfo}
            submitBtnText={submitBtnText}
            validationSchema={SignUpFormValidSchema}
            initialValues={SignUpFormInitVals}
        />
    );
};

export default SignUpForm;