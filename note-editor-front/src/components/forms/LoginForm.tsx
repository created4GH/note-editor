import React from 'react';

import EntryForm from './EntryForm';

import { login } from '../../api/user';
import { HeaderInfo, InputsInfo } from '../../constants/entryForm';
import { LoginFormInitVals } from '../../formik/initialValues';
import { LoginFormValidSchema } from '../../formik/validationSchema';

interface Props {
    setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
    setShouldDisplayEntryForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<Props> = ({ setIsLoginForm, setShouldDisplayEntryForm }) => {

    return (<EntryForm
        initialValues={LoginFormInitVals}
        validationSchema={LoginFormValidSchema}
        headerInfo={HeaderInfo.login}
        inputsInfo={InputsInfo.login}
        submitBtnText='Log in'
        apiRequest={login}
        setIsLoginForm={setIsLoginForm}
        setShouldDisplayEntryForm={setShouldDisplayEntryForm}
    />
    );
};

export default LoginForm;