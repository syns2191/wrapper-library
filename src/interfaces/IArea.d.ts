interface Areas {
    province: string;
    city: string;
}
interface GetParams {
    limit?: number | null;
    offset?: number | null;
    search?: Areas;
}
interface AreaProp {
    getAll(params: GetParams): Promise<Areas[] | any>;
}
export { Areas, AreaProp, GetParams };
