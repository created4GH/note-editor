import { Keys, TTL } from "../constants/localStorage";
import { NoteType } from "../interfaces/common";

export const getIsLoggedInFromLocalStorage = () => {
    let storageItem = localStorage.getItem(Keys.IS_LOGGED_IN);
    if (!storageItem) return false;
    const { ttl } = JSON.parse(storageItem);
    const timeDifference = ttl - Date.now();
    if (timeDifference > 0) return true;
    localStorage.removeItem(Keys.IS_LOGGED_IN);
    return false;
}

export const setStorageNotes = (notes: NoteType[]) =>
    localStorage.setItem(Keys.NOTES, JSON.stringify(notes));

export const setStorageIsLoggedIn = () => {
    const storageItem = JSON.stringify({
        isLoggedIn: true,
        ttl: Date.now() + TTL.IS__LOGGED_IN_TTL
    });
    localStorage.setItem(Keys.IS_LOGGED_IN, storageItem);
} 
