// Table actions for insertion and deletion
export interface TableManipulationConfig {
    insertionSettings: {
        canInsert?: boolean;
        afterInsert?: any;
    };
    deletionSettings: {
        canDelete?: boolean;
        afterDelete?: any;
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
