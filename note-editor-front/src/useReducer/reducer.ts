import { getIsLoggedInFromLocalStorage } from "../helpers/localStorage";
import { NoteType } from "../interfaces/common";
import { ActionsType, SortDisplayNotes, StateType } from "./interfaces";
import { Actions } from "./actions";
import { filterNotes } from "../helpers/notes";

export const initialState: StateType = {
    isLoggedIn: getIsLoggedInFromLocalStorage(),
    notes: [],
    displayNotes: [],
    sortDisplayNotes: null,
    selectedNote: null,
    searchInput: '',
    shouldTitleBeAutofocused: true,
    isDataFetching: true,
    globalError: '',
};

export const reducer = (state: StateType, action: ActionsType) => {
    const { type, payload } = action;
    switch (type) {
        case Actions.SET_IS_LOGGED_IN:
            return { ...state, isLoggedIn: payload as boolean };
            break;
        case Actions.SET_NOTES:
            const { searchInput, sortDisplayNotes, selectedNote } = state;
            const notes = payload as NoteType[];
            let displayNotes = notes;
            if (sortDisplayNotes) displayNotes = sortDisplayNotes(displayNotes);
            if (searchInput) displayNotes = filterNotes(searchInput, notes);
            const newSelectedNote = (displayNotes.length && !selectedNote) ?
                displayNotes[0] : selectedNote;
            return {
                ...state,
                notes: notes,
                displayNotes: displayNotes,
                selectedNote: newSelectedNote
            };
            break;
        case Actions.SET_DISPLAY_NOTES:
            return { ...state, displayNotes: payload as NoteType[] };
            break;
        case Actions.SET_SORT_DISPLAY_NOTES:
            return { ...state, sortDisplayNotes: payload as SortDisplayNotes | null };
            break;
        case Actions.SET_SELECTED_NOTE:
            return { ...state, selectedNote: payload as NoteType | null };
            break;
        case Actions.SET_SEARCH_INPUT:
            return { ...state, searchInput: payload as string };
            break;
        case Actions.SET_SHOULD_TITLE_BE_AUTOFOCUSED:
            return { ...state, shouldTitleBeAutofocused: payload as boolean };
            break;
        case Actions.SET_IS_DATA_FETCHING:
            return { ...state, isDataFetching: payload as boolean };
            break;
        case Actions.SET_GLOBAL_ERROR:
            return { ...state, globalError: payload as string | null };
            break;
        default:
            return state;
            break;
    }
}

export type ReducerType = ReturnType<typeof reducer>;