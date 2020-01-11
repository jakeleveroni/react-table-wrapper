import {AbstractFormatter} from "./abstract-formatter";

export class CapitalizeFirst extends AbstractFormatter {
    format(value: string): string {
        if (this.validateInput(value)) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    }
}

export class CapitalizeEachWord extends AbstractFormatter {
    format(value: string): string {
        if (this.validateInput(value)) {
            const words = value.split(' ');
            return words.map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ');
        }
        return value;
    }
}

export class UpperCaseAll extends AbstractFormatter {
    format(value: string): string {
        if (this.validateInput(value)) {
            return value.toUpperCase();
        }
        return value;
    }
}

export class LowerCaseAll extends AbstractFormatter {
    format(value: string): string {
        if (this.validateInput(value)) {
            return value.toLowerCase();
        }
        return value;
    }
}

export class InsertSeperator extends AbstractFormatter {
    format(value: string, extras: {splitDelimiter: string, splitRejoiner: string}): string {
        if (this.validateInput(value)) {
            return value.split(extras.splitDelimiter).join(extras.splitRejoiner);
        }
        return value;
    }
}
