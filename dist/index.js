import DataLists from "./modules/commodities/index.js";
import AreaHandler from "./modules/area/index.js";
import SizeHandler from "./modules/size/index.js";
import CurrencyHandler from "./modules/currency/index.js";
const url = 'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4';
export default class Wrapper {
    constructor(baseUrl, cacheExp, cachePersist = true, currencyAppKey, currencyApi) {
        this.baseUrl = baseUrl;
        this.exp = cacheExp;
        this.currencyAppKey = currencyAppKey;
        this.currency = new CurrencyHandler(currencyApi, cacheExp, 'convert', cachePersist, { apikey: currencyAppKey });
        this.commodity = new DataLists(this.baseUrl, this.exp, 'list', cachePersist, this.currency);
        this.area = new AreaHandler(this.baseUrl, cacheExp, 'option_area', cachePersist);
        this.sizes = new SizeHandler(this.baseUrl, cacheExp, 'option_size', cachePersist);
    }
}
