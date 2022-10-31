import React from 'react';
import { NoteType } from '../../../interfaces';

import { ReactComponent as NoteOfListFrame } from "../../../assets/svg/frames/note-of-list.svg";

interface Props{
    note: NoteType;
    className: string;
    chooseNote?: (this: NoteType) => void;
}

const Note : React.FC<Props> = ({note, className, chooseNote}) => {
    return (
        <button
            key={"notes-list_" + note.id}
            className={className}
            onClick={chooseNote?.bind(note)}
        >
            <NoteOfListFrame className='notes-list__note-frame' />
            <span>{note.title}</span>
        </button>
    );
};

export default Note;