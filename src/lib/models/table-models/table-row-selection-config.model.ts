import {SelectRow} from "react-bootstrap-table";

export function GetDefaultRowSelectionConfig(): SelectRow {
    return {
        mode: 'none',
        clickToSelect: undefined,
        clickToSelectAndEditCell: undefined,
        clickToExpand: undefined,
        bgColor: undefined,
        columnWidth: undefined,
        className: undefined,
        selected: undefined,
        unselectable: undefined,
        hideSelectColumn: undefined,
        showOnlySelected: undefined,
        onSelect: undefined,
        onSelectAll: undefined,
        customComponent: undefined,
        onlyUnselectVisible: undefined
    };
}
