import { Lists } from '../interfaces/Icomodity.js';
import nedb from 'nedb';
declare class Cache {
    db: nedb<any>;
    exp: number;
    constructor(exp: number, cachePersist: boolean);
    setCache(key: string, response: Lists | any): Promise<void>;
    getCache(key: string): Promise<unknown>;
    updateCache(key: string, response: Lists | any): Promise<void>;
    removeAll(): Promise<void>;
}
export default Cache;
