import {TableWrapperConfig} from "./table-wrapper.model";
import {TableWrapperColumnConfig} from "./table-wrapper-column.config";

export interface BuiltTableConfig<T extends object> {
    data: T[];
    tableConfig: TableWrapperConfig<T>
    columns: TableWrapperColumnConfig<T>[];
}
