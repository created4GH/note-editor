import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Formik, ErrorMessage, Form, Field } from 'formik';

import { ReactComponent as NoteFrame } from "../../assets/svg/frames/note.svg";
import { ReactComponent as TitleFrame } from "../../assets/svg/frames/title.svg";
import { ReactComponent as DescriptionFrame } from "../../assets/svg/frames/description.svg";
import { ReactComponent as SaveFrame } from "../../assets/svg/frames/save.svg";
import { ReactComponent as TrashBin } from "../../assets/svg/icons/trash-bin.svg";

import { NoteType } from '../../interfaces/common';
import { StateContext, DispatchContext } from '../../context/reducerContext';
import { fullNoteValidSchema } from '../../formik/validationSchema';
import { deleteNote } from '../../api/notes';
import { deleteNoteSync, receiveNotes, saveNotesAsync, saveNotesSync } from '../../helpers/notes';

import './style.scss';

import { Actions } from '../../useReducer/actions';
const { SET_NOTES, SET_IS_DATA_FETCHING, SET_SELECTED_NOTE,
    SET_SEARCH_INPUT, SET_GLOBAL_ERROR } = Actions;

interface Props {
    notes: NoteType[];
    displayNotes: NoteType[];
    selectedNote: NoteType | null;
    newNoteElement: JSX.Element | null;
    setNewNoteElement: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
    setWasSaved: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSavingFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ValuesType {
    title: string;
    description: string;
}

const FullNote: React.FC<Props> = ({ notes, selectedNote,
    displayNotes, newNoteElement, setNewNoteElement, setWasSaved, setIsSavingFetching
}) => {
    const handleDispatch = useContext(DispatchContext)!;
    const { shouldTitleBeAutofocused, isLoggedIn, searchInput } = useContext(StateContext);
    const titleRef = useRef<HTMLInputElement>(null);
    const [wasChanged, updateWasChanged] = useState<boolean>(false);

    const { title, description } = selectedNote!;

    const handleInput = () => updateWasChanged(true);

    const updateNotes = async (selectedNote: NoteType) => {
            handleDispatch(SET_IS_DATA_FETCHING, true);
            try {
                const notes = await receiveNotes(isLoggedIn);
                handleDispatch(SET_SELECTED_NOTE, selectedNote);
                handleDispatch(SET_NOTES, notes);
                updateWasChanged(false);
                setWasSaved(false);
                newNoteElement && setNewNoteElement(null);
            } catch (error) {
                handleDispatch(SET_GLOBAL_ERROR, ((error as Error).message));
            }
            finally {
                setTimeout(() => {
                    handleDispatch(SET_IS_DATA_FETCHING, false);
                }, 200);
            }
    }

    const save = async ({ title, description }: ValuesType) => {
        const isNewNote = selectedNote?.id === "dummy";
        if (!wasChanged && !isNewNote) return;
        let note: NoteType;
        if (isNewNote) {
            note = {
                id: uuidv4(),
                title,
                description
            };
        }
        else note = { ...selectedNote!, title, description }
        setIsSavingFetching(true);
        isLoggedIn ? await saveNotesAsync(note, isNewNote) : saveNotesSync(note, isNewNote, notes);
        setIsSavingFetching(false);
        setWasSaved(true);
        setTimeout(() => {
            updateNotes(note);
        }, 1000);
    }

    const removeNote = async () => {
        const note = selectedNote!;
        if (note?.id === "dummy") {
            setNewNoteElement(null);
            const selectedNote = displayNotes.length ? displayNotes[0] : null;
            handleDispatch(SET_SELECTED_NOTE, selectedNote);
            return;
        }
        let index = displayNotes.findIndex(({ id }) => id === note?.id);
        index += index === (displayNotes.length - 1) ? (-1) : 1;
        const indexedNote = displayNotes[index] || null;
        if (!indexedNote && searchInput) handleDispatch(SET_SEARCH_INPUT, '');
        isLoggedIn ? await deleteNote(note) : deleteNoteSync(note, notes);
        updateNotes(indexedNote);
    }

    useEffect(() => {
        shouldTitleBeAutofocused && titleRef.current?.focus();
    }, [selectedNote]);

    return (
        <Formik
            initialValues={{ title, description }}
            validationSchema={fullNoteValidSchema}
            onSubmit={save}
            enableReinitialize={true}>
            {({ values: { title, description } }: {
                values: ValuesType;
            }) =>
                <Form className="full-note">
                    <>
                        <NoteFrame className='full-note__frame' />
                        <button
                            type='button'
                            className="full-note__trash-bin-btn"
                            onClick={removeNote}>
                            <TrashBin className='full-note__trash-bin-icon' />
                        </button>
                        <div className="full-note__title-caption-wrapper">
                            <label htmlFor="title">Title</label>
                            <ErrorMessage
                                component="span"
                                className='full-note__title-error-msg'
                                name="title" />
                        </div>
                        <div className="full-note__title-wrapper">
                            <TitleFrame className="full-note__title-frame" />
                            <Field
                                name="title"
                                type="text"
                                placeholder='Type in your note title'
                                className="full-note__title-input"
                                value={title}
                                onInput={handleInput}
                                autoFocus={true}
                                innerRef={titleRef} />
                        </div>
                        <div className="full-note__description-caption-wrapper">
                            <label
                                className="full-note__description-caption"
                                htmlFor="description">
                                Description
                            </label>
                            <ErrorMessage
                                component="span"
                                className='full-note__description-error-msg'
                                name="description" />
                        </div>
                        <div className="full-note__description-wrapper">
                            <DescriptionFrame className="full-note__description-frame" />
                            <Field
                                name="description"
                                as="textarea"
                                placeholder='Type in your note content'
                                className="full-note__description-textarea"
                                value={description}
                                onInput={handleInput} />
                        </div>
                        <button
                            type='submit'
                            className="full-note__save-btn">
                            <SaveFrame className='full-note__save-btn-frame' />
                            <span>Save</span>
                        </button>
                    </>
                </Form >
            }
        </Formik >
    );
};

export default FullNote;