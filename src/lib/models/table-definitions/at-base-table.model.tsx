import {UpperCaseAll} from "../../formatters/string.formatter";
import {MaskSSN} from "../../formatters/security.formatter";
import {TableWrapperColumnConfig} from "../table-models/table-wrapper-column.config";

import merge from "lodash/merge";
import {GetDefaultTableStylingConfig, TableStylingConfig} from "../table-models/table-styling-config.model";
import {
    CellEdit,
    ExpandColumnOptions,
    KeyboardNavigation,
    Options,
    SelectRow
} from "react-bootstrap-table";
import {GetDefaultRowSelectionConfig} from "../table-models/table-row-selection-config.model";
import {GetDefaultTableCellEditConfig} from "../table-models/table-cell-edit-config.model";
import {GetDefaultTableKeyboardNavigationConfig} from "../table-models/table-keyboard-navigation-config.model";
import {
    GetDefaultColumnExpansionConfig,
    GetDefaultTableRowExpansionConfig,
    RowExpansionConfig
} from "../table-models/table-row-expansion-config.model";

export function GetAtBaseTable(data: any[]) {
    return {
        data,
        dataTransformer: (data: any[]) => {
            return data
        },
        mainConfig: {
            striped: true,
            onHoverHighlight: true,
            denseView: true,
            isBordered: true,
            hasPagination: false,
            trClassName: "at-base-table-row",
            columnSpecificFiltering: false,
            hasSearch: true,
            searchPlaceHolder: "Search",
            multiColumnSearch: false,
            exportCsv: false,
            ignorePaginationIfOnlyOnePage: true,
            keyboardNavigationConfig: false
        },
        columnsConfig: [{
            type: 'basic',
            dataSort: true,
            dataField: 'firstName',
            headerText: 'First Name',
            isKey: true,
        }, {
            type: 'basic',
            dataField: 'lastName',
            headerText: 'Last Name',
        }, {
            type: 'basic',
            dataField: 'email',
            headerText: 'Email',
        }, {
            type: 'basic',
            dataField: 'phone',
            headerText: 'Phone #',
        }, {
            type: 'basic',
            dataField: 'signupDate',
            headerText: 'Sign-up Date',
        }, {
            type: 'basic',
            dataField: 'ssn',
            headerText: 'SSN',
            dataFormat: (value: any) => {
                return new MaskSSN().format(value);
            }
        }, {
            type: 'basic',
            dataField: 'locale',
            headerText: 'Locale',
            dataFormat: (value: any) => {
                return new UpperCaseAll().format(value);
            }
        }, {
            type: 'basic',
            dataField: 'isSubscribed',
            headerText: 'Is Subscribed',
        }, {
            type: 'button',
            dataField: 'action',
            headerText: 'Action',
            formatExtraData: {
                test: 'hello',
                className: 'btn btn-primary'
            },
            cellAction: (cellValue: any, rowValue: any, extraData: any, ndx: number) => {
                console.log('[button] here', cellValue, rowValue, extraData, ndx);
            }
        }, {
            type: 'dropdown-bootstrap',
            dataField: 'dropdown',
            headerText: 'Drop Down',
            dropdownSelectionValues: [
                'Yes',
                'No',
                'Maybe',
                'No Answer'
            ],
            formatExtraData: {
                test: 'hello',
                selectClassName: 'dropdown-menu',
                selectItemClassName: 'dropdown-item'
            },
            cellAction: (cellValue: any, row: any, extraData: any, ndx: number) => {
                console.log('[drop-down] here', cellValue, row, extraData, ndx);
            }
        }],
        optionsConfig: {
            striped: true,
            sortIndicator: true,
            noDataText: 'No data...',
            hidePageListOnlyOnePage: true,
        }
    }
}

export function GenerateBaseTableConfig<T extends object>(data: T[], columnsConfig: TableWrapperColumnConfig<T>[]) {
    return {
        data,
        tableConfig: {
            striped: true,
            onHoverHighlight: true,
            isBordered: true,
            hasSearch: true,
            searchPlaceHolder: 'Search'
        },
        columnsConfig
    };
}

export function GenerateRowActionsConfig<T extends object>(afterInsert: (rowKeys: any) => void,
                                                           afterDelete: (rowKeys: any) => void) {
    return {
        insertionSettings: {
            afterInsert,
            canInsert: (afterInsert) !== null
        },
        deletionSettings: {
            afterDelete,
            canDelete: (afterDelete) !== null
        }
    };
}

export function GenerateTableStylingConfig(styling: Partial<TableStylingConfig>): TableStylingConfig {
    return merge(GetDefaultTableStylingConfig(), styling);
}

export function GenerateTableRowExpansionConfig(rowExpansionConfig: Partial<RowExpansionConfig>): RowExpansionConfig {
    return merge(GetDefaultTableRowExpansionConfig(), rowExpansionConfig)
}

export function GenerateTableCellExpansionConfig(columnExpansionConfig: Partial<ExpandColumnOptions>): ExpandColumnOptions {
    return merge(GetDefaultColumnExpansionConfig(), columnExpansionConfig);
}

export function GenerateKeyboardNavigationConfig(keyboardNavConfig: Partial<KeyboardNavigation>): KeyboardNavigation {
    return merge(GetDefaultTableKeyboardNavigationConfig(), keyboardNavConfig);
}

export function GenerateRowSelectionConfig<TRow  extends object>(rowSelectionConfig: Partial<SelectRow<TRow>>): SelectRow<TRow> {
    return merge(GetDefaultRowSelectionConfig(), rowSelectionConfig);
}

export function GenerateCellEditingConfig<TRow  extends object>(cellEditingConfig: Partial<CellEdit<TRow>>): CellEdit<TRow> {
    return merge(GetDefaultTableCellEditConfig(), cellEditingConfig);
}

export function GenerateTableOptionsConfig<TRow extends object>(tableOptions: Partial<Options<TRow>>): Options<TRow> {
    return merge(GetDefaultTableCellEditConfig(), tableOptions);
}

