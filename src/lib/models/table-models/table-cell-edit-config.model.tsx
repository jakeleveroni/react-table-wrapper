import {CellEdit} from "react-bootstrap-table";

export function GetDefaultTableCellEditConfig(): CellEdit {
    return {
        mode: 'none',
        blurToEscape: undefined,
        blurToSave: undefined,
        nonEditableRows: undefined,
        beforeSaveCell: undefined,
        afterSaveCell: undefined
    }
}
