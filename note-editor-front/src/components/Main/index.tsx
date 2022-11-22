import { useState, useContext, useEffect } from 'react';

import FullNote from '../FullNote';
import NotesList from '../NotesList';
import Loader from '../loaders/MainLoader';
import Saving from '../Saving';

import { StateContext, DispatchContext } from '../../context/reducerContext';
import { NoteType } from '../../interfaces/common';
import { receiveNotes } from '../../helpers/notes';

import './style.scss';

import { Actions } from '../../useReducer/actions';
const { SET_NOTES, SET_IS_DATA_FETCHING,
    SET_SELECTED_NOTE, SET_GLOBAL_ERROR } = Actions;

const Main = () => {
    const { notes, displayNotes, isDataFetching, isLoggedIn, selectedNote } = useContext(StateContext);
    const handleDispatch = useContext(DispatchContext)!;

    const [newNoteElement, setNewNoteElement] = useState<JSX.Element | null>(null);
    const [wasSaved, setWasSaved] = useState<boolean>(false);
    const [isSavingFetching, setIsSavingFetching] = useState<boolean>(false);

    const setNotes = async () => {
        handleDispatch(SET_IS_DATA_FETCHING, true);
        let notes: NoteType[];
        try {
            notes = await receiveNotes(isLoggedIn);
            handleDispatch(SET_NOTES, notes);
            if (notes.length) {
                handleDispatch(SET_SELECTED_NOTE, notes[0]);
            }
        } catch (error) {
            handleDispatch(SET_GLOBAL_ERROR, (error as Error).message);
        }
        finally {
            handleDispatch(SET_IS_DATA_FETCHING, false);
        }
    }

    useEffect(() => {
        setNotes();
    }, [isLoggedIn]);

    useEffect(() => {
        if (wasSaved) {
            const timer = setTimeout(() => {
                setWasSaved(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [wasSaved])

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
                            newNoteElement={newNoteElement}
                            setNewNoteElement={setNewNoteElement}
                            setWasSaved={setWasSaved}
                            setIsSavingFetching={setIsSavingFetching}
                        />)
                        : null}
                </>
            }
            {(isSavingFetching || wasSaved) && <Saving isSavingFetching={isSavingFetching} />}
        </div>
    );
};

export default Main;