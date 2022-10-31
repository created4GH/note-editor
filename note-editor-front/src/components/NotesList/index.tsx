import React, { useMemo, useContext, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { ReactComponent as AddNewFrame } from "../../assets/svg/frames/new.svg";
import Note from './Note';

import { Actions } from '../../reducer';
import { DispatchContext } from '../../contexts';
import { NoteType } from '../../interfaces';

import './style.scss';


interface Props {
    notes: NoteType[];
    displayNotes: NoteType[];
    chosenNote: NoteType | null;
    newNoteElement: JSX.Element | null;
    setNewNoteElement: (value: React.SetStateAction<JSX.Element | null>) => void;
}

const NotesList: React.FC<Props> = (
    { notes, displayNotes, chosenNote, newNoteElement, setNewNoteElement }) => {
    console.log(chosenNote)
    const dispatch = useContext(DispatchContext)!;
    const notesListClassName = "notes-list" +
        ((notes.length || newNoteElement) ? "" : " notes-list__zero-notes");

    function chooseNote(this: NoteType) {
        if (chosenNote?.id === "dummy") {
            if (window.confirm("The new note won't be save. Are you sure to leave?")) {
                setNewNoteElement(null);
            }
            else return;
        }
        dispatch!({ type: Actions.UPDATE_CHOSEN_NOTE, payload: this });
    }
    const addNewNote = () => {
        const newNoteData: NoteType = {
            id: "dummy",
            title: "This is dummy title",
            description: "It's just a dummy description",
            createdDate: new Date().getTime(),
            modifiedDate: new Date().getTime(),
        };
        setNewNoteElement(<Note
            note={newNoteData}
            className={"notes-list__note chosen-note"}
        />);
        dispatch!({ type: Actions.UPDATE_CHOSEN_NOTE, payload: newNoteData })
    };

    useEffect(() => {
        console.log("use")
        dispatch({ type: Actions.UPDATE_CHOSEN_NOTE, payload: displayNotes[0] });
    }, [])

    const mappedTitles: JSX.Element[] = useMemo(() => {
        // console.log("displayNotes", displayNotes)
        return displayNotes?.map(note => {
            let className = 'notes-list__note' + (chosenNote?.id === note.id ? " chosen-note" : "");
            return <Note key={uuid()} note={note} className={className} chooseNote={chooseNote} />
        })
    }, [notes, chosenNote, displayNotes]);
    // console.log(displayNotes)
    return (
        <div className={notesListClassName}>
            <button
                className="notes-list__add-new-btn"
                onClick={addNewNote}
            >
                <AddNewFrame className='notes-list__add-new-btn-frame' />
                <span>+ New</span>
            </button>
            <div className="notes-list__list">
                {newNoteElement}
                {mappedTitles}
            </div>
        </div>
    );
};

export default NotesList;