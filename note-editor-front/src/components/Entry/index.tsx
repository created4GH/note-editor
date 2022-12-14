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
const { SET_IS_LOGGED_IN, SET_SELECTED_NOTE } = Actions;

interface Props {
    isLoggedIn: boolean;
}

const Entry: React.FC<Props> = ({ isLoggedIn }) => {
    const handleDispatch = useContext(DispatchContext)!;
    const [{ msgText, msgClassName }, updateMessage] = useState<Message>({
        msgText: '',
        msgClassName: ''
    });
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
    const [ShouldDisplayEntryForm, setShouldDisplayEntryForm] = useState<boolean>(false);
    const btnTitle = isLoggedIn ? 'Logout' : 'Login';

    const handleClick = () => isLoggedIn ? handleLogout() : handleLogin();
    const handleLogin = async () => setShouldDisplayEntryForm(true);
    const handleLogout = async () => {
        setIsFetching(true);
        updateMessage({
            msgText: 'Logging out',
            msgClassName: 'entry-message--loading entry--loading'
        });
        try {
            await logout();
            updateMessage({
                msgText: "You've been logged out!",
                msgClassName: 'entry-message--success'
            });
            setTimeout(() => {
                handleDispatch(SET_IS_LOGGED_IN, false);
                handleDispatch(SET_SELECTED_NOTE, null);
                localStorage.removeItem(Keys.IS_LOGGED_IN);
            }, 500);
        } catch (error) {
            updateMessage({
                msgText: (error as Error).message,
                msgClassName: 'entry-message--error'
            });
        }
        finally {
            setTimeout(() => {
                setIsFetching(false);
            }, 1000);
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
            {isFetching && entryMsg}
            {ShouldDisplayEntryForm && (isLoginForm ?
                <LoginForm
                    setIsLoginForm={setIsLoginForm}
                    setShouldDisplayEntryForm={setShouldDisplayEntryForm}
                />
                : <SignupForm
                    setIsLoginForm={setIsLoginForm}
                    setShouldDisplayEntryForm={setShouldDisplayEntryForm}
                />)
            }
        </>
    );
};

export default Entry;