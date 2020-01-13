import React, {CSSProperties, ReactElement} from 'react';
import {CustomAttrs, CustomEditor, Filter, SortOrder} from "react-bootstrap-table";

type AlignDirection = 'left' | 'right' | 'center' | 'start' | 'end';

export interface TableWrapperColumnConfig<T extends object = any> {
    type?: 'basic' | 'button' | 'dropdown' | 'dropdown-bootstrap';
    dataField: string,
    isKey?: boolean;
    width?: string;
    dataAlign?: AlignDirection;
    headerAlign?: AlignDirection;
    dataSort?: boolean;
    caretRender?: (direction: 'asc' | 'desc', sortingFieldName: string) => ReactElement;
    dataFormat?: (cell: any, row: any, formatExtraData: any, rowIndex: number) => string | ReactElement
    formatExtraData?: any;
    tdAttr?: CustomAttrs;
    tdStyle?: CSSProperties;
    thStyle?: CSSProperties;
    filterFormatted?: boolean;
    filterValue?: (cell: any, row: any) => any;
    csvHeader?: string;
    csvFormat?: (cell: any, row: any) => string;
    csvFormatExtraData?: CSSProperties;
    hidden?: boolean;
    export?: boolean;
    expandable?: boolean;
    autoValue?: boolean;
    searchable?: boolean;
    showColumnTitle?: boolean;
    headerTitle?: boolean;
    headerText?: string;
    sortFunc?: (a: T, b: T, order: SortOrder, sortField: keyof T, extraData: any) => number;
    determineClassName?: string | ((cell: any, row: any, rowIndex: number, columnIndex: number) => string);
    columnClassName?: string | ((cell: any, row: any, rowIndex: number, columnIndex: number) => string);
    editColumnClassName?: string | ((cell: any, row: any) => string);
    invalidEditColumnClassName?: string | ((cell: any, row: any) => string);
    editable?: boolean;
    customEditor?: CustomEditor<T, any>;
    filter?: Filter;
    rowCount?: number;
    rowSpan?: number;
    colSpan?: number;
    cellAction?: (row: any, col: any, data: any, ndx: number) => string | ReactElement;
    dropdownSelectionValues?: string[];
}

export function GetDefaultTableWrapperColumnConfig<T extends object>(key: string): TableWrapperColumnConfig<T> {
    return {
        type: 'basic',
        dataField: key,
        isKey: false,
        width: undefined,
        dataAlign: undefined,
        headerAlign: undefined,
        dataSort: false,
        caretRender: undefined,
        dataFormat: undefined,
        formatExtraData: undefined,
        tdAttr: undefined,
        tdStyle: undefined,
        thStyle: undefined,
        filterFormatted: undefined,
        filterValue: undefined,
        csvFormat: undefined,
        csvFormatExtraData: undefined,
        hidden: false,
        export: undefined,
        expandable: undefined,
        autoValue: undefined,
        searchable: true,
        showColumnTitle: true,
        headerTitle: true,
        headerText: key,
        sortFunc: undefined,
        determineClassName: undefined,
        columnClassName: undefined,
        editColumnClassName: undefined,
        invalidEditColumnClassName: undefined,
        editable: undefined,
        customEditor: undefined,
        filter: undefined,
        rowCount: undefined,
        rowSpan: undefined,
        colSpan: undefined,
        cellAction: undefined,
        dropdownSelectionValues: undefined
    }
}

export function GetTableColumnWithActionButton<T extends object>(key: string,
                                                                 text: string,
                                                                 extraData: any,
                                                                 action: (a: any, b: any, c: any, d: any) => string | ReactElement)
    : TableWrapperColumnConfig<T> {
    const col = GetDefaultTableWrapperColumnConfig<T>(key);
    col.headerText = text;
    col.formatExtraData = extraData;
    col.dataFormat = (a, b, c, d) => {
        return <button className={extraData.className} onClick={() => {
            action(a, b, c, d);
        }}>{text}</button>
    };

    return col;
}

export function GetTableColumnWithDropDown<T extends object>(key: string,
                                                             options: string[],
                                                             extraData: any,
                                                             action: (a: any, b: any, c: any, d: any) => string | ReactElement)
    : TableWrapperColumnConfig<T> {
    const col = GetDefaultTableWrapperColumnConfig<T>(key);
    col.formatExtraData = extraData;
    col.dataFormat = (a, b, c, d) => {
        return <select onChange={($event) => {
            return action($event.target.value, b, c, d);
        }}>
            {options.map((x, ndx) => {
                return <option key={ndx} value={x}>{x}</option>
            })}
        </select>;
    };

    return col;
}

export function GetTableColumnWithBootstrapDropDown<T extends object>(key: string,
                                                             options: string[],
                                                             extraData: any,
                                                             action: (a: any, b: any, c: any, d: any) => string | ReactElement)
    : TableWrapperColumnConfig<T> {
    const col = GetDefaultTableWrapperColumnConfig<T>(key);
    col.formatExtraData = extraData;
    col.dataFormat = (a, b, c, d) => {
        return <div className="dropdown">
            <button className="btn btn-outline-success dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown">
                Select
            </button>
            <div className="dropdown-menu dropdown-menu-right">
                {options.map((x, ndx) => {
                    return <button key={ndx} className="dropdown-item" onClick={($event) => {
                        return action(x, b, c, d);
                    }}>{x}</button>
                })}
            </div>
        </div>;
    };

    return col;
}
