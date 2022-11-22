import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { MouseEvent, useContext, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { EntryFnType } from '../../../api/user';
import { DispatchContext } from '../../../context/reducerContext';
import { InitialsValuesType } from '../../../interfaces/common';
import { EntryFormValidSchemaType } from '../../../formik/validationSchema';
import { Message } from '../../../interfaces/common';
import { setStorageIsLoggedIn } from '../../../helpers/localStorage';

import './style.scss';

import { Actions } from '../../../useReducer/actions';
const { SET_IS_LOGGED_IN, SET_SELECTED_NOTE } = Actions;

interface Props {
    initialValues: {
        username: string;
        password: string;
        passwordConfirmation?: string;
    };
    validationSchema: EntryFormValidSchemaType;
    headerInfo: {
        title: string;
        btnText: string;
    };
    inputsInfo: {
        title: string;
        name: string;
        type: string;
        placeholder: string;
    }[];
    submitBtnText: string;
    apiRequest: EntryFnType;
    setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
    setShouldDisplayEntryForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const EntryForm: React.FC<Props> = ({ initialValues, validationSchema, headerInfo, inputsInfo,
    submitBtnText, apiRequest, setIsLoginForm, setShouldDisplayEntryForm }) => {
    const handleDispatch = useContext(DispatchContext)!;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [{ msgText, msgClassName }, updateMessage] = useState<Message>({
        msgText: '',
        msgClassName: ''
    });

    const closeForm = (event: MouseEvent<HTMLDivElement>) => {
        const className = (event.target as HTMLDivElement).className;
        if(className === 'entry-form-wrapper'){
            setShouldDisplayEntryForm(false);
            setIsLoginForm(true);
        }
    }

    const onSubmit = async ({ username, password }: InitialsValuesType) => {
        setIsLoading(true);
        updateMessage({
            msgText: 'Loading',
            msgClassName: 'entry-message--loading entry--loading'
        });
        try {
            await apiRequest(username, password);
            setTimeout(() => {
                updateMessage({
                    msgText: 'Success!',
                    msgClassName: 'entry-form__submit-success'
                })
            }, 1000);
            setTimeout(() => {
                setShouldDisplayEntryForm(false);
                handleDispatch(SET_SELECTED_NOTE, null);
                handleDispatch(SET_IS_LOGGED_IN, true);
                setStorageIsLoggedIn();
                setIsLoginForm(true);
            }, 1700);
        } catch (error) {
            updateMessage({
                msgText: (error as Error).message,
                msgClassName: 'entry-form__submit-error'
            });
        }
        finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1700);
        }
    };

    const changeForm = () => setIsLoginForm(prevState => !prevState);

    const mappedInputs = useMemo(() => {
        return inputsInfo.map(({ title, name, type, placeholder }) => {
            return <div key={uuid()} className="entry-form__input-wrapper">
                <ErrorMessage
                    component="span"
                    className='entry-form__error-msg'
                    name={name}
                />
                <label htmlFor={name}>{title}</label>
                <Field
                    className='entry-form__input'
                    name={name}
                    type={type}
                    placeholder={placeholder}
                />
            </div>
        })
    }, [inputsInfo]);

    const entryMsg = <div className={'entry-form__submit-message ' + msgClassName}>{msgText}</div>;

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <div className="entry-form-wrapper" onClick={closeForm}>
                <Form className='entry-form'>
                    {isLoading && entryMsg}
                    <div className="entry-form__header">
                        <span>{headerInfo.title}</span>
                        <button type='button' onClick={changeForm}>
                            {headerInfo.btnText}
                        </button>
                    </div>
                    {mappedInputs}
                    <button className='entry-form__entry-btn' type='submit'>
                        {submitBtnText}
                    </button>
                </Form>
            </div>
        </Formik>
    );
};

export default EntryForm;