import { RequestInit } from 'node-fetch';
import { Lists, DeleteOption, UpdateOption } from '../interfaces/Icomodity.js';
declare const postOption: (body: Lists[]) => RequestInit;
declare const deleteOption: (body: DeleteOption) => RequestInit;
declare const putOption: (body: UpdateOption) => RequestInit;
declare const getOption: (extraHeader: any) => RequestInit;
declare const authOption: (headersKey: any) => void;
declare const getUrl: (baseUrl: string, sheet: string, params: any) => string;
export { postOption, deleteOption, putOption, getOption, getUrl, authOption };
