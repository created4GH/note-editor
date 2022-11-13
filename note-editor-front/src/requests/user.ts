import { AUTH_URL, REGISTER_USER_URL } from "../constants/url";
import { makeRequest } from "../helpers";

type AuthType = (username: string, password: string) => Promise<any>;


export const login: AuthType = async (username, password) => {
    return makeRequest(AUTH_URL, 'post', { username, password });
};

export const logout = async () => {
    const url = AUTH_URL + '/logout';
    return makeRequest(url, 'post');
};

export const register: AuthType = async (username, password) => {
    return makeRequest(REGISTER_USER_URL, 'post', { username, password });
};