import {AbstractFormatter} from "./abstract-formatter";
import {ReactElement} from "react";
import moment from 'moment';

export class YYYMMDDFormat extends AbstractFormatter {
    format(value: string, extras?: any): string | ReactElement{
        return moment(value, 'YYYY-MM-DD').toString();
    }
}

export class MMDDYYYYFormat extends AbstractFormatter {
    format(value: string, extras?: any): string | ReactElement{
        return moment(value, 'MM-DD-YYYY').toString();
    }
}

export class DDMMYYYYFormat extends AbstractFormatter {
    format(value: string, extras?: any): string | ReactElement{
        return moment(value, 'DD-MM-YYYY').toString();
    }
}
