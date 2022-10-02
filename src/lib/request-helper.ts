import { RequestInit, HeadersInit, Headers } from 'node-fetch';
import { 
    Lists,
    DeleteOption,
    UpdateOption
 } from '../interfaces/Icomodity';

const headers:Headers = new Headers();
headers.append('Content-Type', 'application/json');

const postOption = (body: Lists[]):RequestInit => {
    return {
        headers,
        body: JSON.stringify(body),
        method: 'POST'
    }
}

const deleteOption = (body: DeleteOption):RequestInit => {
    return {
        headers,
        body: JSON.stringify(body),
        method: 'DELETE'
    }
}

const putOption = (body: UpdateOption):RequestInit => {
    return {
        headers,
        body: JSON.stringify(body),
        method: 'PUT'
    }
}

const getOption = (extraHeader: any):RequestInit => {
    authOption(extraHeader);
    return {
        headers,
        method: 'GET'
    }
}

const authOption = (headersKey: any) => {
    if (!headersKey) return;
    Object.keys(headersKey).forEach((key: any) => {
        headers.append(key, headersKey[key]);
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getUrl = (baseUrl: string, sheet: string, params: any):string => {
    const url = baseUrl.endsWith('/') ? `${baseUrl}${sheet}` : `${baseUrl}/${sheet}`;
    const fullUrl = new URL(url);
    fullUrl.search = new URLSearchParams(paramsSanitize(params)).toString();
    return fullUrl.toString();
}

const paramsSanitize = (params: any) => {
    const sanitizedParam:any = {};
    Object.keys(params).forEach((key: string) => {
        if (params[key]) {
            if (typeof params[key] === 'object' || Array.isArray(params[key])) {
                sanitizedParam[key] = JSON.stringify(params[key]);
            } else {
                sanitizedParam[key] = params[key];
            }
        }
    })

    return sanitizedParam;
}

export {
    postOption,
    deleteOption,
    putOption,
    getOption,
    getUrl,
    authOption
}