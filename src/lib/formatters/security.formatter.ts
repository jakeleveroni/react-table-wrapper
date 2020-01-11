import {AbstractFormatter} from "./abstract-formatter";

export class MaskSSN extends AbstractFormatter {
    format(value: string): string {
        if (this.validateInput(value)) {
            return `***-**-${value.slice(value.length - 4, value.length)}`
        }
        return value;
    }
}

export class MaskTIN extends AbstractFormatter {
    format(value: string): string {
        if (this.validateInput(value)) {
            const sections = value.split('-');

            if (sections.length === 3) {
                return `***-**-${value.slice(value.length - 4, value.length)}`
            } else if (sections.length === 2) {
                return `**-***${value.slice(value.length - 4, value.length)}`
            } else {
                return 'Error';
            }

        }
        return value;
    }
}

export class MaskKey extends AbstractFormatter {
    format(value: string): string {
        if (this.validateInput(value)) {
            return `***${value.slice(value.length - 4, value.length)}`
        }
        return value;
    }
}


