import React, { useContext } from 'react';

import Sorters from '../../components/Sorters';
import Search from '../../components/Search';
import Entry from '../Entry';

import { StateContext } from '../../context/context';

import './style.scss';

interface Props{
    // updateIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Top : React.FC<Props> = () => {
    const {notes, isLoggedIn} = useContext(StateContext);

    return (
        <div className="top">
            <Sorters notes={notes}/>
            <Search notes={notes}/>
            <Entry isLoggedIn={isLoggedIn}/>
        </div>
    );
};

export default Top;