import {AbstractFormatter} from "./abstract-formatter";
import React, {ReactElement} from "react";

export class ButtonFormatter extends AbstractFormatter {
    format(value: string, extras?: any): string | ReactElement {
        if (this.validateInput(value) && extras && extras.action
            && extras.actionParams.row && extras.actionParams.data
            && extras.actionParams.ndx !== null) {
            return <button onClick={() => {
                extras.action(extras.actionParams.cell,
                    extras.actionParams.row,
                    extras.actionParams.data,
                    extras.actionParams.ndx);
                }}>{value}</button>;
        } else {
            return "";
        }
    }
}
