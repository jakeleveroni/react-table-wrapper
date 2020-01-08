import {BaseError} from "./base-error.model";

export class ColumnDefinitionErrorModel extends BaseError {
    constructor(msg: string) {
        super(msg, 'ColumnDefinitionError')
    }
}
