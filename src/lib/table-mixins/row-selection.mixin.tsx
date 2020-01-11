import {SelectRow} from "react-bootstrap-table";

export function RowSelectionMixin(mode: 'radio' | 'checkbox',
                                  clickToSelect: boolean,
                                  clickToSelectAndEditCell: boolean,
                                  clickToExpand: boolean,
                                  bgColor: string,
                                  columnWidth: string,
                                  className: string,
                                  selected: string[],
                                  unselectable: string[],
                                  hideSelectColumn: boolean,
                                  showOnlySelected: boolean,
                                  onSelect: (row: any, isSelected: boolean, e: any) => void,
                                  onSelectAll: (isSelected: boolean, rows: any[]) => boolean | (string | number)[]): SelectRow {
    return {
        mode,
        clickToSelect,
        clickToSelectAndEditCell,
        clickToExpand,
        bgColor,
        columnWidth,
        className,
        selected,
        unselectable,
        hideSelectColumn,
        showOnlySelected,
        onSelect,
        onSelectAll,
    };
}
