interface RequestOptions {
    credentials: RequestCredentials,
    headers: {
        'Content-Type'?: string;
        'Access-Control-Allow-Origin': string;
    }
}

export const REQUEST_OPTIONS : RequestOptions = {
    credentials: 'include',
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
    }
};