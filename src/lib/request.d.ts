import { GlobalParams } from '../interfaces/IRequest.js';
import Cache from '../utilities/cache.js';
declare class Request {
    baseUrl: string;
    exp: number;
    cache: Cache;
    constructor(baseUrl: string, exp: number, cachePersist: boolean);
    Add(data: any[], sheet: string): Promise<any>;
    Get(params: GlobalParams, sheet: string, extraHeader?: any): Promise<any>;
    Update(body: any, sheet: string): Promise<any>;
    Delete(body: any, sheet: string): Promise<any>;
}
export default Request;
