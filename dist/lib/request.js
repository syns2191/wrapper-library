import fetch from 'node-fetch';
import { postOption, getOption, deleteOption, getUrl, putOption } from './request-helper.js';
import Cache from '../utilities/cache.js';
class Request {
    constructor(baseUrl, exp, cachePersist) {
        this.baseUrl = baseUrl;
        this.exp = exp;
        this.cache = new Cache(exp, cachePersist);
    }
    async Add(data, sheet) {
        const options = postOption(data);
        const reqUrl = getUrl(this.baseUrl, sheet, {});
        const resp = await fetch(reqUrl, options);
        await this.cache.removeAll();
        const jsonResp = await resp.json();
        return jsonResp;
    }
    async Get(params, sheet, extraHeader) {
        const options = getOption(extraHeader);
        const reqUrl = getUrl(this.baseUrl, sheet, params);
        const dataCached = await this.cache.getCache(reqUrl);
        if (dataCached && dataCached.length > 0) {
            return Promise.resolve(dataCached);
        }
        const resp = await fetch(reqUrl, options);
        const jsonResp = await resp.json();
        this.cache.setCache(reqUrl, jsonResp);
        return jsonResp;
    }
    async Update(body, sheet) {
        const options = putOption(body);
        const reqUrl = getUrl(this.baseUrl, sheet, {});
        const resp = await fetch(reqUrl, options);
        await this.cache.removeAll();
        const jsonResp = await resp.json();
        return jsonResp;
    }
    async Delete(body, sheet) {
        const options = deleteOption(body);
        const reqUrl = getUrl(this.baseUrl, sheet, {});
        const resp = await fetch(reqUrl, options);
        await this.cache.removeAll();
        const jsonResp = await resp.json();
        return jsonResp;
    }
}
export default Request;
