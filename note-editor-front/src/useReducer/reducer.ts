import { getIsLoggedInFromLocalStorage } from "../helpers";
import { NoteType } from "../interfaces/common";
import { Actions } from "./actions";
import { ActionsType, StateType } from "./interfaces";

export const initialState: StateType = {
    isLoggedIn: getIsLoggedInFromLocalStorage(),
    notes: [],
    displayNotes: [],
    selectedNote: null,
    shouldselectedNoteBeAutoUpdated: true,
    shouldTitleBeAutofocused: true,
    isDataFetching: true,
    isDisplayUserForm: false,
};


export const reducer = (state: StateType, action: ActionsType) => {
    const { type, payload } = action;
    // console.log(type, payload)
    switch (type) {
        case Actions.SET_IS_LOGGED_IN:
            return { ...state, isLoggedIn: payload as boolean };
            break;
        case Actions.SET_NOTES:
            return { ...state, notes: payload as NoteType[], displayNotes: payload as NoteType[] };
            break;
        case Actions.SET_DISPLAY_NOTES:
            return { ...state, displayNotes: payload as NoteType[] };
            break;
        case Actions.SET_SELECTED_NOTE:
            return { ...state, selectedNote: payload as NoteType };
            break;
        case Actions.SET_SHOULD_CHOSEN_NOTE_BE_AUTO_UPDATED:
            return { ...state, shouldselectedNoteBeAutoUpdated: payload as boolean };
            break;
        case Actions.SET_SHOULD_TITLE_BE_AUTOFOCUSED:
            return { ...state, shouldTitleBeAutofocused: payload as boolean };
            break;
        case Actions.SET_IS_DATA_FETCHING:
            return { ...state, isDataFetching: payload as boolean };
            break;
        case Actions.SET_IS_DISPLAY_AUTH_FORM:
            return { ...state, isDisplayUserForm: payload as boolean };
            break;
        default:
            return state;
            break;
    }
}

export type ReducerType = ReturnType<typeof reducer>;