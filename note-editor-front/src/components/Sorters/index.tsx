import React, { useContext, useState } from 'react';

import { ReactComponent as SortByTitle } from "../../assets/svg/icons/sort-by-title.svg";
import { ReactComponent as SortByDate } from "../../assets/svg/icons/sort-by-date.svg";

import { NoteType } from '../../interfaces/common';
import { DispatchContext } from '../../context/reducerContext';
import { SortDisplayNotes } from '../../useReducer/interfaces';

import './style.scss';

import { Actions } from '../../useReducer/actions';
const { SET_DISPLAY_NOTES, SET_SELECTED_NOTE, SET_SORT_DISPLAY_NOTES } = Actions;

interface Props {
    notes: NoteType[]
}

type Parameter = "title" | "createdDate";

const Sorters: React.FC<Props> = ({ notes }) => {
    const handleDispatch = useContext(DispatchContext)!;
    const [dateSortOrder, updateDateSortOrder] = useState<string>("desc");
    const [titleSortOrder, updateTitleSortOrder] = useState<string>("desc");

    const sortBy = (parameter: Parameter, order: string,
        sortStateCallback: React.Dispatch<React.SetStateAction<string>>) => {
        const isDescOrder = order === "desc";
        const sortDisplayNotes: SortDisplayNotes = (notes) => {
            return [...notes.sort((a, b) => {
                return (isDescOrder && a[parameter]! > b[parameter]!) ? 1 : -1;
            })];
        }
        const newNotes = sortDisplayNotes(notes);
        const selectedNote = newNotes[0];
        handleDispatch(SET_DISPLAY_NOTES, newNotes);
        handleDispatch(SET_SELECTED_NOTE, selectedNote);
        handleDispatch(SET_SORT_DISPLAY_NOTES, sortDisplayNotes);
        sortStateCallback(isDescOrder ? "asc" : "desc");
    }
    const sortByDate = () => sortBy("createdDate", dateSortOrder, updateDateSortOrder);
    const sortByTitle = () => sortBy("title", titleSortOrder, updateTitleSortOrder);

    return (
        <div className="sorters">
            <button className='sorters__sorter-by-title' onClick={sortByTitle}>
                <SortByTitle className='sorters__sorter-by-title-icon' />
            </button>
            <button className='sorters__sorter-by-date' onClick={sortByDate}>
                <SortByDate className='sorters__sorter-by-date-icon' />
            </button>
        </div >
    );
};

export default Sorters;