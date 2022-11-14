import React, { useContext, useState } from 'react';

import EntryForm from '../EntryForm';
import { ReactComponent as LoginIcon } from "../../assets/svg/icons/login.svg";
import { ReactComponent as LogoutIcon } from "../../assets/svg/icons/logout.svg";

import { logout } from '../../api/user';
import { Keys } from '../../constants/localStorage';
import { DispatchContext } from '../../context/context';
import { getHandleDispatch } from '../../helpers';

import './style.scss';

import { Actions } from '../../useReducer/actions';
const { SET_IS_LOGGED_IN } = Actions;

interface Props {
    isLoggedIn: boolean;
}

const Entry: React.FC<Props> = ({ isLoggedIn }) => {
    const dispatch = useContext(DispatchContext)!;
    const handleDispatch = getHandleDispatch(dispatch);

    const [message, updateMessage] = useState<string>('');
    const [isLoading, updateIsLoading] = useState<boolean>(false);
    const [isDisplayEntryForm, setIsDisplayEntryForm] = useState<boolean>(false);
    const [isLoginForm, updateIsLoginForm] = useState<boolean>(true);
    const [messageClassName, updateMessageClassName] = useState<string>('entry-message--loading');

    const buttonText = isLoggedIn ? 'Logout' : 'Login';
    const authMessageText = message ? message : 'Logging out';

    const handleClick = () => isLoggedIn ? handleLogout() : handleLogin();

    const handleLogin = async () => setIsDisplayEntryForm(true);

    const handleLogout = async () => {
        updateIsLoading(true);
        updateMessage('');
        updateMessageClassName('entry-message--loading');
        try {
            await logout();
            setTimeout(() => {
                updateMessageClassName('entry-message--success');
                updateMessage("You've been logged out!");
                handleDispatch(SET_IS_LOGGED_IN, false);
                localStorage.removeItem(Keys.IS_LOGGED_IN);
            }, 300);
            setTimeout(() => {
                updateIsLoading(false);
            }, 500);
        } catch (error) {
            updateMessageClassName('entry-message--error');
            updateMessage((error as Error).message);
        }
    };


    return (
        <>
            <button
                className='entry-btn'
                onClick={handleClick}
                title={buttonText}
            >
                {isLoggedIn ? <LogoutIcon className='entry-btn__logout-icon' />
                    : <LoginIcon className='entry-btn__login-icon' />}
            </button>
            {isLoading && <div className="entry-message-wrapper">
                <div className={'entry-message ' + messageClassName}>{authMessageText}</div>
            </div>}
            {isDisplayEntryForm
                &&
                <EntryForm
                    isLoginForm={isLoginForm}
                    updateIsLoginForm={updateIsLoginForm}
                    setIsDisplayEntryForm={setIsDisplayEntryForm}
                />
            }
        </>
    );
};

export default Entry;