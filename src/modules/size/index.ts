import Request from '../../lib/request';
import {
    GetParams,
    Sizes,
} from '../../interfaces/ISize';
class SizeHandler extends Request {
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

    getAll(params: GetParams):Promise<Sizes[] | any>  {
        return this.Get(params, this.sheet);
    }

}

export default SizeHandler;