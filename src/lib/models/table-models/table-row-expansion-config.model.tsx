import {ExpandColumnOptions} from "react-bootstrap-table";
import {ReactElement} from "react";

export type RowExpansionConfig = {
    expandableComponent ? : (row: any) => string | ReactElement;
    expandableRow ? : (row: any) => boolean;
    options: ExpandColumnOptions;
};

export function GetDefaultTableRowExpansionConfig(): RowExpansionConfig {
    return {
        expandableComponent: undefined,
        expandableRow: undefined,
        options: {
            columnWidth: undefined,
            expandColumnVisible: undefined,
            expandColumnBeforeSelectColumn: undefined,
            expandColumnComponent: undefined,
            expandedColumnHeaderComponent: undefined
        }
    }
}
