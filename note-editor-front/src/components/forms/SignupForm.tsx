import React from 'react';

import EntryForm from './EntryForm';

import { singUp } from '../../api/user';
import { HeaderInfo, InputsInfo } from '../../constants/entryForm';
import { SignUpFormInitVals } from '../../formik/initialValues';
import { SignUpFormValidSchema } from '../../formik/validationSchema';

interface Props {
    setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDisplayEntryForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupForm: React.FC<Props> = ({ setIsLoginForm, setIsDisplayEntryForm }) => {

    return (<EntryForm
        initialValues={SignUpFormInitVals}
        validationSchema={SignUpFormValidSchema}
        headerInfo={HeaderInfo.signUp}
        inputsInfo={InputsInfo.signUp}
        submitBtnText='Sign up'
        apiRequest={singUp}
        setIsLoginForm={setIsLoginForm}
        setIsDisplayEntryForm={setIsDisplayEntryForm}
    />
    );
};

export default SignupForm;