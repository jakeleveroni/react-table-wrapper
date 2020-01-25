import {
    GetDefaultTableManipulationConfig,
    TableManipulationConfig
} from "./table-manipulation-config.model";
import {
    GetDefaultTableStylingConfig,
    TableStylingConfig
} from "./table-styling-config.model";
import {GetDefaultTableRowExpansionConfig, RowExpansionConfig} from "./table-row-expansion-config.model";
import {GetDefaultTableKeyboardNavigationConfig} from "./table-keyboard-navigation-config.model";
import {GetDefaultRowSelectionConfig} from "./table-row-selection-config.model";
import {GetDefaultTableCellEditConfig} from "./table-cell-edit-config.model";
import {CellEdit, KeyboardNavigation, Options, SelectRow} from "react-bootstrap-table";
import {GetDefaultTableWrapperOptionsConfig} from "./table-options-config.model";

export interface TableWrapperConfig<TRow extends object = any> {
    height?: string;
    maxHeight?: string;
    striped?: boolean;
    onHoverHighlight?: boolean;
    denseView?: boolean;
    isBordered?: boolean;
    hasPagination?: boolean;
    trClassName?: string;
    tableAlterationActions?: TableManipulationConfig;
    columnSpecificFiltering?: boolean;
    hasSearch?: boolean;
    searchPlaceHolder?: string;
    multiColumnSearch?: boolean;
    exportCsv?: boolean;
    csvFileName?: string | (() => string);
    ignorePaginationIfOnlyOnePage?: boolean;
    scrollTop?: 'Top' | 'Bottom' | number;
    styling?: TableStylingConfig;
    rowExpansionConfig?: RowExpansionConfig;
    multiColumnSortLimit?: number;
    keyboardNavigationConfig?: boolean | KeyboardNavigation;
    fetchInfo: any;
    rowSelectionConfig?: SelectRow;
    cellEditConfig?: CellEdit;
    tableOptionsConfig?: Options<TRow>;
}

// Helper functions for generating defaulted instances of objects defined in this file
export function GetDefaultTableWrapperConfig<T extends object>(): TableWrapperConfig {
    return {
        height: undefined,
        maxHeight: undefined,
        striped: false,
        onHoverHighlight: true,
        denseView: false,
        isBordered: true,
        hasPagination: false,
        trClassName: undefined,
        tableAlterationActions: GetDefaultTableManipulationConfig(),
        columnSpecificFiltering: false,
        hasSearch: false,
        searchPlaceHolder: undefined,
        multiColumnSearch: false,
        exportCsv: false,
        csvFileName: undefined,
        ignorePaginationIfOnlyOnePage: true,
        scrollTop: 'Top',
        styling: GetDefaultTableStylingConfig(),
        rowExpansionConfig: GetDefaultTableRowExpansionConfig(),
        multiColumnSortLimit: undefined,
        keyboardNavigationConfig: GetDefaultTableKeyboardNavigationConfig(),
        fetchInfo: undefined,
        rowSelectionConfig: GetDefaultRowSelectionConfig(),
        cellEditConfig: GetDefaultTableCellEditConfig(),
        tableOptionsConfig: GetDefaultTableWrapperOptionsConfig()
    }
}





