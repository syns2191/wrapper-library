import Request from '../../lib/request.js';
class CurrencyHandler extends Request {
    constructor(baseUrl, cacheExp, sheet, cachePersist, auth) {
        super(baseUrl, cacheExp, cachePersist);
        if (!baseUrl) {
            throw new Error('Missing arguments');
        }
        this.baseUrl = baseUrl;
        this.sheet = sheet;
        this.auth = auth;
    }
    getAll(params) {
        return this.Get(params, this.sheet, this.auth);
    }
}
export default CurrencyHandler;
