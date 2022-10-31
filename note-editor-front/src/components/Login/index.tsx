import React from 'react';

import { ReactComponent as LoginIcon } from "../../assets/svg/icons/login.svg";
import { ReactComponent as LogoutIcon } from "../../assets/svg/icons/logout.svg";

import './style.scss';

interface Props {
    isLoggedIn: boolean;
}

const Login: React.FC<Props> = (isLoggedIn) => {
    console.log('isLoggedIn', isLoggedIn)
    return (
        <button className='login-btn'>
            {isLoggedIn ? <LogoutIcon className='login-btn__logout-icon' />
                : <LoginIcon className='login-btn__login-icon' />}
        </button>
    );
};

export default Login;