import {CellEdit} from "react-bootstrap-table";

export function BuildCellEditingMixin(mode: 'click' | 'dbclick',
                                      blurToEscape: boolean, blurToSave: boolean,
                                      nonEditableRows: () => string[],
                                      beforeSaveCell?: (row: any, cellName: any, cellValue: any) => boolean,
                                      afterSaveCell?: (row: any, cellName: any, cellValue: any) => boolean): CellEdit {
    return {
        mode,
        blurToEscape,
        blurToSave,
        nonEditableRows,
        beforeSaveCell,
        afterSaveCell
    };
}
