import {
    GetDefaultTableWrapperColumnConfig,
    TableWrapperColumnConfig
} from "../../lib/models/table-models/table-wrapper-column.config";
import merge from 'lodash/merge';
import {ColumnDefinitionErrorModel} from "../../lib/models/error-models/column-definition-error.model";

export class TableWrapperService {
    public buildTableWrapperProps() {
        // TODO
    }

    public static buildTableColumnsDefinition<T extends object>(inputColumnSettings: Partial<TableWrapperColumnConfig<T>>[])
        : TableWrapperColumnConfig<T>[] | ColumnDefinitionErrorModel {
        const columns = inputColumnSettings.map(x => this.buildTableColumn(x));
        const columnsAreInvalid = this.validateColumnDefinitions(columns);
        return !columnsAreInvalid ? columns : columnsAreInvalid;
    }

    private static buildTableColumn<T extends object>(columnProperties: Partial<TableWrapperColumnConfig<T>>) {
        const defaultCols: TableWrapperColumnConfig<T> = GetDefaultTableWrapperColumnConfig();
        return merge(defaultCols, columnProperties);
    }

    private static validateColumnDefinitions<T extends object>(columns: TableWrapperColumnConfig<T>[]): null | ColumnDefinitionErrorModel {
        let errString: string | null = null;

        for (let col of columns) {
            errString = this.validateColumnDef(col);

            if (errString !== null) {
                break;
            }
        }

        return errString !== null ? new ColumnDefinitionErrorModel(errString) : null;
    }

    private static validateColumnDef<T extends object>(col: TableWrapperColumnConfig<T>): string | null {
        // TODO add validation rules for columns here
        return null;
    }
}
