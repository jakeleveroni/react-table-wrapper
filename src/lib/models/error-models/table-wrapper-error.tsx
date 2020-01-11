import {BaseError} from "./base-error.model";

export class TableWrapperError extends BaseError {
    constructor(msg: string) {
        super(msg, 'TableWrapperError')
    }
}
