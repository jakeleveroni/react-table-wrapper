export interface TablePaginationConfigModel {
    hasPagination: boolean,
    ignorePaginationIfOnlyOnePage: boolean,
    tableOptionsConfig: {
        paginationSize: number,
        paginationShowsTotal: boolean,
        prePage: string,
        nextPage: string,
        firstPage: string,
        lastPage: string,
        page: number,
        sizePerPageList: number[],
        sizePerPage: number,
        hideSizePerPage: boolean,
    }
}
