import Wraper from '../src/index';
const url = 'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4';
const convert = 'https://api.apilayer.com/exchangerates_data/';
const appKey = 'bmKar4ZjgkDV15pcjYFcm5WRlp6ELIv1';
let wraper:any;
  

describe('my beverage', () => {
    beforeAll(() => {
        // Clears the database and adds some testing data.
        // Jest will wait for this promise to resolve before running tests.
        wraper = new Wraper(url, 20000, true, appKey, convert);
      });
    it('is delicious', () => {
        const key = wraper.appKey;
        expect(key).toEqual(appKey);
    });
});