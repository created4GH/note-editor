import React, { useContext, useState } from 'react';

import { ReactComponent as LoginIcon } from "../../assets/svg/icons/login.svg";
import { ReactComponent as LogoutIcon } from "../../assets/svg/icons/logout.svg";
import { Keys } from '../../constants/localStorage';
import { DispatchContext } from '../../contexts';
import { login, logout } from '../../requests/user';
import { Actions } from '../../useReducer/actions';

import './style.scss';

interface Props {
    isLoggedIn: boolean;
}

const Login: React.FC<Props> = ({ isLoggedIn }) => {
    const dispatch = useContext(DispatchContext)!;
    const [message, updateMessage] = useState<string>('');
    const [messageClassName, updateMessageClassName] = useState<string>('auth-message--loading');
    const [isLoading, updateIsLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        dispatch({ type: Actions.SET_IS_DISPLAY_AUTH_FORM, payload: true });
    };

    const handleLogout = async () => {
        updateIsLoading(true);
        updateMessage('');
        updateMessageClassName('auth-message--loading');
        try {
            await logout();
            setTimeout(() => {
                updateMessageClassName('auth-message--success');
                updateMessage("You've been logged out!");
                dispatch({ type: Actions.SET_IS_LOGGED_IN, payload: false });
                localStorage.removeItem(Keys.IS_LOGGED_IN);
            }, 300);
            setTimeout(() => {
                updateIsLoading(false);
            }, 500);
        } catch (error) {
            updateMessageClassName('auth-message--error');
            updateMessage((error as Error).message);
        }
    };

    const handleClick = () => isLoggedIn ? handleLogout() : handleLogin();
    const buttonTitle = isLoggedIn ? 'Logout' : 'Login';
    const authMessageText = message ? message : 'Logging out';

    return (
        <>
            <button
                className='auth-btn'
                onClick={handleClick}
                title={buttonTitle}
            >
                {isLoggedIn ? <LogoutIcon className='auth-btn__logout-icon' />
                    : <LoginIcon className='auth-btn__login-icon' />}
            </button>
            {isLoading && <div className="auth-message-wrapper">
                <div className={'auth-message ' + messageClassName}>{authMessageText}</div>
            </div>}
        </>
    );
};

export default Login;