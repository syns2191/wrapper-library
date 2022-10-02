import { Headers } from 'node-fetch';
const headers = new Headers();
headers.append('Content-Type', 'application/json');
const postOption = (body) => {
    return {
        headers,
        body: JSON.stringify(body),
        method: 'POST'
    };
};
const deleteOption = (body) => {
    return {
        headers,
        body: JSON.stringify(body),
        method: 'DELETE'
    };
};
const putOption = (body) => {
    return {
        headers,
        body: JSON.stringify(body),
        method: 'PUT'
    };
};
const getOption = (extraHeader) => {
    authOption(extraHeader);
    return {
        headers,
        method: 'GET'
    };
};
const authOption = (headersKey) => {
    if (!headersKey)
        return;
    Object.keys(headersKey).forEach((key) => {
        headers.append(key, headersKey[key]);
    });
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getUrl = (baseUrl, sheet, params) => {
    const url = baseUrl.endsWith('/') ? `${baseUrl}${sheet}` : `${baseUrl}/${sheet}`;
    const fullUrl = new URL(url);
    fullUrl.search = new URLSearchParams(paramsSanitize(params)).toString();
    return fullUrl.toString();
};
const paramsSanitize = (params) => {
    const sanitizedParam = {};
    Object.keys(params).forEach((key) => {
        if (params[key]) {
            if (typeof params[key] === 'object' || Array.isArray(params[key])) {
                sanitizedParam[key] = JSON.stringify(params[key]);
            }
            else {
                sanitizedParam[key] = params[key];
            }
        }
    });
    return sanitizedParam;
};
export { postOption, deleteOption, putOption, getOption, getUrl, authOption };
