import { type } from "os";
import { NoteType } from "./interfaces";

export enum Actions {
    UPDATE_IS_LOGGED_IN = "UPDATE_IS_LOGGED_IN",
    UPDATE_NOTES = "UPDATE_NOTES",
    UPDATE_DISPLAY_NOTES = "UPDATE_DISPLAY_NOTES",
    UPDATE_CHOSEN_NOTE = "UPDATE_CHOSEN_NOTE",
    UPDATE_SHOULD_TITLE_BE_AUTOFOCUSED = "UPDATE_SHOULD_TITLE_BE_AUTO_FOCUSED",
}

export interface StateType {
    isLoggedIn: boolean;
    notes: NoteType[];
    displayNotes: NoteType[];
    chosenNote: NoteType | null;
    shouldTitleBeAutofocused: boolean;
}

export interface ActionsType {
    type: Actions;
    payload?: NoteType[] | NoteType | boolean | null;
}

export const initialState: StateType = {
    isLoggedIn: false,
    notes: [],
    displayNotes: [],
    chosenNote: null,
    shouldTitleBeAutofocused: true
};


export const reducer = (state: StateType, action: ActionsType) => {
    const { type, payload } = action;
    console.log(type, payload)
    switch (type) {
        case Actions.UPDATE_IS_LOGGED_IN:
            return { ...state, isLoggedIn: payload as boolean };
            break;
        case Actions.UPDATE_NOTES:
            return { ...state, notes: payload as NoteType[], displayNotes: payload as NoteType[] };
            break;
        case Actions.UPDATE_DISPLAY_NOTES:
            return { ...state, displayNotes: payload as NoteType[] };
            break;
        case Actions.UPDATE_CHOSEN_NOTE:
            return { ...state, chosenNote: payload as NoteType | null };
            break;
        case Actions.UPDATE_SHOULD_TITLE_BE_AUTOFOCUSED:
            return { ...state, shouldTitleBeAutofocused: payload as boolean };
            break;
        default:
            return state;
            break;
    }
}

export type ReducerType = ReturnType<typeof reducer>;