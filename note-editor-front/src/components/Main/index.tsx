import React, { useState, useContext, useEffect } from 'react';

import FullNote from '../FullNote';
import NotesList from '../NotesList';
import SaveConfirmation from '../SaveConfirmation';

import { DispatchContext, StateContext } from '../../contexts';

import './style.scss';
import { NoteType } from '../../interfaces/common';
import { getHandleDispatch, retreieveNotes } from '../../helpers';
import { Actions } from '../../useReducer/actions';
import Loader from '../Loader/MainLoader';
import { getNotes } from '../../requests/notes';
const { SET_NOTES, SET_IS_DATA_FETCHING,
    SET_SELECTED_NOTE, } = Actions;

const Main = () => {
    const { notes, displayNotes, isDataFetching, isLoggedIn, selectedNote } = useContext(StateContext);
    const dispatch = useContext(DispatchContext)!;

    // const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
    const [newNoteElement, setNewNoteElement] = useState<JSX.Element | null>(null);
    const [wasSaved, setWasSaved] = useState<boolean>(false);
    const [isSavingFetching, setIsSavingFetching] = useState<boolean>(false);
    const handleDispatch = getHandleDispatch(dispatch);

    const setNotes = async () => {
        handleDispatch(SET_IS_DATA_FETCHING, true);
        const notes: NoteType[] = await retreieveNotes(isLoggedIn);
        if (notes.length) {
            handleDispatch(SET_NOTES, notes);
            handleDispatch(SET_SELECTED_NOTE, notes[0]);
        }
        handleDispatch(SET_IS_DATA_FETCHING, false);
    }

    useEffect(() => {
        setNotes();
    }, [isLoggedIn]);

    useEffect(() => {
        if (wasSaved) {
            const timer = setTimeout(() => {
                setWasSaved(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [wasSaved])

    // useEffect(() => {
    //     if (shouldselectedNoteBeAutoUpdated && displayNotes.length) {
    //         handleDispatch(SET_SELECTED_NOTE, displayNotes[0]);
    //     }
    //     else {
    //         handleDispatch(SET_SHOULD_CHOSEN_NOTE_BE_AUTO_UPDATED, true)
    //     }
    // }, [displayNotes])

    return (
        <div className='main'>
            {isDataFetching ? <Loader />
                : <>
                    <NotesList
                        notes={notes}
                        selectedNote={selectedNote}
                        displayNotes={displayNotes}
                        newNoteElement={newNoteElement}
                        setNewNoteElement={setNewNoteElement}
                    />
                    {selectedNote
                        ? (<FullNote
                            notes={notes}
                            selectedNote={selectedNote}
                            displayNotes={displayNotes}
                            setNewNoteElement={setNewNoteElement}
                            setWasSaved={setWasSaved}
                        />)
                        : null}
                </>
            }
            {wasSaved && <SaveConfirmation />}
        </div>
    );
};

export default Main;