import {
    GetDefaultTableWrapperColumnConfig,
    TableWrapperColumnConfig
} from "../../lib/models/table-models/table-wrapper-column.config";
import merge from 'lodash/merge';
import {ColumnDefinitionError} from "../../lib/models/error-models/column-definition.error";
import {GetDefaultTableWrapperConfig, TableWrapperConfig} from "../../lib/models/table-models/table-wrapper.model";
import {TableStylingConfig} from "../../lib/models/table-models/table-styling-config.model";
import {CellEdit, KeyboardNavigation, Options, SelectRow} from "react-bootstrap-table";
import {TableManipulationConfig} from "../../lib/models/table-models/table-manipulation-config.model";
import {RowExpansionConfig} from "../../lib/models/table-models/table-row-expansion-config.model";
import {BaseError} from "../../lib/models/error-models/base-error.model";
import {validateColumnDefinitions} from "../../lib/validators/table-wrapper-column-config.validators";
import {validateEntireTable} from "../../lib/validators/table-wrapper-config.validators";
import {TableWrapperError} from "../../lib/models/error-models/table-wrapper-error";
import {BuiltTableConfig} from "../../lib/models/at-common-tables/built-table-config.model";
import {GetDefaultTableWrapperOptionsConfig} from "../../lib/models/table-models/table-options-config.model";

export class TableWrapperService {
    public static buildTableWrapperProps<T extends object>(
        data: T[],
        tableConfig: Partial<TableWrapperConfig<T>>,
        columnColumnConfig: Partial<TableWrapperColumnConfig<T>>[],
        tableOptionsConfig: Partial<Options<T>>,
        tableStylingConfig?: Partial<TableStylingConfig>,
        tableCellEditConfig?: Partial<CellEdit<T>>,
        tableKeyboardNavigationConfig?: Partial<KeyboardNavigation>,
        tableManipulationConfig?: Partial<TableManipulationConfig>,
        tableRowExpansionConfig?: Partial<RowExpansionConfig>,
        tableRowSelectionConfig?: Partial<SelectRow<T>>,
    ): BuiltTableConfig<T> | BaseError {
        // generate default table
        const defaultTable = GetDefaultTableWrapperConfig();

        // merge main table config into default table
        merge(defaultTable, tableConfig);

        // merge table options
        if (tableOptionsConfig) {
            merge(defaultTable.tableOptionsConfig, tableOptionsConfig);
        } else {
            merge(defaultTable.tableOptionsConfig, GetDefaultTableWrapperOptionsConfig());
        }

        // merge table styles
        if (tableStylingConfig) {
            merge(defaultTable.styling, tableStylingConfig);
        }

        // merge cell editing
        if (tableCellEditConfig) {
            merge(defaultTable.cellEditConfig, tableCellEditConfig);
        }

        // merge keyboard navigation
        if (tableKeyboardNavigationConfig) {
            merge(defaultTable.keyboardNavigationConfig, tableKeyboardNavigationConfig);
        }

        // merge table actions (insert/delete)
        if (tableManipulationConfig) {
            merge(defaultTable.tableAlterationActions, tableManipulationConfig);
        }

        // merge row expansion options
        if (tableRowExpansionConfig) {
            merge(defaultTable.rowExpansionConfig, tableRowExpansionConfig);
        }

        // merge row selection config
        if (tableRowSelectionConfig) {
            merge(defaultTable.rowSelectionConfig, tableRowSelectionConfig);
        }

        // generate columns and merge into table
        const columns = this.buildTableColumnsDefinition<T>(columnColumnConfig);

        // validate columns, if error return it
        const columnValidationResults = validateColumnDefinitions<T>(columns);
        if (columnValidationResults instanceof ColumnDefinitionError) {
            return columnValidationResults;
        }

        // validate table, if error return it
        const tableValidationResults = validateEntireTable<T>(defaultTable);
        if (tableValidationResults instanceof TableWrapperError) {
            return tableValidationResults;
        }

        // otherwise, no errors, return table config and columns
        return {
            data,
            tableConfig: defaultTable,
            columns: columns
        };
    }

    public static buildTableColumnsDefinitionFromKeyArray<T extends object>(columns: string[]): TableWrapperColumnConfig<T>[] {
        const cols: TableWrapperColumnConfig<T>[] = columns.map(x => this.buildTableColumnFromKey(x));
        cols[0].isKey = true;
        return cols;
    }

    private static buildTableColumnsDefinition<T extends object>(inputColumnSettings: Partial<TableWrapperColumnConfig<T>>[])
        : TableWrapperColumnConfig<T>[] {
        return inputColumnSettings.map(x => this.buildTableColumn(x));
    }

    private static buildTableColumn<T extends object>(columnProperties: Partial<TableWrapperColumnConfig<T>>) {
        if (!columnProperties.dataField) {
            throw new Error('No key for column defined');
        } else {
            const defaultCols: TableWrapperColumnConfig<T> = GetDefaultTableWrapperColumnConfig(columnProperties.dataField);
            return merge(defaultCols, columnProperties);
        }
    }

    private static buildTableColumnFromKey<T extends object>(key: string) {
        if (!key) {
            throw new Error('No key for column defined');
        } else {
            return GetDefaultTableWrapperColumnConfig(key);
        }
    }
}
