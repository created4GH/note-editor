import { setStorageNotes } from ".";
import { NoteType } from "../interfaces/common";
import { addNote, patchNote } from "../requests/notes";

export const saveNotesAsync = async (note: NoteType, isNewNote: boolean) => {
    const apiCall = isNewNote ? addNote : patchNote;
    try {
        await apiCall(note);
        setWasSaved(true);
    } catch (error) {
        console.log(error)
    }
}

export const saveNotesSync = async (note: NoteType, isNewNote: boolean, notes : NoteType[]) => {
    let updatedNotes: NoteType[] = [];
    updatedNotes = isNewNote ? updatedNotes = [note, ...notes]
        : notes.map((item: NoteType) => item.id !== note.id ? item : note);
    setStorageNotes(updatedNotes);
}

export const deleteNoteSync = (note : NoteType, notes : NoteType[]) => {
    const updatedNotes: NoteType[] = notes.filter(({ id }) => id !== note.id);
    setStorageNotes(updatedNotes);
}

function setWasSaved(arg0: boolean) {
    throw new Error("Function not implemented.");
}
