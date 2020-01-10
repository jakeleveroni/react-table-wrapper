import {TableWrapperConfig} from "../table-models/table-wrapper.model";
import {TableWrapperColumnConfig} from "../table-models/table-wrapper-column.config";

export interface BuiltTableConfig<T extends object> {
    data: T[];
    tableConfig: TableWrapperConfig<T>
    columns: TableWrapperColumnConfig<T>[];
}
