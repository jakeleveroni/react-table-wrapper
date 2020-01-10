import {TableWrapperColumnConfig} from "../models/table-models/table-wrapper-column.config";
import {ColumnDefinitionError} from "../models/error-models/column-definition.error";

export function validateColumnDefinitions<T extends object>(columns: TableWrapperColumnConfig<T>[]): null | ColumnDefinitionError {
    let errString: string | null = null;

    for (let col of columns) {
        errString = validateColumnDef(col);

        if (errString !== null) {
            break;
        }
    }

    return errString !== null ? new ColumnDefinitionError(errString) : null;
}

export function validateColumnDef<T extends object>(col: TableWrapperColumnConfig<T>): string | null {
    // TODO add validation rules for columns here
    return null;
}
