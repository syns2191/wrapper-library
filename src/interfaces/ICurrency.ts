interface GetParams {
    from: string,
    to: string,
    amount: number
}

interface Auth {
    apikey: string;
}

interface CurrencyProp {
    getAll(params: GetParams):Promise<any[] | any>;
}

export {
    CurrencyProp,
    GetParams,
    Auth
}