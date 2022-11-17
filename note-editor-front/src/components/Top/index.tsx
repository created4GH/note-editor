import React, { useContext } from 'react';

import Sorters from '../../components/Sorters';
import Search from '../../components/Search';
import ThemeToggler from '../ThemeToggler';
import Entry from '../Entry';

import { StateContext } from '../../context/reducerContext';

import './style.scss';

interface Props { }

const Top: React.FC<Props> = () => {
    const { notes, isLoggedIn } = useContext(StateContext);

    return (
        <div className="top">
            <Sorters notes={notes} />
            <Search notes={notes} />
            <ThemeToggler/>
            <Entry isLoggedIn={isLoggedIn} />
        </div>
    );
};

export default Top;