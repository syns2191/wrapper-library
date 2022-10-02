import Request from '../../lib/request.js';
import { GetParams, Lists, GetAllByRange, GetByArea, GetById, GetMaxPrice, Search } from '../../interfaces/Icomodity.js';
import { CurrencyProp } from '../../interfaces/ICurrency.js';
declare class DataLists extends Request {
    baseUrl: string;
    sheet: string;
    currency: CurrencyProp;
    constructor(baseUrl: string, cacheExp: number, sheet: string, cachePersist: boolean, currency: CurrencyProp);
    getAllByRange(params: GetAllByRange, usdInfo: boolean): Promise<Lists[] | any>;
    getAll(params: GetParams, usdInfo: boolean): Promise<Lists[] | any>;
    getByArea(params: GetByArea, usdInfo: boolean): Promise<Lists[] | any>;
    getById(params: GetById, usdInfo: boolean): Promise<Lists[] | any>;
    getMaxPrice(params: GetMaxPrice): Promise<any>;
    addRecords(data: Lists[]): Promise<any>;
    updateRecords(id: string, data: Search, limit?: number): Promise<any>;
    deleteRecords(id: string): Promise<any>;
}
export default DataLists;
