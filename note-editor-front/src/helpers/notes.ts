import { setStorageNotes } from "./localStorage";
import { NoteType } from "../interfaces/common";
import { addNote, getNotes, patchNote } from "../api/notes";

export const receiveNotes = async (isLoggedIn: boolean) => {
    try {
        let notes: NoteType[] = [];
        if (isLoggedIn) notes = await getNotes();
        else {
                const jsonNotes = localStorage.getItem("notes");
                notes = jsonNotes ? JSON.parse(jsonNotes) : [];
        }
        return notes;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const saveNotesAsync = async (note: NoteType, isNewNote: boolean) => {
    const apiCall = isNewNote ? addNote : patchNote;
    try {
        await apiCall(note);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const saveNotesSync = async (note: NoteType, isNewNote: boolean, notes: NoteType[]) => {
    let updatedNotes: NoteType[] = [];
    updatedNotes = isNewNote ? updatedNotes = [note, ...notes]
        : notes.map((item: NoteType) => item.id !== note.id ? item : note);
    setStorageNotes(updatedNotes);
}

export const deleteNoteSync = (note: NoteType, notes: NoteType[]) => {
    const updatedNotes: NoteType[] = notes.filter(({ id }) => id !== note.id);
    setStorageNotes(updatedNotes);
}

export const filterNotes = (value: string, notes: NoteType[]) => {
    return notes.filter(({ title }) => title.toLocaleLowerCase().includes(value));
}
