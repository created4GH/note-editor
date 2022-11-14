import React from 'react';

import { ReactComponent as CheckMarkIcon } from '../../assets/svg/icons/checkmark.svg';
import SavingLoader from '../loaders/SavingLoader';

import './style.scss';

interface Props {
    isSavingFetching: boolean;
}

const Saving: React.FC<Props> = ({ isSavingFetching }) => {

    const element = isSavingFetching ?
        <SavingLoader />
        : <>
            <div className="saving__checkmark-wrapper">
                <CheckMarkIcon className='saving__checkmark-icon' />
            </div>
            <span>Saved</span>
        </>

    return (
        <div className='saving-wrapper'>
            <div className="saving">
                {element}
            </div>
        </div>
    );
};

export default Saving;