import {TableWrapperColumnConfig} from "../../lib/models/table-models/table-wrapper-column.config";
import {Options} from "react-bootstrap-table";
import {BaseError} from "../../lib/models/error-models/base-error.model";
import {TableOverridesModel} from "../../lib/models/shared-models/table-overrides.model";
import {BuiltTableConfig} from "../../lib/models/at-common-tables/built-table-config.model";

export abstract class AbstractTableBuilder<T extends object> {
    public abstract generateBaseTable(data: T[],
                                      columnsDefinition: Array<TableWrapperColumnConfig<T>>,
                                      tableOptionsOverrides: Options<T>): BuiltTableConfig<T> | BaseError;
    public abstract generateTableWithOverrides(data: T[],
                                               columnsDefinition: Array<TableWrapperColumnConfig<T>>,
                                               tableOptionsOverrides: Options<T>,
                                               tableOverridesModel: TableOverridesModel<T>): BuiltTableConfig<T> | BaseError;
    public abstract generateTableElement(tableModel: BuiltTableConfig<T>): JSX.Element | BaseError;
    public abstract generateColumnsFromKeyArray(keys: string[]): BaseError | TableWrapperColumnConfig<T>[];
}
