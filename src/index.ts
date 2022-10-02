import DataLists from "./modules/commodities/index.js";
import AreaHandler from "./modules/area/index.js";
import SizeHandler from "./modules/size/index.js";
import CurrencyHandler from "./modules/currency/index.js";
import {
    CommoditiesProp
} from './interfaces/Icomodity.js';
import { AreaProp } from './interfaces/IArea.js';
import { SizeProp } from './interfaces/ISize.js';
import { CurrencyProp } from './interfaces/ICurrency.js';


const url = 'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4';


export default class Wrapper {
    baseUrl:string;
    exp: number;
    commodity: CommoditiesProp;
    area: AreaProp;
    sizes: SizeProp;
    currency: CurrencyProp;
    currencyAppKey: string;
    constructor (baseUrl: string, cacheExp: number, cachePersist: boolean = true, currencyAppKey: string, currencyApi: string) {
        this.baseUrl = baseUrl;
        this.exp = cacheExp;
        this.currencyAppKey = currencyAppKey;
        this.currency = new CurrencyHandler(currencyApi, cacheExp, 'convert', cachePersist, {apikey: currencyAppKey})
        this.commodity =  new DataLists(this.baseUrl, this.exp, 'list', cachePersist, this.currency);
        this.area = new AreaHandler(this.baseUrl, cacheExp, 'option_area', cachePersist);
        this.sizes = new SizeHandler(this.baseUrl, cacheExp, 'option_size', cachePersist);
    }
}