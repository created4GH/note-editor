import React, { useContext, useState } from 'react';

import { ReactComponent as SortByTitle } from "../../assets/svg/icons/sort-by-title.svg";
import { ReactComponent as SortByDate } from "../../assets/svg/icons/sort-by-date.svg";

import { NoteType } from '../../interfaces';
import { DispatchContext } from '../../contexts';
import { Actions } from '../../reducer';

import './style.scss';

interface Props {
    notes: NoteType[]
}

type Parameter = "title" | "createdDate";


const Sorters: React.FC<Props> = ({ notes }) => {
    const dispatch = useContext(DispatchContext)!;
    const [dateSortOrder, updateDateSortOrder] = useState<string>("desc");
    const [titleSortOrder, updateTitleSortOrder] = useState<string>("desc");

    const sortBy = (parameter: Parameter, order: string,
        callback: React.Dispatch<React.SetStateAction<string>>) => {
        const isDescOrder = order === "desc";
        const newNotes = [...notes.sort((a, b) => {
            return (isDescOrder && a[parameter] > b[parameter]) ? 1 : -1;
        })];
        dispatch({ type: Actions.UPDATE_DISPLAY_NOTES, payload: newNotes });
        callback(isDescOrder ? "asc" : "desc");
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