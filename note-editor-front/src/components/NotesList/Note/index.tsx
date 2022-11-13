import React, { MouseEventHandler } from 'react';
import { NoteType } from '../../../interfaces/common';

import { ReactComponent as NoteOfListFrame } from "../../../assets/svg/frames/note-of-list.svg";

interface Props {
    note: NoteType;
    className: string;
    selectNote?: (note: NoteType) => void;
}

const Note: React.FC<Props> = ({ note, className, selectNote }) => {

    return (
        <button
            key={"notes-list_" + note.id}
            className={className}
            onClick={selectNote && (() => selectNote!(note))}
        >
            <NoteOfListFrame className='notes-list__note-frame' />
            <span>{note.title}</span>
        </button>
    );
};

export default Note;