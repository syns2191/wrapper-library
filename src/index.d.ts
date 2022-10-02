import { CommoditiesProp } from './interfaces/Icomodity.js';
import { AreaProp } from './interfaces/IArea.js';
import { SizeProp } from './interfaces/ISize.js';
import { CurrencyProp } from './interfaces/ICurrency.js';
export default class Wrapper {
    baseUrl: string;
    exp: number;
    commodity: CommoditiesProp;
    area: AreaProp;
    sizes: SizeProp;
    currency: CurrencyProp;
    currencyAppKey: string;
    constructor(baseUrl: string, cacheExp: number, cachePersist: boolean | undefined, currencyAppKey: string, currencyApi: string);
}
