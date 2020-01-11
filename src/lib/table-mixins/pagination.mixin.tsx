import {TableWrapperConfig} from "../models/table-models/table-wrapper.model";

export function PaginationMixin<T extends object>(pageSize: number,
                                                  showTotals: boolean,
                                                  prePageText: string,
                                                  postPageText: string,
                                                  firstPageText: string,
                                                  lastPageText: string,
                                                  startingPage: number,
                                                  sizePerPageList: number[],
                                                  sizePerPage: number): Partial<TableWrapperConfig<T>> {
    return {
        hasPagination: true,
        ignorePaginationIfOnlyOnePage: false,
        tableOptionsConfig: {
            paginationSize: pageSize,
            paginationShowsTotal: showTotals,
            prePage: prePageText,
            nextPage: postPageText,
            firstPage: firstPageText,
            lastPage: lastPageText,
            page: startingPage,
            sizePerPageList,
            sizePerPage,
            hideSizePerPage: false,
        }
    }
}
