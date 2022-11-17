import { REQUEST_OPTIONS } from "../constants/request";
import { Actions } from "../useReducer/actions";
import { ActionsType, Payload } from "../useReducer/interfaces";

interface RequestParams {
    headers: { [key: string]: string },
    method: string,
    body?: string
}

type MakeRequestType = (url: string, method: string,
    body?: { [key: string]: string } | null) => Promise<any>;


export const makeRequest: MakeRequestType = async (url, method, body) => {
    if (!navigator.onLine) throw new Error('No Internet Connection');
    const requestParams: RequestParams = {
        ...REQUEST_OPTIONS,
        method
    };
    if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
        requestParams.headers['Content-Type'] = 'application/json';
    }
    if (body) {
        const stringifiedBody = JSON.stringify({ ...body });
        requestParams.body = stringifiedBody;
    }
    const rawData = await fetch(url, requestParams);
    const data = rawData.headers.get('content-type')?.includes('application/json')
        ? await rawData.json() : rawData;
    if (rawData.ok) return data;
    const error = typeof data === 'string' ? data : data.statusText;
    throw new Error(error);
};