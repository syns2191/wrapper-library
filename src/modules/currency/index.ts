import Request from '../../lib/request';
import {
    GetParams,
    Auth
} from '../../interfaces/ICurrency';
class CurrencyHandler extends Request {
    baseUrl: string;
    sheet: string;
    auth: Auth;
    constructor(baseUrl: string, cacheExp: number, sheet: string, cachePersist: boolean, auth:Auth) {
        super(baseUrl, cacheExp, cachePersist)
        if (!baseUrl) {
            throw new Error('Missing arguments');
        }
        this.baseUrl = baseUrl;
        this.sheet = sheet;
        this.auth = auth;
    }

    getAll(params: GetParams):Promise<any[] | any>  {
        return this.Get(params, this.sheet, this.auth);
    }

}

export default CurrencyHandler;