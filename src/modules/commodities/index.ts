import Request from '../../lib/request';
import {
    GetParams,
    Lists,
    GetAllByRange,
    GetByArea,
    GetById,
    GetMaxPrice,
    UpdateOption,
    Search,
    DeleteOption
} from '../../interfaces/Icomodity';
import {
    rangeFilter,
    maxRecord,
    addUsdInfo
} from '../../lib/filter-helper';
import { CurrencyProp } from '../../interfaces/ICurrency';
class DataLists extends Request {
    baseUrl: string;
    sheet: string;
    currency:CurrencyProp;
    constructor(baseUrl: string, cacheExp: number, sheet: string, cachePersist: boolean, currency: CurrencyProp) {
        super(baseUrl, cacheExp, cachePersist)
        if (!baseUrl) {
            throw new Error('Missing arguments');
        }
        this.baseUrl = baseUrl;
        this.sheet = sheet;
        this.currency = currency;
    }

    async getAllByRange(params: GetAllByRange, usdInfo:boolean):Promise<Lists[] | any>  {
        if (!params.rangeDate && !params.rangePrice && !params.rangeSize) {
            return this.Get(params, this.sheet);
        }

        const data = await this.Get({}, this.sheet);
        if (usdInfo) {
            const resp = rangeFilter(params, data);
            const currencyInfo = await this.currency.getAll({from: 'IDR', to: 'USD', amount: 1});
            return addUsdInfo(resp, currencyInfo);
        }
        return rangeFilter(params, data);
    }

    async getAll(params: GetParams, usdInfo:boolean):Promise<Lists[] | any>  {
        if (usdInfo) {
            const resp = await this.Get(params, this.sheet);
            const currencyInfo = await this.currency.getAll({from: 'IDR', to: 'USD', amount: 1});
            return addUsdInfo(resp, currencyInfo);
        }
        return this.Get(params, this.sheet);
    }

    async getByArea(params:GetByArea, usdInfo:boolean):Promise<Lists[] | any> {
        const options: GetParams = {
            limit: params.limit,
            offset: params.offset,
            search: {
                area_kota: params.area
            }
        }

        if (usdInfo) {
            const resp = await this.Get(options, this.sheet);
            const currencyInfo = await this.currency.getAll({from: 'IDR', to: 'USD', amount: 1});
            return addUsdInfo(resp, currencyInfo);
        }

        return this.Get(options, this.sheet);
    }

    async getById(params: GetById, usdInfo:boolean):Promise<Lists[] | any> {
        const options: GetParams = {
            limit: params.limit,
            offset: params.offset,
            search: {
                uuid: params.id
            }
        }

        if (usdInfo) {
            const resp = await this.Get(options, this.sheet);
            const currencyInfo = await this.currency.getAll({from: 'IDR', to: 'USD', amount: 1});
            return addUsdInfo(resp, currencyInfo);
        }

        return this.Get(options, this.sheet);
    }

    async getMaxPrice(params: GetMaxPrice):Promise<any> {
        const data = await this.Get({}, this.sheet);
        return maxRecord(data, params);
    }

    addRecords(data: Lists[]):Promise<any> {
        return this.Add(data, this.sheet);
    }

    updateRecords(id: string, data: Search, limit?: number):Promise<any> {
        const options: UpdateOption = {
            condition: {
                uuid: id
            },
            set: data,
            limit
        }
        return this.Update(options, this.sheet);
    }

    deleteRecords(id: string):Promise<any> {
        const options:DeleteOption = {
            condition: {
                uuid: id
            },
            limit: 1
        }
        return this.Delete(options, this.sheet);
    }
}

export default DataLists;