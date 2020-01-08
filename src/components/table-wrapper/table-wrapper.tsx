import React from 'react';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {TableWrapperColumnConfig} from "../../lib/models/table-models/table-wrapper-column.config";
import {TableWrapperConfig} from "../../lib/models/table-models/table-wrapper.model";

export interface TableWrapperProps<T extends object> {
    data: T[];
    tableConfig: TableWrapperConfig;
    columnsConfig: TableWrapperColumnConfig<T>[];
}

export class TableWrapperComponent<T extends object> extends React.Component<TableWrapperProps<T>, {}> {

    public render() {
        return (<div className="react-table-wrapper-container">
            {this.generateTable()}
        </div>);
    }

    private generateTable() {
        const table = this.props.tableConfig;
        return (
            <React.Fragment>
                <BootstrapTable data={this.props.data}
                                height={table.height}
                                maxHeight={table.maxHeight}
                                striped={table.striped}
                                hover={table.onHoverHighlight}
                                condensed={table.denseView}
                                bordered={table.isBordered}
                                pagination={table.hasPagination}
                                trClassName={table.trClassName}
                                insertRow={table.tableAlterationActions.insertionSettings.canInsert}
                                deleteRow={table.tableAlterationActions.deletionSettings.canDelete}
                                columnFilter={table.columnSpecificFiltering}
                                search={table.hasSearch}
                                searchPlaceholder={table.searchPlaceHolder}
                                multiColumnSearch={table.multiColumnSearch}
                                exportCSV={table.exportCsv}
                                csvFileName={table.csvFileName}
                                ignoreSinglePage={table.ignorePaginationIfOnlyOnePage}
                                scrollTop={table.scrollTop}
                                containerStyle={table.styling.containerStyleObject}
                                tableStyle={table.styling.tableStyleObject}
                                headerStyle={table.styling.headerStyleObject}
                                bodyStyle={table.styling.bodyStyleObject}
                                containerClass={table.styling.containerClass}
                                tableContainerClass={table.styling.tableContainerClass}
                                headerContainerClass={table.styling.headerContainerClass}
                                bodyContainerClass={table.styling.bodyContainerClass}
                                tableHeaderClass={table.styling.tableHeaderClass}
                                tableBodyClass={table.styling.tableBodyClass}
                                expandableRow={table.rowExpansionConfig.expandableRow}
                                expandComponent={table.rowExpansionConfig.expandableComponent}
                                expandColumnOptions={table.rowExpansionConfig.options}
                                multiColumnSort={table.multiColumnSortLimit}
                                keyBoardNav={table.keyboardNavigationConfig}
                                // TODO fetchInfo={} maybe add this later but not at first
                                selectRow={table.rowSelectionConfig}
                                cellEdit={table.cellEditConfig}
                                options={table.tableOptionsConfig}
                >
                    {this.generateColumns()}
                </BootstrapTable>
            </React.Fragment>
        );
    }

    private generateColumns() {
        return (
            <React.Fragment>
                {this.props.columnsConfig.map(col => {
                    return <TableHeaderColumn isKey={col.isKey}
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
                                       headerTitle={col.disableHeaderColTitle}
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
                                       colSpan={col.colSpan}>
                    </TableHeaderColumn>
                    }
                )}
            </React.Fragment>
        );
    }
}
