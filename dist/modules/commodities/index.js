import Request from '../../lib/request.js';
import { rangeFilter, maxRecord, addUsdInfo } from '../../lib/filter-helper.js';
class DataLists extends Request {
    constructor(baseUrl, cacheExp, sheet, cachePersist, currency) {
        super(baseUrl, cacheExp, cachePersist);
        if (!baseUrl) {
            throw new Error('Missing arguments');
        }
        this.baseUrl = baseUrl;
        this.sheet = sheet;
        this.currency = currency;
    }
    async getAllByRange(params, usdInfo) {
        if (!params.rangeDate && !params.rangePrice && !params.rangeSize) {
            return this.Get(params, this.sheet);
        }
        const data = await this.Get({}, this.sheet);
        if (usdInfo) {
            const resp = rangeFilter(params, data);
            const currencyInfo = await this.currency.getAll({ from: 'IDR', to: 'USD', amount: 1 });
            return addUsdInfo(resp, currencyInfo);
        }
        return rangeFilter(params, data);
    }
    async getAll(params, usdInfo) {
        if (usdInfo) {
            const resp = await this.Get(params, this.sheet);
            ;
            const currencyInfo = await this.currency.getAll({ from: 'IDR', to: 'USD', amount: 1 });
            return addUsdInfo(resp, currencyInfo);
        }
        return this.Get(params, this.sheet);
    }
    async getByArea(params, usdInfo) {
        const options = {
            limit: params.limit,
            offset: params.offset,
            search: {
                area_kota: params.area
            }
        };
        if (usdInfo) {
            const resp = await this.Get(options, this.sheet);
            const currencyInfo = await this.currency.getAll({ from: 'IDR', to: 'USD', amount: 1 });
            return addUsdInfo(resp, currencyInfo);
        }
        return this.Get(options, this.sheet);
    }
    async getById(params, usdInfo) {
        const options = {
            limit: params.limit,
            offset: params.offset,
            search: {
                uuid: params.id
            }
        };
        if (usdInfo) {
            const resp = await this.Get(options, this.sheet);
            const currencyInfo = await this.currency.getAll({ from: 'IDR', to: 'USD', amount: 1 });
            return addUsdInfo(resp, currencyInfo);
        }
        return this.Get(options, this.sheet);
    }
    async getMaxPrice(params) {
        const data = await this.Get({}, this.sheet);
        return maxRecord(data, params);
    }
    addRecords(data) {
        return this.Add(data, this.sheet);
    }
    updateRecords(id, data, limit) {
        const options = {
            condition: {
                uuid: id
            },
            set: data,
            limit
        };
        return this.Update(options, this.sheet);
    }
    deleteRecords(id) {
        const options = {
            condition: {
                uuid: id
            },
            limit: 1
        };
        return this.Delete(options, this.sheet);
    }
}
export default DataLists;
