import { AUTH_URL, LOGOUT_URL, REFRESH_TOKEN_URL, REGISTER_USER_URL } from "../constants/url";
import { makeRequest } from "../helpers";

type EntryType = (username: string, password: string) => Promise<any>;

export const singUp: EntryType = async (username, password) => {
    return makeRequest(REGISTER_USER_URL, 'POST', { username, password });
};

export const login: EntryType = async (username, password) => {
    return makeRequest(AUTH_URL, 'POST', { username, password });
};

export const logout = async () => {
    return makeRequest(LOGOUT_URL, 'POST');
};

export const refreshToken = async() => {
    return makeRequest(REFRESH_TOKEN_URL, 'GET');
}
