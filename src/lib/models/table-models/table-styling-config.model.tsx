import {CSSProperties} from "react";

export interface TableStylingConfig {
    containerStyleObject?: CSSProperties;
    tableStyleObject?: CSSProperties;
    headerStyleObject?: CSSProperties;
    bodyStyleObject?: CSSProperties;
    containerClass?: string;
    tableContainerClass?: string;
    headerContainerClass?: string;
    bodyContainerClass?: string;
    tableHeaderClass?: string;
    tableBodyClass?: string;
}

export function GetDefaultTableStylingConfig(): TableStylingConfig {
    return {
        containerStyleObject: undefined,
        tableStyleObject: undefined,
        headerStyleObject: undefined,
        bodyStyleObject: undefined,
        containerClass: undefined,
        tableContainerClass: undefined,
        headerContainerClass: undefined,
        bodyContainerClass: undefined,
        tableHeaderClass: undefined,
        tableBodyClass: undefined,
    };
}
