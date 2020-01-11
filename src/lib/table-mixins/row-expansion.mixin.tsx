import {ReactElement} from "react";
import {RowExpansionConfig} from "../models/table-models/table-row-expansion-config.model";

export function RowExpansionMixin(isRowExpandable: (row: any) => boolean,
                                  expansionRowComponent: (row: any) => string | ReactElement,
                                  columnWidth?: string,
                                  expandColumnVisible?: boolean,
                                  expandColumnBeforeSelectColumn?: boolean,
                                  expandColumnComponent?: (data: {isExpandableRow: boolean, isExpanded: boolean}) => string | ReactElement): RowExpansionConfig {
    return {
        expandableComponent: expansionRowComponent,
        expandableRow: isRowExpandable,
        options: {
            columnWidth,
            expandColumnVisible: expandColumnVisible,
            expandColumnBeforeSelectColumn: expandColumnBeforeSelectColumn,
            expandColumnComponent: expandColumnComponent
        }
    }
}
