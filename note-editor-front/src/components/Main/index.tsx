import React, { useState, useContext, useEffect } from 'react';

import FullNote from '../FullNote';
import NotesList from '../NotesList';
import SaveConfirmation from '../SaveConfirmation';

import { StateContext } from '../../contexts';

import './style.scss';

const Main = () => {
    const { notes, chosenNote, displayNotes } = useContext(StateContext);
    const [newNoteElement, setNewNoteElement] = useState<JSX.Element | null>(null);
    const [wasSaved, updateWasSaved] = useState<boolean>(false);

    useEffect(() => {
        // console.log("useffectt")
        if (wasSaved) {
        // console.log("changes")
            const timer = setTimeout(() => {
                updateWasSaved(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [wasSaved])

    return (
        <div className='main'>
            <NotesList
                notes={notes}
                chosenNote={chosenNote}
                displayNotes={displayNotes}
                newNoteElement={newNoteElement}
                setNewNoteElement={setNewNoteElement}
            />
            {
                (notes.length || newNoteElement)
                && <FullNote
                    notes={notes}
                    chosenNote={chosenNote}
                    displayNotes={displayNotes}
                    setNewNoteElement={setNewNoteElement}
                    updateWasSaved={updateWasSaved}
                />
                || null
            }
            {wasSaved && <SaveConfirmation />}
        </div>
    );
};

export default Main;