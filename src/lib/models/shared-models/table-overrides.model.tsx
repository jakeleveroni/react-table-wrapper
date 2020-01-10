import {TableStylingConfig} from "../table-models/table-styling-config.model";
import {CellEdit, KeyboardNavigation, SelectRow} from "react-bootstrap-table";
import {TableManipulationConfig} from "../table-models/table-manipulation-config.model";
import {RowExpansionConfig} from "../table-models/table-row-expansion-config.model";

export interface TableOverridesModel<T extends object> {
    tableStylingConfig?: Partial<TableStylingConfig>;
    tableCellEditConfig?: Partial<CellEdit<T>>;
    tableKeyboardNavigationConfig?: Partial<KeyboardNavigation>;
    tableManipulationConfig?: Partial<TableManipulationConfig>;
    tableRowExpansionConfig?: Partial<RowExpansionConfig>;
    tableRowSelectionConfig?: Partial<SelectRow<T>>;
}
