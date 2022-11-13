import { NOTES_URL } from "../constants/url";
import { makeRequest } from "../helpers";
import { NoteType, HandleNoteChange } from "../interfaces/common";

export const getNotes = async () => {
    return makeRequest(NOTES_URL, 'GET');
}

export const addNote: HandleNoteChange = async ({ id, title, description }) => {
    return makeRequest(NOTES_URL, 'POST', { id, title, description });
}

export const patchNote: HandleNoteChange = async ({ id, title, description }) => {
    return makeRequest(NOTES_URL, 'PATCH', { id, title, description });
}

export const deleteNote: HandleNoteChange = async ({ id }) => {
    return makeRequest(NOTES_URL, 'DELETE', { id });
}