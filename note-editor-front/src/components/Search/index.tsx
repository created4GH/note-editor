import React, { ChangeEvent, useContext, useRef } from 'react';

import { ReactComponent as SearchFrame } from "../../assets/svg/frames/search.svg";
import { ReactComponent as Loupe } from "../../assets/svg/icons/loupe.svg";

import { DispatchContext } from '../../contexts';
import { NoteType } from '../../interfaces';
import { Actions } from '../../reducer';

import './style.scss';

interface Props {
    notes: NoteType[]
}

const Search: React.FC<Props> = ({ notes }) => {
    const dispatch = useContext(DispatchContext)!;
    const searchRef = useRef<HTMLInputElement>(null);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target?.value
        const newNotes = notes
            .filter(({ title }) => title.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
        dispatch({ type: Actions.UPDATE_DISPLAY_NOTES, payload: newNotes });
        dispatch({ type: Actions.UPDATE_SHOULD_TITLE_BE_AUTOFOCUSED, payload: false });
    }

    const handleBlur = () => dispatch({ type: Actions.UPDATE_SHOULD_TITLE_BE_AUTOFOCUSED, payload: true });

    return (
        <div className='search'>
            <SearchFrame className='search__frame' />
            <input
                ref={searchRef}
                className='search__input'
                type="text"
                placeholder='Search by title'
                onChange={handleSearch}
                onBlur={handleBlur}
            />
            <Loupe className='search__loupe-icon' />
        </div>
    );
};

export default Search;