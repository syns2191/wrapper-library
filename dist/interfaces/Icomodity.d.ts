interface Lists {
    uuid?: string;
    komoditas: string;
    area_provinsi: string | null;
    area_kota: string | null;
    size: string;
    price: string;
    tgl_parsed: string;
    timestamp: string;
    price_usd?: string;
}
interface Search {
    uuid?: string | null;
    komoditas?: string | null;
    area_provinsi?: string | null;
    area_kota?: string | null;
    size?: string | null;
    price?: string | null;
    tgl_parsed?: string | null;
    timestamp?: string | null;
}
interface GetParams {
    limit?: number | null;
    offset?: number | null;
    search?: Search;
}
interface UpdateOption {
    condition: Search;
    set: Search;
    limit?: number;
}
interface DeleteOption {
    condition: Search;
    limit: number;
}
interface GetAllByRange {
    rangeSize?: {
        min: number;
        max: number;
    };
    rangeDate?: {
        min: Date;
        max: Date;
    };
    rangePrice?: {
        min: number;
        max: number;
    };
    limit: number;
    offset: number;
}
interface GetByArea {
    area: string;
    limit: number;
    offset: number;
}
interface GetById {
    id: string;
    limit: number;
    offset: number;
}
interface GetMaxPrice {
    types: keyof {
        'by week'?: 'by week';
        'by commodity'?: 'by commodity';
    };
}
interface CommoditiesProp {
    getAllByRange(params: GetAllByRange, usdInfo: boolean): Promise<Lists[] | any>;
    getAll(params: GetParams, usdInfo: boolean): Promise<Lists[] | any>;
    getByArea(params: GetParams, usdInfo: boolean): Promise<Lists[] | any>;
    getById(params: GetById, usdInfo: boolean): Promise<Lists[]> | any;
    getMaxPrice(params: GetMaxPrice): Promise<any>;
    addRecords(data: Lists[]): Promise<any>;
    updateRecords(id: string, data: Search, limit?: number): Promise<any>;
    deleteRecords(id: string): Promise<any>;
}
export { Lists, GetParams, UpdateOption, DeleteOption, GetAllByRange, CommoditiesProp, GetByArea, GetById, GetMaxPrice, Search };
