import React, { useContext } from 'react';

import Sorters from '../../components/Sorters';
import Search from '../../components/Search';
import Auth from '../Auth';

import { StateContext } from '../../contexts';

import './style.scss';
import { boolean } from 'yup/lib/locale';

interface Props{
    // updateIsDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Top : React.FC<Props> = () => {
    const {notes, isLoggedIn} = useContext(StateContext);

    return (
        <div className="top">
            <Sorters notes={notes}/>
            <Search notes={notes}/>
            <Auth isLoggedIn={isLoggedIn}/>
        </div>
    );
};

export default Top;