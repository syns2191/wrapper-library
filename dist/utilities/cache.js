import nedb from 'nedb';
import os from 'os';
import path from 'path';
class Cache {
    constructor(exp, cachePersist) {
        if (cachePersist) {
            this.db = new nedb({ autoload: true, filename: path.join(os.tmpdir(), 'cache-fish-lib') });
        }
        else {
            this.db = new nedb();
        }
        this.exp = exp;
    }
    async setCache(key, response) {
        const timeObject = new Date();
        const expire = new Date(timeObject.getTime() + 1000 * this.exp).getTime();
        await this.db.insert({ key, data: JSON.stringify(response), exp: expire });
        return;
    }
    getCache(key) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ key }, async (err, doc) => {
                if (doc) {
                    const isExpired = new Date().getTime() > doc.exp;
                    if (isExpired) {
                        await this.db.remove({ key });
                        resolve(null);
                    }
                    resolve(JSON.parse(doc.data));
                }
                resolve(null);
            });
        });
    }
    async updateCache(key, response) {
        await this.db.remove({ key });
        const timeObject = new Date();
        const expire = new Date(timeObject.getTime() + 1000 * this.exp).getTime();
        return this.db.insert({ key, data: JSON.stringify(response), exp: expire });
    }
    async removeAll() {
        await this.db.remove({}, { multi: true });
    }
}
export default Cache;
