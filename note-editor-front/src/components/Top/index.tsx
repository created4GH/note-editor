import React, { useContext } from 'react';

import Sorters from '../../components/Sorters';
import Search from '../../components/Search';
import Login from '../Login';

import { StateContext } from '../../contexts';

import './style.scss';

const Top = () => {
    const {notes, displayNotes, isLoggedIn} = useContext(StateContext);

    return (
        <div className="top">
            <Sorters notes={notes}/>
            <Search notes={notes}/>
            <Login isLoggedIn={isLoggedIn}/>
        </div>
    );
};

export default Top;