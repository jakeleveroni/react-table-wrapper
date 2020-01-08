import {ReactElement} from "react";
import {CustomEditor, Filter, SortOrder} from "react-bootstrap-table";

type AlignDirection = 'left' | 'right' | 'center' | 'start' | 'end';

export interface TableWrapperColumnModel<T extends object> {
    isKey?: boolean;
    width?: string;
    dataAlign?: AlignDirection;
    headerAlign?: AlignDirection;
    dataSort?: boolean;
    caretRender?: (direction: 'asc' | 'desc', sortingFieldName: string) => ReactElement;
    dataFormat?: (cell: any, row: any, formatExtraData: any, rowIndex: number) => string | ReactElement
    formatExtraData?: (cell: any, row: any, formatExtraData: any, rowIndex: number) => string | ReactElement;
    tdAttr?: { [key: string]: string };
    tdStyle?: { [key: string]: string };
    thStyle?: { [key: string]: string };
    filterFormatted?: boolean;
    filterValue?: (cell: any, row: any) => any;
    csvHeader?: string;
    csvFormat?: (cell: any, row: any) => string;
    csvFormatExtraData?: { [key: string]: string };
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

export function GetDefaultColumnDefinition<T extends object>(): Partial<TableWrapperColumnModel<T>> {
    return {
        isKey: false,
        width: undefined,
        dataAlign: 'left',
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
        showColumnTitle: undefined,
        disableHeaderColTitle: undefined,
        headerText: undefined,
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
