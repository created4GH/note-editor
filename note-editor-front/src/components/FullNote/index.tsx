import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import * as Yup from 'yup';

import { ReactComponent as NoteFrame } from "../../assets/svg/frames/note.svg";
import { ReactComponent as TitleFrame } from "../../assets/svg/frames/title.svg";
import { ReactComponent as DescriptionFrame } from "../../assets/svg/frames/description.svg";
import { ReactComponent as SaveFrame } from "../../assets/svg/frames/save.svg";
import { ReactComponent as TrashBin } from "../../assets/svg/icons/trash-bin.svg";

import { Actions } from '../../reducer';
import { NoteType } from '../../interfaces';
import { DispatchContext, StateContext } from '../../contexts';

import './style.scss';

interface Props {
    notes: NoteType[];
    displayNotes: NoteType[];
    chosenNote: NoteType | null;
    setNewNoteElement: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
    updateWasSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ValuesType {
    title: string;
    description: string;
}

const FullNote: React.FC<Props> = ({ notes, chosenNote, displayNotes,
    setNewNoteElement, updateWasSaved }) => {
    const dispatch = useContext(DispatchContext)!;
    const { shouldTitleBeAutofocused } = useContext(StateContext);

    const titleRef = useRef<HTMLInputElement>(null);
    const [wasChanged, updateWasChanged] = useState<boolean>(false);
    const { title, description } = chosenNote!;
    const handleInput = () => updateWasChanged(true);

    const updateNotes = (newNotes: NoteType[], chosenNoteIndex: number) => {
        console.log("notes list", newNotes[chosenNoteIndex])
        localStorage.setItem("notes", JSON.stringify(newNotes));
        dispatch({ type: Actions.UPDATE_NOTES, payload: newNotes });
        dispatch({ type: Actions.UPDATE_CHOSEN_NOTE, payload: newNotes[chosenNoteIndex] });
    }

    const saveNote = ({ title, description }: ValuesType) => {
        if (wasChanged) {
            const isNewNote = chosenNote?.id === "dummy";
            let note: NoteType;
            let newNotes: NoteType[];
            let chosenNoteIndex: number = 0;
            if (isNewNote) {
                note = {
                    id: uuidv4(),
                    title,
                    description,
                    createdDate: new Date().getTime(),
                    modifiedDate: new Date().getTime(),
                };
                newNotes = [note, ...notes];
                setNewNoteElement(null);
            }
            else {
                note = { ...chosenNote!, title, description };
                newNotes = notes.map((item, index) => {
                    if (item.id === chosenNote!.id) {
                        chosenNoteIndex = index;
                        return note;
                    }
                    return item;
                })
            }
            updateNotes(newNotes, chosenNoteIndex);
            updateWasChanged(false);
            updateWasSaved(true);
        }
    }

    const deleteNote = () => {
        if (chosenNote?.id === "dummy") {
            setNewNoteElement(null);
            dispatch({ type: Actions.UPDATE_CHOSEN_NOTE, payload: displayNotes[0] });
            return;
        }
        let chosenNoteIndex: number = 0;
        const newNotes = notes.filter(({ id }, index) => {
            if (id === chosenNote?.id) {
                chosenNoteIndex = index;
                return false;
            }
            return true;
        });
        updateNotes(newNotes, chosenNoteIndex);
    }

    const setLength = (length: string): string => `Must be ${length} chars`;
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(3, setLength("3-5"))
            .max(50, setLength("3-5"))
            .required("Required!"),
        description: Yup.string()
            .required("Required!")
            .min(5, setLength("5-300"))
            .max(300, setLength("5-300"))
    });

    useEffect(() => {
        shouldTitleBeAutofocused && titleRef.current?.focus();
    }, [chosenNote]);

    return (
        <Formik
            initialValues={{ title, description }}
            validationSchema={validationSchema}
            onSubmit={saveNote}
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
                            onClick={deleteNote}
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