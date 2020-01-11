import React from 'react';
import {
    GetDefaultTableWrapperColumnConfig, GetTableColumnWithActionButton, GetTableColumnWithDropDown,
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
        tableOverrides: {
            tableStylingConfig?: Partial<TableStylingConfig>,
            tableCellEditConfig?: Partial<CellEdit<T>>,
            tableKeyboardNavigationConfig?: Partial<KeyboardNavigation>,
            tableManipulationConfig?: Partial<TableManipulationConfig>,
            tableRowExpansionConfig?: Partial<RowExpansionConfig>,
            tableRowSelectionConfig?: Partial<SelectRow<T>>
        }
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
        if (tableOverrides.tableStylingConfig) {
            merge(defaultTable.styling, tableOverrides.tableStylingConfig);
        }

        // merge cell editing
        if (tableOverrides.tableCellEditConfig) {
            merge(defaultTable.cellEditConfig, tableOverrides.tableCellEditConfig);
        }

        // merge keyboard navigation
        if (tableOverrides.tableKeyboardNavigationConfig) {
            merge(defaultTable.keyboardNavigationConfig, tableOverrides.tableKeyboardNavigationConfig);
        }

        // merge table actions (insert/delete)
        if (tableOverrides.tableManipulationConfig) {
            merge(defaultTable.tableAlterationActions, tableOverrides.tableManipulationConfig);
        }

        // merge row expansion options
        if (tableOverrides.tableRowExpansionConfig) {
            merge(defaultTable.rowExpansionConfig, tableOverrides.tableRowExpansionConfig);
        }

        // merge row selection config
        if (tableOverrides.tableRowSelectionConfig) {
            merge(defaultTable.rowSelectionConfig, tableOverrides.tableRowSelectionConfig);
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

    private static buildTableColumnsDefinition<T extends object>(inputColumnSettings: Partial<TableWrapperColumnConfig<T>>[])
        : TableWrapperColumnConfig<T>[] {
        return inputColumnSettings.map(x => this.buildTableColumn(x));
    }

    private static buildTableColumn<T extends object>(columnProperties: Partial<TableWrapperColumnConfig<T>>) {
        if (!columnProperties.dataField) {
            throw new Error('No key for column defined');
        } else {
            let col: TableWrapperColumnConfig<T>;
            switch (columnProperties.type) {
                case 'basic':
                default:
                    col = GetDefaultTableWrapperColumnConfig<T>(columnProperties.dataField);
                    break;
                case 'button':
                    col = GetTableColumnWithActionButton<T>(columnProperties.dataField,
                        columnProperties.headerText || 'None',
                        columnProperties.formatExtraData,
                        columnProperties.cellAction
                            ? columnProperties.cellAction
                            : () => {
                                console.error('No action supplied for button cell');
                                return <p>ERROR</p>;
                            }
                        );
                    break;
                case 'dropdown':
                    col = GetTableColumnWithDropDown<T>(columnProperties.dataField,
                        columnProperties.dropdownSelectionValues || ['None'],
                        columnProperties.formatExtraData,
                        columnProperties.cellAction
                            ? columnProperties.cellAction
                            : () => {
                                console.error('No action supplied for button cell');
                                return <p>ERROR</p>;
                            }
                    );
                    break;

            }
            return merge(col, columnProperties);
        }
    }

    private static buildTableColumnFromKey<T extends object>(key: string): TableWrapperColumnConfig<T>  {
        if (!key) {
            throw new Error('No key for column defined');
        } else {
            return GetDefaultTableWrapperColumnConfig(key);
        }
    }
}
