import DataLists from "./modules/commodities/index";
import AreaHandler from "./modules/area/index";
import SizeHandler from "./modules/size/index";
import CurrencyHandler from "./modules/currency/index";
import {
    CommoditiesProp
} from './interfaces/Icomodity';
import { AreaProp } from './interfaces/IArea';
import { SizeProp } from './interfaces/ISize';
import { CurrencyProp } from './interfaces/ICurrency';


// const url = 'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4';


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

const url = 'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4';
const convert = 'https://api.apilayer.com/exchangerates_data/';
const appKey = 'bmKar4ZjgkDV15pcjYFcm5WRlp6ELIv1'
const a = new Wrapper(url, 30000, true, appKey, convert);
a.commodity.getAll({}, true).then((x) => {
    console.log(x);
});