import {
    Lists
} from '../interfaces/Icomodity';
import nedb from 'nedb';
import os from 'os';
import path from 'path';


class Cache {
    db;
    exp: number;
    constructor(exp: number, cachePersist: boolean) {
        if (cachePersist) {
            this.db = new nedb({autoload: false, filename: path.join(os.tmpdir(), 'cache-fish-lib')});
            this.db.loadDatabase(function (err) {    // Callback is optional
                // Now commands will be executed
            });
        } else {
            this.db = new nedb();
        }
        this.exp = exp;
    }

    async setCache(key: string, response: Lists | any) {
        const timeObject = new Date(); 
        const expire = new Date(timeObject.getTime() + 1000 * this.exp).getTime(); 
        await this.db.insert({key, data: JSON.stringify(response), exp: expire});
        return;
    }

    getCache(key: string) {
        return new Promise((resolve, reject) => {
            this.db.findOne({key}, async (err, doc) => {
                if (doc) {
                    const isExpired = new Date().getTime() > doc.exp;
                    if (isExpired) {
                        await this.db.remove({key});
                        resolve (null);
                    }
                    resolve(JSON.parse(doc.data));
                }
                resolve(null)
        })
      })
    }

    async updateCache(key:string, response: Lists | any) {
        await this.db.remove({key});
        const timeObject = new Date(); 
        const expire = new Date(timeObject.getTime() + 1000 * this.exp).getTime();
        return this.db.insert({key, data: JSON.stringify(response), exp: expire})
    }

    async removeAll() {
        await this.db.remove({}, { multi: true });
    }

}

export default Cache;