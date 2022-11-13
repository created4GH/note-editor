import { NoteType } from "../interfaces/common";
import { Actions } from "./actions";

export interface StateType {
    isLoggedIn: boolean;
    notes: NoteType[];
    displayNotes: NoteType[];
    selectedNote: NoteType | null;
    shouldselectedNoteBeAutoUpdated: boolean;
    shouldTitleBeAutofocused: boolean;
    isDataFetching: boolean;
    isDisplayUserForm: boolean;
}

export type Payload = NoteType[] | NoteType | boolean | null;

export interface ActionsType {
    type: Actions;
    payload?: Payload;
}