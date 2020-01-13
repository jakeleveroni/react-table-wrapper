// Table actions for insertion and deletion
export interface TableManipulationConfig {
    insertionSettings: {
        canInsert?: boolean;
        afterInsert?: (rowKeys: any) => void;
    };
    deletionSettings: {
        canDelete?: boolean;
        afterDelete?: (rowKeys: any) => void;
    };
}

export function GetDefaultTableManipulationConfig(): TableManipulationConfig {
    return {
        insertionSettings: {
            afterInsert: undefined,
            canInsert: false
        },
        deletionSettings: {
            afterDelete: undefined,
            canDelete: false
        }
    }
}
