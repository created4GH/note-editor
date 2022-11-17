import React, { useContext, useState } from 'react';

import { ReactComponent as LoginIcon } from "../../assets/svg/icons/login.svg";
import { ReactComponent as LogoutIcon } from "../../assets/svg/icons/logout.svg";
import LoginForm from '../forms/LoginForm';
import SignupForm from '../forms/SignupForm';

import { logout } from '../../api/user';
import { Message } from '../../interfaces/common';
import { Keys } from '../../constants/localStorage';
import { DispatchContext } from '../../context/reducerContext';

import './style.scss';

import { Actions } from '../../useReducer/actions';
const { SET_IS_LOGGED_IN } = Actions;

interface Props {
    isLoggedIn: boolean;
}

const Entry: React.FC<Props> = ({ isLoggedIn }) => {
    const handleDispatch = useContext(DispatchContext)!;
    const [{ msgText, msgClassName }, updateMessage] = useState<Message>({
        msgText: '',
        msgClassName: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
    const [isDisplayEntryForm, setIsDisplayEntryForm] = useState<boolean>(false);

    const btnTitle = isLoggedIn ? 'Logout' : 'Login';
    const handleClick = () => isLoggedIn ? handleLogout() : handleLogin();
    const handleLogin = async () => setIsDisplayEntryForm(true);

    const handleLogout = async () => {
        setIsLoading(true);
        updateMessage({
            msgText: 'Logging out',
            msgClassName: 'entry-message--loading entry--loading'
        });
        try {
            await logout();
            setTimeout(() => {
                updateMessage({
                    msgText: "You've been logged out!",
                    msgClassName: 'entry-message--success'
                });
                handleDispatch(SET_IS_LOGGED_IN, false);
                localStorage.removeItem(Keys.IS_LOGGED_IN);
            }, 1000);
        } catch (error) {
            updateMessage({
                msgText: (error as Error).message,
                msgClassName: 'entry-message--error'
            });
        }
        finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    };

    const icon = isLoggedIn ? <LogoutIcon className='entry-btn__logout-icon' />
        : <LoginIcon className='entry-btn__login-icon' />;

    const entryMsg = <div className="entry-message-wrapper">
        <div className={'entry-message ' + msgClassName}>{msgText}</div>
    </div>

    return (
        <>
            <button className='entry-btn' onClick={handleClick} title={btnTitle}>
                {icon}
            </button>
            {isLoading && entryMsg}
            {isDisplayEntryForm && (isLoginForm ?
                <LoginForm
                    setIsLoginForm={setIsLoginForm}
                    setIsDisplayEntryForm={setIsDisplayEntryForm}
                />
                : <SignupForm
                    setIsLoginForm={setIsLoginForm}
                    setIsDisplayEntryForm={setIsDisplayEntryForm}
                />)
            }
        </>
    );
};

export default Entry;