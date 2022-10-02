import Request from '../../lib/request.js';
import { GetParams, Sizes } from '../../interfaces/ISize.js';
declare class SizeHandler extends Request {
    baseUrl: string;
    sheet: string;
    constructor(baseUrl: string, cacheExp: number, sheet: string, cachePersist: boolean);
    getAll(params: GetParams): Promise<Sizes[] | any>;
}
export default SizeHandler;
