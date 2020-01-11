import {ReactElement} from "react";

export class AbstractFormatter {
    public format(value: string, extras?: any): string | ReactElement {
        return '';
    }

    public validateInput(value: string): boolean {
        return !!(value && value.length > 0);
    }
}
