import {TableWrapperColumnConfig} from "../../lib/models/table-models/table-wrapper-column.config";
import {Options} from "react-bootstrap-table";
import {BaseError} from "../../lib/models/error-models/base-error.model";
import {TableOverridesModel} from "../../lib/models/shared-models/table-overrides.model";
import {BuiltTableConfig} from "../../lib/models/at-common-tables/built-table-config.model";
import {TableWrapperConfig} from "../../lib/models/table-models/table-wrapper.model";

export abstract class AbstractTableBuilder<T extends object> {
    public abstract build(input: any): BaseError | JSX.Element;
    public abstract buildConfig(input: any): BuiltTableConfig<T> | BaseError;
    public abstract generateComponentJsx(tableModel: BuiltTableConfig<T>): JSX.Element | BaseError;

    protected abstract ingestTableJson(json: any): BuiltTableConfig<T> | BaseError;
    protected abstract transformData(data: any[], transformer?: (data: any[]) => T[]): T[];
    protected abstract generateTableWithOverrides(data: T[],
                                               tableConfig: TableWrapperConfig<T>,
                                               columnsDefinition: Array<Partial<TableWrapperColumnConfig<T>>>,
                                               tableOptionsOverrides: Options<T>,
                                               tableOverridesModel: TableOverridesModel<T>): BuiltTableConfig<T> | BaseError;
}
