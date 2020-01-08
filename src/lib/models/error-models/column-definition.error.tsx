import {BaseError} from "./base-error.model";

export class ColumnDefinitionError extends BaseError {
    constructor(msg: string) {
        super(msg, 'ColumnDefinitionError')
    }
}
