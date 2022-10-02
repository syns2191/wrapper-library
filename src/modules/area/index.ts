import Request from '../../lib/request';
import {
    GetParams,
    Areas,
} from '../../interfaces/IArea';
class AreaHandler extends Request {
    baseUrl: string;
    sheet: string;
    constructor(baseUrl: string, cacheExp: number, sheet: string, cachePersist: boolean) {
        super(baseUrl, cacheExp, cachePersist)
        if (!baseUrl) {
            throw new Error('Missing arguments');
        }
        this.baseUrl = baseUrl;
        this.sheet = sheet;
    }

    getAll(params: GetParams):Promise<Areas[] | any>  {
        return this.Get(params, this.sheet);
    }

}

export default AreaHandler;