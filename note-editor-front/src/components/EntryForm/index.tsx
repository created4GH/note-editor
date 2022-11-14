import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { MouseEvent, useContext, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { DispatchContext } from '../../context/context';
import { InitialsValuesType } from '../../interfaces/common';
import { login, singUp } from '../../api/user';
import { getHandleDispatch, setStorageIsLoggedIn } from '../../helpers';
import { LoginFormInitVals } from '../../formik/initialValues';
import { SignUpFormInitVals } from '../../formik/initialValues';
import { LoginFormValidSchema } from '../../formik/validationSchema';
import { SignUpFormValidSchema } from '../../formik/validationSchema';
import { HeaderInfo, InputsInfo } from '../../constants/entryForm';

import './style.scss';

import { Actions } from '../../useReducer/actions';
const { SET_IS_LOGGED_IN, SET_SELECTED_NOTE } = Actions;

interface Props {
    isLoginForm: boolean;
    updateIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDisplayEntryForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const EntryForm: React.FC<Props> = ({ isLoginForm, updateIsLoginForm, setIsDisplayEntryForm }) => {

    const dispatch = useContext(DispatchContext)!;
    const handleDispatch = getHandleDispatch(dispatch);

    const [message, updateMessage] = useState<string>('');
    const [messageClassName, updateMessageClassName] = useState<string>('');

    const headerInfo = isLoginForm ? HeaderInfo.login : HeaderInfo.signUp;
    const inputsInfo = isLoginForm ? InputsInfo.login : InputsInfo.signUp;
    const submitBtnText = isLoginForm ? 'Log in' : 'Sign up';
    const apiRequest = isLoginForm ? login : singUp;
    const initialValues = isLoginForm ? LoginFormInitVals : SignUpFormInitVals;
    const validationSchema = isLoginForm ? LoginFormValidSchema : SignUpFormValidSchema;



    const closeForm = (event: MouseEvent<HTMLDivElement>) => {
        const className = (event.target as HTMLDivElement).className;
        className === 'user-form-wrapper' && setIsDisplayEntryForm(false);
    }

    const onSubmit = async ({ username, password }: InitialsValuesType) => {
        try {
            await apiRequest(username, password);
            updateMessageClassName('user-form__submit-success');
            updateMessage('Success!');
            setTimeout(() => {
                updateMessage('');
                setIsDisplayEntryForm(false);
                handleDispatch(SET_SELECTED_NOTE, null);
                handleDispatch(SET_IS_LOGGED_IN, true);
                setStorageIsLoggedIn();
                updateIsLoginForm(true);
            }, 500);
        } catch (error) {
            updateMessageClassName('user-form__submit-error');
            updateMessage((error as Error).message);
            setTimeout(() => {
                updateMessage('');
            }, 1000);
        }
    };

    const changeForm = () => updateIsLoginForm(prevState => !prevState);

    const mappedInputs = useMemo(() => {
        return inputsInfo.map(({ title, name, type, placeholder }) => {
            return <div key={uuid()} className="user-form__input-wrapper">
                <ErrorMessage
                    component="span"
                    className='user-form__error-msg'
                    name={name}
                />
                <label htmlFor={name}>{title}</label>
                <Field
                    className='user-form__input'
                    name={name}
                    type={type}
                    placeholder={placeholder}
                />
            </div>
        })
    }, [inputsInfo])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <div className="user-form-wrapper" onClick={closeForm}>
                <Form className='user-form'>
                    {message &&
                        <div className={'user-form__submit-message ' + messageClassName}>{message}</div>}
                    <div className="user-form__header">
                        <span>{headerInfo.title}</span>
                        <button
                            type='button'
                            onClick={changeForm}
                        >
                            {headerInfo.btnText}
                        </button>
                    </div>
                    {mappedInputs}
                    <button
                        className='user-form__entry-btn'
                        type='submit'
                    >
                        {submitBtnText}
                    </button>
                </Form>
            </div>
        </Formik>
    );
};

export default EntryForm;