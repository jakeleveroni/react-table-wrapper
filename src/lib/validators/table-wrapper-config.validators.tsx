import {TableWrapperConfig} from "../models/table-models/table-wrapper.model";
import {TableWrapperError} from "../models/error-models/table-wrapper-error";
import {UtilityService} from "../../services/utlity.service";

export function validateTableWrapperConfig<T extends object>(config: TableWrapperConfig<T>): boolean | TableWrapperError {
    if (config.multiColumnSortLimit && config.multiColumnSortLimit < 1) {
        return createTableWrapperError('Multi sort column limit has to be a positive number');
    }

    if (config.exportCsv && !config.csvFileName) {
        return createTableWrapperError('Export csv was enabled but no csv filename was specified');
    }

    // TODO this will one day be supported
    if (config.fetchInfo) {
        return createTableWrapperError('Fetch info is not currently supported.');
    }

    return true;
}

export function validateTableAlterationActionsConfig<T extends object>(config: TableWrapperConfig<T>): boolean | TableWrapperError {
    if (config.tableAlterationActions.insertionSettings.canInsert && !config.tableOptionsConfig.afterInsertRow) {
        return createTableWrapperError('Cannot enable row insertion without an afterInsertRow callback');
    }

    if (config.tableAlterationActions.deletionSettings.canDelete && !config.tableOptionsConfig.afterDeleteRow) {
        return createTableWrapperError('Cannot enable row deletion without an afterDeleteRow callback');
    }

    return true;
}

export function validateTableKeyboardNavigationConfig<T extends object>(config: TableWrapperConfig<T>): boolean | TableWrapperError {
    // TODO no validation thus far
    return true;
}

export function validateTableRowExpansionConfig<T extends object>(config: TableWrapperConfig<T>): boolean | TableWrapperError {
    if (UtilityService.objectXOR(config.rowExpansionConfig.expandableRow, config.rowExpansionConfig.expandableComponent)) {
        return createTableWrapperError('Must define either both or neither of the expandableRow and expandableComponent');
    }

    return true;
}

export function validateTableRowSelectionConfig<T extends object>(config: TableWrapperConfig<T>): boolean | TableWrapperError {
    if (config.rowSelectionConfig && config.rowSelectionConfig.mode === 'none') {
        return createTableWrapperError('If you want to enable row selection you must set the row selection mode');
    }

    return true;
}

export function validateEntireTable<T extends object>(config: TableWrapperConfig<T>): boolean | TableWrapperError {
    let validationResults = validateTableWrapperConfig(config);

    if (!validationResults) return validationResults;

    validationResults = validateTableAlterationActionsConfig(config);
    if (!validationResults) return validationResults;

    validationResults = validateTableKeyboardNavigationConfig(config);
    if (!validationResults) return validationResults;

    validationResults = validateTableRowExpansionConfig(config);
    if (!validationResults) return validationResults;

    validationResults = validateTableRowSelectionConfig(config);
    if (!validationResults) return validationResults;

    return true;
}

function createTableWrapperError(msg: string): TableWrapperError {
    const errMsg = `[TABLE-VALIDATION][WRAPPER-CONFIG]: ${msg}`;
    return new TableWrapperError(errMsg);
}
