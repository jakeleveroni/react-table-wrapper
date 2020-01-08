import {
    GetDefaultTableManipulationConfig,
    TableManipulationConfig
} from "./table-models/table-manipulation-config.model";
import {
    GetDefaultTableStylingConfig,
    TableStylingConfig
} from "./table-models/table-styling-config.model";
import {
    GetDefaultTableRowExpansionConfig,
    TableRowExpansionConfig
} from "./table-models/table-row-expansion-config.model";
import {
    GetDefaultTableKeyboardNavigationConfig,
    TableKeyboardNavigationConfig
} from "./table-models/table-keyboard-navigation-config.model";
import {
    GetDefaultRowSelectionConfig,
    TableRowSelectionConfig
} from "./table-models/table-row-selection-config.model";

export interface TableWrapperModel {
    height?: string;
    maxHeight?: string;
    striped?: boolean;
    onHoverHighlight?: boolean;
    denseView?: boolean;
    isBordered?: boolean;
    hasPagination?: boolean;
    trClassName?: string;
    tableAlterationActions: TableManipulationConfig;
    columnSpecificFiltering?: boolean;
    hasSearch?: boolean;
    searchPlaceHolder?: string;
    multiColumnSearch?: boolean;
    exportCsv?: boolean;
    csvFileName?: string | (() => string);
    ignorePaginationIfOnlyOnePage?: boolean;
    scrollTop?: 'Top' | 'Bottom' | number;
    styling: TableStylingConfig;
    rowExpansionConfig: TableRowExpansionConfig;
    multiColumnSortLimit?: number;
    keyboardNavigationConfig?: TableKeyboardNavigationConfig;
    rowSelectionConfig?: TableRowSelectionConfig;
}

// Helper functions for generating defaulted instances of objects defined in this file
export function GetDefaultTableWrapperModel<T extends object>(): TableWrapperModel {
    return {
        height: undefined,
        maxHeight: undefined,
        striped: false,
        onHoverHighlight: true,
        denseView: false,
        isBordered: false,
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
        rowSelectionConfig: GetDefaultRowSelectionConfig()

    }
}





