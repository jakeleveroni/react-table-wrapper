import React from 'react';

import {BaseError} from "../../lib/models/error-models/base-error.model";
import {AbstractTableBuilder} from "../../services/table-building-services/abstract-table-builder.service";

export interface TableWrapperComponentProps<T extends object> {
    tableModel: any,
    tableBuilder: AbstractTableBuilder<T>;
}

export interface TableWrapperState {
    tableJsx?: JSX.Element | BaseError
    hasError: boolean;
    errorText?: string;
}

export class TableWrapperComponent<T extends object> extends React.Component<TableWrapperComponentProps<T>, TableWrapperState> {
    constructor(props: TableWrapperComponentProps<T>) {
        super(props);
        const tableConfig = this.props.tableBuilder.buildConfig(this.props.tableModel);

        if (tableConfig instanceof BaseError) {
            this.state = {
                tableJsx: undefined,
                hasError: true,
                errorText: tableConfig.message
            };
        } else {
            this.state = {
                tableJsx: this.props.tableBuilder.generateComponentJsx(tableConfig),
                hasError: false,
            };
        }

    }

    public render() {
        if (this.state.tableJsx instanceof BaseError) {
            return this.state.tableJsx.getErrorJsx();
        } else {
            return (<div className="react-table-wrapper-container">
                {this.state.tableJsx}
            </div>);
        }
    }
}
