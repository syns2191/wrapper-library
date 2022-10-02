interface GetParams {
    limit?: number | null;
    offset?: number | null;
    search?: any;
}
interface GlobalParams extends GetParams {
    from?: string;
    to?: string;
    amount?: number;
}
interface UpdateOption {
    condition: any;
    set: any;
    limit?: number;
}
interface DeleteOption {
    condition: any;
    limit: number;
}
export { GetParams, DeleteOption, UpdateOption, GlobalParams };
