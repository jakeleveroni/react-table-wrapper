import {TableManipulationConfig} from "../models/table-models/table-manipulation-config.model";

export function TableManipulationMixin(afterInsert: (row: any) => void, afterDelete: (rowKeys: string[]) => void): TableManipulationConfig {
    return {
        insertionSettings: {
            afterInsert: afterInsert,
            canInsert: !!afterInsert
        },
        deletionSettings: {
            afterDelete: afterDelete,
            canDelete: !!afterDelete
        }
    }
}
