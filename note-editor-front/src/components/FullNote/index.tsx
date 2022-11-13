import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Formik, ErrorMessage, Form, Field } from 'formik';

import { ReactComponent as NoteFrame } from "../../assets/svg/frames/note.svg";
import { ReactComponent as TitleFrame } from "../../assets/svg/frames/title.svg";
import { ReactComponent as DescriptionFrame } from "../../assets/svg/frames/description.svg";
import { ReactComponent as SaveFrame } from "../../assets/svg/frames/save.svg";
import { ReactComponent as TrashBin } from "../../assets/svg/icons/trash-bin.svg";

import { HandleNoteChange, NoteType } from '../../interfaces/common';
import { DispatchContext, StateContext } from '../../contexts';

import './style.scss';
import { fullNoteValidSchema } from '../../formik/validationSchema';
import { addNote, deleteNote, getNotes, patchNote } from '../../requests/notes';
import { getHandleDispatch, retreieveNotes, setStorageNotes } from '../../helpers';
import { Actions } from '../../useReducer/actions';
import { deleteNoteSync, saveNotesAsync, saveNotesSync } from '../../helpers/notes';
const { SET_NOTES, SET_IS_DATA_FETCHING,
    SET_SELECTED_NOTE, SET_SHOULD_CHOSEN_NOTE_BE_AUTO_UPDATED } = Actions;

interface Props {
    notes: NoteType[];
    displayNotes: NoteType[];
    selectedNote: NoteType | null;
    setNewNoteElement: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
    setWasSaved: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ValuesType {
    title: string;
    description: string;
}
type CbType = ({ id }: NoteType) => NoteType;
type ArrayMethod = <U>(callbackfn: (value: NoteType, index: number, array: NoteType[])
    => U, thisArg?: any) => U[];


const FullNote: React.FC<Props> = ({ notes, selectedNote,
    displayNotes,
    setNewNoteElement, setWasSaved,
}) => {

    const dispatch = useContext(DispatchContext)!;
    const handleDispatch = getHandleDispatch(dispatch);
    const { shouldTitleBeAutofocused, isLoggedIn } = useContext(StateContext);

    const titleRef = useRef<HTMLInputElement>(null);
    const [wasChanged, updateWasChanged] = useState<boolean>(false);

    const { title, description } = selectedNote!;
    const handleInput = () => updateWasChanged(true);

    // const updateNotes = async () => {
    //     handleDispatch(SET_IS_DATA_FETCHING, true);
    //     const updatedNotes = isLoggedIn ? await getNotes()
    //         : updateNotesSync(note, requestType, isDelete);
    //     if (!isDelete) {
    //         handleDispatch(SET_SELECTED_NOTE, note);
    //         // handleDispatch(SET_SHOULD_CHOSEN_NOTE_BE_AUTO_UPDATED, false);
    //     };
    //     handleDispatch(SET_IS_DATA_FETCHING, false);
    // }

    const save = async ({ title, description }: ValuesType) => {
        const isNewNote = selectedNote?.id === "dummy";
        if (!wasChanged && !isNewNote) return;
        handleDispatch(SET_IS_DATA_FETCHING, true);
        let note: NoteType;
        if (isNewNote) {
            note = {
                id: uuidv4(),
                title,
                description
            };
        }
        else note = { ...selectedNote!, title, description }
        isLoggedIn ? await saveNotesAsync(note, isNewNote) : saveNotesSync(note, isNewNote, notes);
        handleDispatch(SET_IS_DATA_FETCHING, false);
        setWasSaved(true);
        setTimeout(async () => {
            const notes = await retreieveNotes(isLoggedIn);
            handleDispatch(SET_NOTES, notes);
            updateWasChanged(false);
            setNewNoteElement(null);
        }, 1000);
    }

    const removeNote = async () => {
        const note = selectedNote!;
        if (note?.id === "dummy") {
            setNewNoteElement(null);
            displayNotes.length && handleDispatch(SET_SELECTED_NOTE, displayNotes[0]);
            return;
        }
        let index = displayNotes.findIndex(({ id }) => id === note?.id);
        index += index === (displayNotes.length - 1) ? (-1) : 1;
        isLoggedIn ? await deleteNote(note) : deleteNoteSync(note, notes);
        // updateNotes(note, 'delete');
        const indexedNote = displayNotes[index] || null;
        handleDispatch(SET_SELECTED_NOTE, indexedNote);
        handleDispatch(SET_SHOULD_CHOSEN_NOTE_BE_AUTO_UPDATED, false);
    }

    useEffect(() => {
        shouldTitleBeAutofocused && titleRef.current?.focus();
    }, [selectedNote]);

    return (
        <Formik
            initialValues={{ title, description }}
            validationSchema={fullNoteValidSchema}
            onSubmit={save}
            enableReinitialize={true}
        >
            {({ values: { title, description } }: {
                values: ValuesType;
            }) =>
                <Form className="full-note">
                    <>
                        <NoteFrame className='full-note__frame' />
                        <button
                            type='button'
                            className="full-note__trash-bin-btn"
                            onClick={removeNote}
                        >
                            <TrashBin className='full-note__trash-bin-icon' />
                        </button>
                        <div className="full-note__title-caption-wrapper">
                            <label htmlFor="title">Title</label>
                            <ErrorMessage
                                component="span"
                                className='full-note__title-error-msg'
                                name="title"
                            />
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
                                innerRef={titleRef}
                            />
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
                                name="description"
                            />
                        </div>
                        <div className="full-note__description-wrapper">
                            <DescriptionFrame className="full-note__description-frame" />
                            <Field
                                name="description"
                                as="textarea"
                                placeholder='Type in your note content'
                                className="full-note__description-textarea"
                                value={description}
                                onInput={handleInput}
                            />
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