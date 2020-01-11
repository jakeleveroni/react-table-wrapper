import {AbstractFormatter} from "./abstract-formatter";
import {ReactElement} from "react";

export class USDFormatter extends AbstractFormatter {
    format(value: string, extras?: any): string | ReactElement {
        const numVal = Number(value);

        if (!isNaN(numVal)) {
            return `$${numVal.toFixed(2)}`
        } else {
            return "Error";
        }
    }
}
