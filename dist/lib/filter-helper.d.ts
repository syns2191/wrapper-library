import { GetAllByRange, Lists, GetMaxPrice } from '../interfaces/Icomodity.js';
export declare const rangeFilter: (params: GetAllByRange, response: Lists[]) => Lists[];
export declare const maxRecord: (response: Lists[], params: GetMaxPrice) => {
    commodity?: string;
    price: number;
    week?: number;
}[];
export declare const addUsdInfo: (response: Lists[], currency: any) => Lists[];
