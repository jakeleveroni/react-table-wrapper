import React from "react";

import {TableWrapperService} from "./table-wrapper.service";
import {
    BootstrapTable, CellEdit, KeyboardNavigation,
    Options, SelectRow,
    TableHeaderColumn
} from "react-bootstrap-table";
import {TableWrapperColumnConfig} from "../../lib/models/table-models/table-wrapper-column.config";
import {BaseError} from "../../lib/models/error-models/base-error.model";
import {TableOverridesModel} from "../../lib/models/table-models/table-overrides.model";
import {AbstractTableBuilder} from "./abstract-table-builder.service";
import {BuiltTableConfig} from "../../lib/models/table-models/built-table-config.model";
import {TableWrapperConfig} from "../../lib/models/table-models/table-wrapper.model";
import {TableManipulationConfig} from "../../lib/models/table-models/table-manipulation-config.model";
import {TableStylingConfig} from "../../lib/models/table-models/table-styling-config.model";
import {RowExpansionConfig} from "../../lib/models/table-models/table-row-expansion-config.model";

export class AgentToolsTableBuilder<T extends object> extends AbstractTableBuilder<T> {
    private table: Partial<BuiltTableConfig<T>> = {};

    public initializeTable(data: T[], tableConfig: TableWrapperConfig<T>, columns: TableWrapperColumnConfig<T>[]) {
        this.table = {
            data,
            tableConfig,
            columns
        };
        return this;
    }

    public withTableRowActions(tableActions: TableManipulationConfig) {
        if (this.table.tableConfig) {
            this.table.tableConfig.tableAlterationActions = tableActions
        }

        return this;
    }

    public withTableStylings(tableStyling: TableStylingConfig) {
        if (this.table.tableConfig) {
            this.table.tableConfig.styling = tableStyling
        }

        return this;
    }

    public withTableRowExpansion(rowExpansionConfig: RowExpansionConfig) {
        if (this.table.tableConfig) {
            this.table.tableConfig.rowExpansionConfig = rowExpansionConfig
        }

        return this;
    }

    public withKeyboardNavigation(keyboardNavigationConfig: KeyboardNavigation) {
        if (this.table.tableConfig) {
            this.table.tableConfig.keyboardNavigationConfig = keyboardNavigationConfig
        }

        return this;
    }

    public withRowSelection(rowSelectConfig: SelectRow) {
        if (this.table.tableConfig) {
            this.table.tableConfig.rowSelectionConfig = rowSelectConfig
        }

        return this;
    }

    public withCellEditing(cellEditingConfig: CellEdit) {
        if (this.table.tableConfig) {
            this.table.tableConfig.cellEditConfig = cellEditingConfig
        }

        return this;
    }

    public withTableOptions(tableOptionsConfig: Options<T>) {
        if (this.table.tableConfig) {
            this.table.tableConfig.tableOptionsConfig = tableOptionsConfig
        }

        return this;
    }

    public build() {
        return this.table;
    }


    public buildJSX(input?: any): BaseError | JSX.Element {
        let config = null;

        if (input) {
            config = this.ingestTableJson(input);
        } else {
            config = this.ingestTableJson(this.build());
        }


        if (config instanceof BaseError) {
            return config;
        } else {
            return this.generateComponentJsx(config);
        }
    }

    public buildConfig(input: any): BuiltTableConfig<T> | BaseError {
        return this.ingestTableJson(input);
    }

    protected ingestTableJson(tableConfig: any): BuiltTableConfig<T> | BaseError {
        // transform data if needed
        tableConfig.data = this.transformData(tableConfig.data, tableConfig.dataTransformer);

        const table = this.generateTableWithOverrides(tableConfig.data,
            tableConfig.mainConfig, tableConfig.columnsConfig,
            tableConfig.optionsConfig, tableConfig.overrides
        );

        return table;
    }

    protected transformData(data: any[], transformer?: (data: any[]) => T[]): T[] {
        if (!transformer) {
            return data;
        } else {
            return transformer(data);
        }
    }

    protected generateTableWithOverrides(data: T[],
                                      tableConfig: TableWrapperConfig<T>,
                                      columnsDefinition: Array<Partial<TableWrapperColumnConfig<T>>>,
                                      tableOptions?: Options<T>,
                                      tableOverridesModel?: TableOverridesModel<T>): BuiltTableConfig<T> | BaseError {
        return TableWrapperService.buildTableWrapperProps<T>(data, tableConfig, columnsDefinition,
            tableOptions, tableOverridesModel);
    }

    public generateComponentJsx(tableModel: BuiltTableConfig<T>): JSX.Element | BaseError {
        if (!tableModel) {
            return new BaseError('Cannot generate table jsx with null model');
        } else {
            const columns = this.generateColumnsJsx(tableModel.columns);

            if (columns instanceof BaseError) {
                return columns;
            } else {
                return (<React.Fragment>
                    <BootstrapTable data={tableModel.data}
                                    height={tableModel.tableConfig.height}
                                    maxHeight={tableModel.tableConfig.maxHeight}
                                    striped={tableModel.tableConfig.striped}
                                    hover={tableModel.tableConfig.onHoverHighlight}
                                    condensed={tableModel.tableConfig.denseView}
                                    bordered={tableModel.tableConfig.isBordered}
                                    pagination={tableModel.tableConfig.hasPagination}
                                    trClassName={tableModel.tableConfig.trClassName}
                                    insertRow={tableModel.tableConfig.tableAlterationActions?.insertionSettings.canInsert}
                                    deleteRow={tableModel.tableConfig.tableAlterationActions?.deletionSettings.canDelete}
                                    columnFilter={tableModel.tableConfig.columnSpecificFiltering}
                                    search={tableModel.tableConfig.hasSearch}
                                    searchPlaceholder={tableModel.tableConfig.searchPlaceHolder}
                                    multiColumnSearch={tableModel.tableConfig.multiColumnSearch}
                                    exportCSV={tableModel.tableConfig.exportCsv}
                                    csvFileName={tableModel.tableConfig.csvFileName}
                                    ignoreSinglePage={tableModel.tableConfig.ignorePaginationIfOnlyOnePage}
                                    scrollTop={tableModel.tableConfig.scrollTop}
                                    containerStyle={tableModel.tableConfig.styling?.containerStyleObject}
                                    tableStyle={tableModel.tableConfig.styling?.tableStyleObject}
                                    headerStyle={tableModel.tableConfig.styling?.headerStyleObject}
                                    bodyStyle={tableModel.tableConfig.styling?.bodyStyleObject}
                                    containerClass={tableModel.tableConfig.styling?.containerClass}
                                    tableContainerClass={tableModel.tableConfig.styling?.tableContainerClass}
                                    headerContainerClass={tableModel.tableConfig.styling?.headerContainerClass}
                                    bodyContainerClass={tableModel.tableConfig.styling?.bodyContainerClass}
                                    tableHeaderClass={tableModel.tableConfig.styling?.tableHeaderClass}
                                    tableBodyClass={tableModel.tableConfig.styling?.tableBodyClass}
                                    expandableRow={tableModel.tableConfig.rowExpansionConfig?.expandableRow}
                                    expandComponent={tableModel.tableConfig.rowExpansionConfig?.expandableComponent}
                                    expandColumnOptions={tableModel.tableConfig.rowExpansionConfig?.expandColumnOptions}
                                    multiColumnSort={tableModel.tableConfig.multiColumnSortLimit}
                                    keyBoardNav={tableModel.tableConfig.keyboardNavigationConfig}
                                    selectRow={tableModel.tableConfig.rowSelectionConfig}
                                    cellEdit={tableModel.tableConfig.cellEditConfig}
                                    options={tableModel.tableConfig.tableOptionsConfig}>
                        {columns}
                    </BootstrapTable>
                </React.Fragment>);
            }
        }
    }

    protected generateColumnsJsx(columnsDefinition: TableWrapperColumnConfig<T>[]): BaseError | JSX.Element[] {
        if (!columnsDefinition) {
            return new BaseError('Cannot generate table columns with null definition');
        } else {
            return columnsDefinition.map((col, idx) => {
                    return (<TableHeaderColumn key={idx}
                                               isKey={col.isKey}
                                               dataField={col.dataField}
                                               width={col.width}
                                               dataAlign={col.dataAlign}
                                               headerAlign={col.headerAlign}
                                               dataSort={col.dataSort}
                                               caretRender={col.caretRender}
                                               dataFormat={col.dataFormat}
                                               formatExtraData={col.formatExtraData}
                                               tdAttr={col.tdAttr}
                                               tdStyle={col.tdStyle}
                                               thStyle={col.thStyle}
                                               filterFormatted={col.filterFormatted}
                                               filterValue={col.filterValue}
                                               csvFormat={col.csvFormat}
                                               csvFormatExtraData={col.csvFormatExtraData}
                                               hidden={col.hidden}
                                               export={col.export}
                                               expandable={col.expandable}
                                               autoValue={col.autoValue}
                                               searchable={col.searchable}
                                               columnTitle={col.showColumnTitle}
                                               headerTitle={col.headerTitle}
                                               headerText={col.headerText}
                                               sortFunc={col.sortFunc}
                                               className={col.determineClassName}
                                               columnClassName={col.columnClassName}
                                               editColumnClassName={col.editColumnClassName}
                                               invalidEditColumnClassName={col.invalidEditColumnClassName}
                                               editable={col.editable}
                                               customEditor={col.customEditor}
                                               filter={col.filter}
                                               row={col.rowCount}
                                               rowSpan={col.rowSpan}
                                               colSpan={col.colSpan}>{col.headerText}</TableHeaderColumn>);
                }
            );
        }
    }
}
