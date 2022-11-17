import React, { ChangeEvent, useContext, useRef } from 'react';

import { ReactComponent as SearchFrame } from "../../assets/svg/frames/search.svg";
import { ReactComponent as Loupe } from "../../assets/svg/icons/loupe.svg";

import { DispatchContext, StateContext } from '../../context/reducerContext';
import { NoteType } from '../../interfaces/common';

import './style.scss';

import { Actions } from '../../useReducer/actions';
import { filterNotes } from '../../helpers/notes';
const { SET_DISPLAY_NOTES, SET_SELECTED_NOTE,
    SET_SHOULD_TITLE_BE_AUTOFOCUSED, SET_SEARCH_INPUT } = Actions;

interface Props {
    notes: NoteType[]
}

const Search: React.FC<Props> = ({ notes }) => {
    const { selectedNote, searchInput } = useContext(StateContext);
    const handleDispatch = useContext(DispatchContext)!;
    const searchRef = useRef<HTMLInputElement>(null);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target?.value.toLocaleLowerCase();
        const newNotes = filterNotes(value, notes);
        const newSelectedNote = newNotes.length ? newNotes[0] : selectedNote;
        handleDispatch(SET_DISPLAY_NOTES, newNotes);
        handleDispatch(SET_SEARCH_INPUT, value);
        handleDispatch(SET_SELECTED_NOTE, newSelectedNote);
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
                value={searchInput}
            />
            <Loupe className='search__loupe-icon' />
        </div>
    );
};

export default Search;