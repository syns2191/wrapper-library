import Request from '../../lib/request.js';
import { GetParams, Areas } from '../../interfaces/IArea.js';
declare class AreaHandler extends Request {
    baseUrl: string;
    sheet: string;
    constructor(baseUrl: string, cacheExp: number, sheet: string, cachePersist: boolean);
    getAll(params: GetParams): Promise<Areas[] | any>;
}
export default AreaHandler;
