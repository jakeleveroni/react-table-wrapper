import React from 'react';

import {AbstractTableBuilder} from "../../services/table-building-services/abstract-table-builder.service";
import {TableWrapperConfig} from "../../lib/models/table-models/table-wrapper.model";
import {TableWrapperColumnConfig} from "../../lib/models/table-models/table-wrapper-column.config";
import {BuiltTableConfig} from "../../lib/models/at-common-tables/built-table-config.model";
import {BaseError} from "../../lib/models/error-models/base-error.model";

export interface TableWrapperComponentProps<T extends object> {
    data: T[];
    tableConfig: TableWrapperConfig<T>;
    columns: TableWrapperColumnConfig<T>[];
    tableBuilderService: AbstractTableBuilder<T>;
}

export class TableWrapperComponent<T extends object> extends React.Component<TableWrapperComponentProps<T>, {}> {
    public render() {
        const table = this.generateTableJsx();

        if (table instanceof BaseError) {
            return table.getErrorJsx();
        } else {
            return (<div className="react-table-wrapper-container">
                {table}
            </div>);
        }
    }

    private generateTableJsx(): JSX.Element | BaseError {
        const tableModel: BuiltTableConfig<T> | BaseError =
            this.props.tableBuilderService.generateBaseTable(
                this.props.data,
                this.props.columns,
                this.props.tableConfig.tableOptionsConfig);

        if (tableModel instanceof BaseError) {
            return tableModel;
        } else {
            return this.props.tableBuilderService.generateTableElement(tableModel);
        }
    }
}
