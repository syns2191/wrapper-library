interface Sizes {
    size: string;
}
interface GetParams {
    limit?: number | null;
    offset?: number | null;
    search?: Sizes;
}
interface SizeProp {
    getAll(params: GetParams): Promise<Sizes[] | any>;
}
export { Sizes, SizeProp, GetParams };
