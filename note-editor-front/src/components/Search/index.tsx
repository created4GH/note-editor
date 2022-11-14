import React, { ChangeEvent, useContext, useRef } from 'react';

import { ReactComponent as SearchFrame } from "../../assets/svg/frames/search.svg";
import { ReactComponent as Loupe } from "../../assets/svg/icons/loupe.svg";

import { DispatchContext } from '../../context/context';
import { getHandleDispatch } from '../../helpers';
import { NoteType } from '../../interfaces/common';
import { Actions } from '../../useReducer/actions';
import { DisplayNotesCallback } from '../../useReducer/interfaces';

import './style.scss';

const { SET_DISPLAY_NOTES, SET_DISPLAY_NOTES_CALLBACK, SET_SHOULD_TITLE_BE_AUTOFOCUSED } = Actions;

interface Props {
    notes: NoteType[]
}

const Search: React.FC<Props> = ({ notes }) => {
    const dispatch = useContext(DispatchContext)!;
    const handleDispatch = getHandleDispatch(dispatch);
    const searchRef = useRef<HTMLInputElement>(null);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target?.value.toLocaleLowerCase();
        const callback: DisplayNotesCallback = (notes) => {
            return notes.filter(({ title }) => title.toLocaleLowerCase().includes(value));
        }
        const newNotes = callback(notes);
        const displayNotesCallback = value ? callback : null;
        handleDispatch(SET_DISPLAY_NOTES, newNotes);
        handleDispatch(SET_DISPLAY_NOTES_CALLBACK, displayNotesCallback);
        handleDispatch(SET_SHOULD_TITLE_BE_AUTOFOCUSED, false);
    }

    const handleBlur = () => handleDispatch(SET_SHOULD_TITLE_BE_AUTOFOCUSED, true);;

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