import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { MouseEvent, useContext, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import './style.scss';
import { DispatchContext } from '../../contexts';
import { InitialsValuesType } from '../../interfaces/common';
import { UserFormValidSchemaType } from '../../formik/validationSchema';
import { TTL, Keys } from '../../constants/localStorage';
import { getHandleDispatch } from '../../helpers';
import { Actions } from '../../useReducer/actions';
const {SET_IS_DISPLAY_AUTH_FORM, SET_IS_LOGGED_IN, SET_SELECTED_NOTE} = Actions;

interface Props {
    headerInfo: {
        title: string;
        btnText: string;
    };
    updateIsDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
    inputsInfo: {
        title: string;
        name: string;
        type: string;
        placeholder: string;
    }[];
    submitBtnText: string;
    validationSchema: UserFormValidSchemaType;
    initialValues: {
        username: string;
        password: string;
        passwordConfirmation?: string;
    }
    apiRequest: (username: string, password: string) => Promise<any>;
}

const UserForm: React.FC<Props> = ({ headerInfo, updateIsDisplayLoginForm, inputsInfo,
    apiRequest, submitBtnText, validationSchema, initialValues }) => {

    const dispatch = useContext(DispatchContext)!;
    const handleDispatch = getHandleDispatch(dispatch);
    const [message, updateMessage] = useState<string>('');
    const [messageClassName, updateMessageClassName] = useState<string>('');

    const closeForm = (event: MouseEvent<HTMLDivElement>) => {
        const className = (event.target as HTMLDivElement).className;
        if (className === 'user-form-wrapper') {
            dispatch({ type: Actions.SET_IS_DISPLAY_AUTH_FORM, payload: false });
        }
    }

    const onSubmit = async ({ username, password }: InitialsValuesType) => {
        try {
            await apiRequest(username, password);
            updateMessageClassName('user-form__submit-success');
            updateMessage('Success!');
            setTimeout(() => {
                updateMessage('');
                handleDispatch(SET_IS_DISPLAY_AUTH_FORM, false);
                handleDispatch(SET_SELECTED_NOTE, null);
                handleDispatch(SET_IS_LOGGED_IN, true);
                const storageItem = JSON.stringify({
                    isLoggedIn: true,
                    ttl: Date.now() + TTL.IS__LOGGED_IN_TTL
                });
                localStorage.setItem(Keys.IS_LOGGED_IN, storageItem);
                updateIsDisplayLoginForm(true);
            }, 500);
        } catch (error) {
            updateMessageClassName('user-form__submit-error');
            updateMessage((error as Error).message);
            setTimeout(() => {
                updateMessage('');
            }, 1000);
        }
    };

    const changeForm = () => updateIsDisplayLoginForm(prevState => !prevState);

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
                        className='user-form__auth-btn'
                        type='submit'
                    >
                        {submitBtnText}
                    </button>
                </Form>
            </div>
        </Formik>
    );
};

export default UserForm;