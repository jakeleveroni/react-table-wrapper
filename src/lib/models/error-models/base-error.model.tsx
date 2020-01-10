import React from 'react';
import ReactDOM from "react-dom";

export class BaseError {
    public message: string;
    public type: string;

    constructor(msg: string, type: string = 'BaseError') {
        this.message = msg;
        this.type = type
    }

    public getErrorJsx(): JSX.Element {
        return (<p>{this.type}: {this.message}</p>);
    }

    public renderError(): void {
        ReactDOM.render(
            <p>{this.type}: {this.message}</p>,
            document.getElementById('root-error-container')
        );
    }
}
