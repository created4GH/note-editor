import { Keys } from "../constants/localStorage";
import { REQUEST_OPTIONS } from "../constants/request";
import { NoteType } from "../interfaces/common";
import { getNotes } from "../requests/notes";
import { Actions } from "../useReducer/actions";
import { ActionsType, Payload } from "../useReducer/interfaces";

interface RequestParams {
    headers: { [key: string]: string },
    method: string,
    body?: string
}

type MakeRequestType = (url: string, method: string, body?: { [key: string]: string }) => Promise<any>;

export const makeRequest: MakeRequestType = async (url, method, body) => {
    const requestParams: RequestParams = {
        ...REQUEST_OPTIONS,
        method
    };
    if (body) {
        const stringifiedBody = JSON.stringify({ ...body });
        requestParams.body = stringifiedBody;
    }
    const rawData = await fetch(url, requestParams);
    const data = rawData.headers.get('content-type')?.includes('application/json')
        ? await rawData.json() : rawData;
    if (rawData.ok) return data;
    throw new Error(data);
};

export const getIsLoggedInFromLocalStorage = () => {
    let storageItem = localStorage.getItem(Keys.IS_LOGGED_IN);
    if (!storageItem) return false;
    const { ttl } = JSON.parse(storageItem);
    const timeDifference = ttl - Date.now();
    if (timeDifference > 0) return true;
    localStorage.removeItem(Keys.IS_LOGGED_IN);
    return false;
}

export const getHandleDispatch = (dispatch: React.Dispatch<ActionsType>) => (
    type: Actions, payload: Payload) => dispatch({ type, payload });

export const retreieveNotes = async (isLoggedIn: boolean) => {
    let notes: NoteType[] = [];
    if (isLoggedIn) notes = await getNotes();
    else {
        const jsonNotes = localStorage.getItem("notes");
        notes = jsonNotes ? JSON.parse(jsonNotes) : [];
    }
    return notes;
}

export const setStorageNotes = (notes: NoteType[]) =>
    localStorage.setItem(Keys.NOTES, JSON.stringify(notes));
