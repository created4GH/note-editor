import { NoteType } from "../interfaces/common";
import { Actions } from "./actions";

export interface StateType {
    isLoggedIn: boolean;
    notes: NoteType[];
    displayNotes: NoteType[];
    sortDisplayNotes: SortDisplayNotes | null;
    selectedNote: NoteType | null;
    searchInput: string;
    shouldTitleBeAutofocused: boolean;
    isDataFetching: boolean;
    isDisplayEntryForm: boolean;
    globalError: string | null;
}

export type Payload = NoteType[] | NoteType | boolean | null | string | SortDisplayNotes;

export interface ActionsType {
    type: Actions;
    payload?: Payload;
}

export type SortDisplayNotes = ((notes: NoteType[]) => NoteType[]);
