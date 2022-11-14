import { getIsLoggedInFromLocalStorage } from "../helpers";
import { NoteType } from "../interfaces/common";
import { Actions } from "./actions";
import { ActionsType, DisplayNotesCallback, StateType } from "./interfaces";

export const initialState: StateType = {
    isLoggedIn: getIsLoggedInFromLocalStorage(),
    notes: [],
    displayNotes: [],
    displayNotesCallback: null,
    selectedNote: null,
    shouldTitleBeAutofocused: true,
    isDataFetching: true,
    isDisplayEntryForm: false,
};


export const reducer = (state: StateType, action: ActionsType) => {
    const { type, payload } = action;
    switch (type) {
        case Actions.SET_IS_LOGGED_IN:
            return { ...state, isLoggedIn: payload as boolean };
            break;
        case Actions.SET_NOTES:
            const { displayNotesCallback } = state;
            const notes = payload as NoteType[];
            const displayNotes: NoteType[] = displayNotesCallback ?
                displayNotesCallback(notes) : notes;
            return { ...state, notes: notes, displayNotes: displayNotes };
            break;
        case Actions.SET_DISPLAY_NOTES:
            return { ...state, displayNotes: payload as NoteType[] };
            break;
        case Actions.SET_DISPLAY_NOTES_CALLBACK:
            return { ...state, displayNotesCallback: payload as DisplayNotesCallback | null };
            break;
        case Actions.SET_SELECTED_NOTE:
            return { ...state, selectedNote: payload as NoteType };
            break;
        case Actions.SET_SHOULD_TITLE_BE_AUTOFOCUSED:
            return { ...state, shouldTitleBeAutofocused: payload as boolean };
            break;
        case Actions.SET_IS_DATA_FETCHING:
            return { ...state, isDataFetching: payload as boolean };
            break;
        case Actions.SET_IS_DISPLAY_AUTH_FORM:
            return { ...state, isDisplayEntryForm: payload as boolean };
            break;
        default:
            return state;
            break;
    }
}

export type ReducerType = ReturnType<typeof reducer>;