import React, { useMemo, useContext } from 'react';
import { v4 as uuid } from 'uuid';

import { ReactComponent as AddNewFrame } from "../../assets/svg/frames/new.svg";
import Note from './Note';

import { DispatchContext } from '../../context/reducerContext';
import { NoteType } from '../../interfaces/common';

import './style.scss';

import { Actions } from '../../useReducer/actions';
const { SET_SELECTED_NOTE } = Actions;


interface Props {
    notes: NoteType[];
    displayNotes: NoteType[];
    selectedNote: NoteType | null;
    newNoteElement: JSX.Element | null;
    setNewNoteElement: (value: React.SetStateAction<JSX.Element | null>) => void;
}

const NotesList: React.FC<Props> = ({ notes, displayNotes, selectedNote, newNoteElement,
    setNewNoteElement }) => {
    const handleDispatch = useContext(DispatchContext)!;
    const notesListClassName = "notes-list" +
        ((notes.length || newNoteElement) ? '' : " notes-list--zero-notes");
    const listClassName = 'notes-list__list' +
        ((notes.length && notes.length < 3) ? ' notes-list__list--centered' : '');

    const addNewNote = () => {
        const newNote: NoteType = {
            id: "dummy",
            title: "This is dummy title",
            description: "It's just a dummy description",
        };
        setNewNoteElement(<Note note={newNote} className={"notes-list__note chosen-note"} />);
        handleDispatch(SET_SELECTED_NOTE, newNote);
    };
    const selectNote = (note: NoteType) => {
        if (selectedNote?.id === "dummy") {
            const isLeaving = window.confirm("The new note won't be save. Are you sure to leave?");
            if (!isLeaving) return;
            setNewNoteElement(null);
        }
        handleDispatch(SET_SELECTED_NOTE, note);
    }

    const mappedTitles: JSX.Element[] = useMemo(() => {
        return displayNotes?.map(note => {
            let className = 'notes-list__note' +
                (selectedNote?.id === note.id ? ' chosen-note' : '');
            return <Note key={uuid()} note={note} className={className} selectNote={selectNote} />
        })
    }, [notes, selectedNote, displayNotes]);

    return (
        <div className={notesListClassName}>
            <button
                className="notes-list__add-new-btn"
                onClick={addNewNote}
            >
                <AddNewFrame className='notes-list__add-new-btn-frame' />
                <span>+ New</span>
            </button>
            <div className={listClassName}>
                {newNoteElement}
                {mappedTitles}
            </div>
        </div>
    );
};

export default NotesList;