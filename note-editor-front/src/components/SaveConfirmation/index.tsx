import React from 'react';

import { ReactComponent as CheckMarkIcon } from '../../assets/svg/icons/checkmark.svg';

import './style.scss';

const SaveConfirmation = () => {
    return (
        <div className='save-confirmation'>
            <div className="checkmark-wrapper">
                <CheckMarkIcon className='checkmark-icon'/>
            </div>
            <span>Saved</span>
        </div>
    );
};

export default SaveConfirmation;