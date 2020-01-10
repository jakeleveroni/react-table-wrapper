import {CSSProperties, ReactElement} from "react";
import {CustomAttrs, CustomEditor, Filter, SortOrder} from "react-bootstrap-table";

import merge from 'lodash/merge';

type AlignDirection = 'left' | 'right' | 'center' | 'start' | 'end';

export interface TableWrapperColumnConfig<T extends object = any> {
    dataField: string,
    isKey?: boolean;
    width?: string;
    dataAlign?: AlignDirection;
    headerAlign?: AlignDirection;
    dataSort?: boolean;
    caretRender?: (direction: 'asc' | 'desc', sortingFieldName: string) => ReactElement;
    dataFormat?: (cell: any, row: any, formatExtraData: any, rowIndex: number) => string | ReactElement
    formatExtraData?: (cell: any, row: any, formatExtraData: any, rowIndex: number) => string | ReactElement;
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
    disableHeaderColTitle?: boolean;
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
}

export function GetDefaultTableWrapperColumnConfig<T extends object>(key: string): TableWrapperColumnConfig<T> {
    return {
        dataField: key,
        isKey: false,
        width: undefined,
        dataAlign: 'center',
        headerAlign: 'center',
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
        hidden: undefined,
        export: undefined,
        expandable: undefined,
        autoValue: undefined,
        searchable: undefined,
        showColumnTitle: true,
        disableHeaderColTitle: false,
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
    }
}

export function GetColumnsFromKeyArrayAndColumnConfigArray<T extends object>(keys: string[], configs: Partial<TableWrapperColumnConfig<T>>[]) {
    const columns: TableWrapperColumnConfig<T>[] = [];
    for (let i = 0; i < keys.length; ++i) {
        const defaultColumnConfig = GetDefaultTableWrapperColumnConfig(keys[i]);
        columns.push(merge(defaultColumnConfig, configs[i]));
    }
    return columns;
}
