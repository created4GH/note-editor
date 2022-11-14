import { NoteType } from "../interfaces/common";
import { Actions } from "./actions";

export interface StateType {
    isLoggedIn: boolean;
    notes: NoteType[];
    displayNotes: NoteType[];
    displayNotesCallback: DisplayNotesCallback | null;
    selectedNote: NoteType | null;
    shouldTitleBeAutofocused: boolean;
    isDataFetching: boolean;
    isDisplayEntryForm: boolean;
}

export type Payload = NoteType[] | NoteType | boolean | DisplayNotesCallback | null;

export interface ActionsType {
    type: Actions;
    payload?: Payload;
}

export type DisplayNotesCallback = ((notes: NoteType[]) => NoteType[]);
