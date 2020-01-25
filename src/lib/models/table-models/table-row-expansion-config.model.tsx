import {ExpandColumnOptions} from "react-bootstrap-table";
import {ReactElement} from "react";

export type RowExpansionConfig = {
    expandableComponent ? : (row: any) => string | ReactElement;
    expandableRow ? : (row: any) => boolean;
    expandColumnOptions: ExpandColumnOptions;
};

export function GetDefaultTableRowExpansionConfig(): RowExpansionConfig {
    return {
        expandableComponent: undefined,
        expandableRow: undefined,
        expandColumnOptions: {
            columnWidth: undefined,
            expandColumnVisible: undefined,
            expandColumnBeforeSelectColumn: undefined,
            expandColumnComponent: undefined,
            expandedColumnHeaderComponent: undefined
        }
    }
}

export function GetDefaultColumnExpansionConfig(): ExpandColumnOptions {
    return {
        expandColumnVisible: undefined,
        expandColumnComponent: undefined,
        columnWidth: undefined,
        expandColumnBeforeSelectColumn: undefined,
        expandedColumnHeaderComponent: undefined,
    }
}
