import fetch, {RequestInit, Response} from 'node-fetch';
import {
    GlobalParams,
} from '../interfaces/IRequest';
import {
    postOption,
    getOption,
    deleteOption,
    getUrl,
    putOption,
    authOption
} from './request-helper';
import Cache from '../utilities/cache';

class Request {
    baseUrl: string;
    exp: number;
    cache;
    constructor(baseUrl: string, exp: number, cachePersist: boolean) {
        this.baseUrl = baseUrl;
        this.exp = exp;
        this.cache = new Cache(exp, cachePersist);
    }
    async Add(data: any[], sheet: string): Promise<any> {
        const options: RequestInit = postOption(data);
        const reqUrl = getUrl(this.baseUrl, sheet, {});
        const resp = await fetch(reqUrl, options);
        await this.cache.removeAll();
        const jsonResp = await resp.json();
        return jsonResp;
    }
    
    async Get (params: GlobalParams,  sheet: string, extraHeader?: any): Promise<any> {
        const options: RequestInit = getOption(extraHeader);
        const reqUrl = getUrl(this.baseUrl, sheet, params);
        const dataCached:any = await this.cache.getCache(reqUrl);
        if (dataCached && dataCached.length > 0) {
            return Promise.resolve(dataCached);
        }
        const resp = await fetch(reqUrl, options);
        const jsonResp = await resp.json();
        this.cache.setCache(reqUrl, jsonResp);
        return jsonResp;
    }
    
    async Update (body: any, sheet: string): Promise<any> {
        const options: RequestInit = putOption(body);
        const reqUrl = getUrl(this.baseUrl, sheet, {});
        const resp = await fetch(reqUrl, options);
        await this.cache.removeAll();
        const jsonResp = await resp.json();
        return jsonResp;
    }
    
    async Delete (body: any, sheet: string):Promise<any> {
        const options: RequestInit = deleteOption(body);
        const reqUrl = getUrl(this.baseUrl, sheet, {});
        const resp = await fetch(reqUrl, options);
        await this.cache.removeAll();
        const jsonResp = await resp.json();
        return jsonResp;
    }
}


export default Request;
