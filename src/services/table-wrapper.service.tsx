import {
    GetDefaultTableWrapperColumnConfig,
    TableWrapperColumnConfig
} from "../lib/models/table-models/table-wrapper-column.config";
import merge from 'lodash/merge';
import {ColumnDefinitionError} from "../lib/models/error-models/column-definition.error";
import {GetDefaultTableWrapperConfig, TableWrapperConfig} from "../lib/models/table-models/table-wrapper.model";
import {TableStylingConfig} from "../lib/models/table-models/table-styling-config.model";
import {CellEdit, KeyboardNavigation, Options, SelectRow} from "react-bootstrap-table";
import {TableManipulationConfig} from "../lib/models/table-models/table-manipulation-config.model";
import {RowExpansionConfig} from "../lib/models/table-models/table-row-expansion-config.model";
import {BaseError} from "../lib/models/error-models/base-error.model";
import {validateColumnDefinitions} from "./table-wrapper-column-config.validators";
import {validateEntireTable} from "../lib/validators/table-wrapper-config.validators";
import {TableWrapperError} from "../lib/models/error-models/table-wrapper-error";

export class TableWrapperService {
    public static buildTableWrapperProps<T extends object>(
        tableConfig: Partial<TableWrapperConfig>,
        tableOptionsConfig: Partial<Options>,
        columnColumnConfig: Array<Partial<TableWrapperColumnConfig>>,
        tableStylingConfig: Partial<TableStylingConfig>,
        tableCellEditConfig: Partial<CellEdit>,
        tableKeyboardNavigationConfig: Partial<KeyboardNavigation>,
        tableManipulationConfig: Partial<TableManipulationConfig>,
        tableRowExpansionConfig: Partial<RowExpansionConfig>,
        tableRowSelectionConfig: Partial<SelectRow>,
    ): {
        tableConfig: TableWrapperConfig,
        columns: TableWrapperColumnConfig[]
    } | BaseError {
        // generate default table
        const defaultTable = GetDefaultTableWrapperConfig();

        // merge main table config into default table
        merge(defaultTable, tableConfig);

        // merge table options
        merge(defaultTable.tableOptionsConfig, tableOptionsConfig);

        // merge table styles
        merge(defaultTable.styling, tableStylingConfig);

        // merge cell editing
        merge(defaultTable.cellEditConfig, tableCellEditConfig);

        // merge keyboard navigation
        merge(defaultTable.keyboardNavigationConfig, tableKeyboardNavigationConfig);

        // merge table actions (insert/delete)
        merge(defaultTable.tableAlterationActions, tableManipulationConfig);

        // merge row expansion options
        merge(defaultTable.rowExpansionConfig, tableRowExpansionConfig);

        // merge row selection config
        merge(defaultTable.rowSelectionConfig, tableRowSelectionConfig);

        // generate columns and merge into table
        const columns = this.buildTableColumnsDefinition(columnColumnConfig);

        // validate columns, if error return it
        const columnValidationResults = validateColumnDefinitions(columns);
        if (columnValidationResults instanceof ColumnDefinitionError) {
            return columnValidationResults;
        }

        // validate table, if error return it
        const tableValidationResults = validateEntireTable(defaultTable);
        if (tableValidationResults instanceof TableWrapperError) {
            return tableValidationResults;
        }

        // otherwise, no errors, return table config and columns
        return {
            tableConfig: defaultTable,
            columns: columns
        };
    }

    public static buildTableColumnsDefinition<T extends object>(inputColumnSettings: Partial<TableWrapperColumnConfig<T>>[])
        : TableWrapperColumnConfig<T>[] {
        return inputColumnSettings.map(x => this.buildTableColumn(x));
    }

    private static buildTableColumn<T extends object>(columnProperties: Partial<TableWrapperColumnConfig<T>>) {
        const defaultCols: TableWrapperColumnConfig<T> = GetDefaultTableWrapperColumnConfig();
        return merge(defaultCols, columnProperties);
    }
}
