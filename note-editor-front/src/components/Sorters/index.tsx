import React, { useContext, useState } from 'react';

import { ReactComponent as SortByTitle } from "../../assets/svg/icons/sort-by-title.svg";
import { ReactComponent as SortByDate } from "../../assets/svg/icons/sort-by-date.svg";

import { NoteType } from '../../interfaces/common';
import { DispatchContext } from '../../context/context';
import { Actions } from '../../useReducer/actions';

import './style.scss';
import { DisplayNotesCallback } from '../../useReducer/interfaces';

interface Props {
    notes: NoteType[]
}

type Parameter = "title" | "createdDate";

const Sorters: React.FC<Props> = ({ notes }) => {
    const dispatch = useContext(DispatchContext)!;
    const [dateSortOrder, updateDateSortOrder] = useState<string>("desc");
    const [titleSortOrder, updateTitleSortOrder] = useState<string>("desc");

    const sortBy = (parameter: Parameter, order: string,
        sortStateCallback: React.Dispatch<React.SetStateAction<string>>) => {
        const isDescOrder = order === "desc";
        const callback : DisplayNotesCallback = (notes) => {
            return [...notes.sort((a, b) => {
                return (isDescOrder && a[parameter]! > b[parameter]!) ? 1 : -1;
            })];
        }
        const newNotes = callback(notes);
        dispatch({ type: Actions.SET_DISPLAY_NOTES, payload: newNotes });
        sortStateCallback(isDescOrder ? "asc" : "desc");
    }

    const sortByDate = () => sortBy("createdDate", dateSortOrder, updateDateSortOrder);
    const sortByTitle = () => sortBy("title", titleSortOrder, updateTitleSortOrder);

    return (
        <div className="sorters">
            <button
                className='sorters__sorter-by-title'
                onClick={sortByTitle}
            >
                <SortByTitle className='sorters__sorter-by-title-icon' />
            </button>
            <button
                className='sorters__sorter-by-date'
                onClick={sortByDate}
            >
                <SortByDate className='sorters__sorter-by-date-icon' />
            </button>
        </div >
    );
};

export default Sorters;