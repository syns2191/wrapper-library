import Request from '../../lib/request.js';
class SizeHandler extends Request {
    constructor(baseUrl, cacheExp, sheet, cachePersist) {
        super(baseUrl, cacheExp, cachePersist);
        if (!baseUrl) {
            throw new Error('Missing arguments');
        }
        this.baseUrl = baseUrl;
        this.sheet = sheet;
    }
    getAll(params) {
        return this.Get(params, this.sheet);
    }
}
export default SizeHandler;
