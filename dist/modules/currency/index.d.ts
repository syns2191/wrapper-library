import Request from '../../lib/request.js';
import { GetParams, Auth } from '../../interfaces/ICurrency.js';
declare class CurrencyHandler extends Request {
    baseUrl: string;
    sheet: string;
    auth: Auth;
    constructor(baseUrl: string, cacheExp: number, sheet: string, cachePersist: boolean, auth: Auth);
    getAll(params: GetParams): Promise<any[] | any>;
}
export default CurrencyHandler;
