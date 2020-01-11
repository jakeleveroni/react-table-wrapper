import {CSSProperties} from "react";
import {TableStylingConfig} from "../models/table-models/table-styling-config.model";

export function TableStyleMixin(containerStyleObject: CSSProperties,
                                    tableStyleObject: CSSProperties,
                                    headerStyleObject: CSSProperties,
                                    bodyStyleObject: CSSProperties,
                                    containerClass: string,
                                    tableContainerClass: string,
                                    headerContainerClass: string,
                                    bodyContainerClass: string,
                                    tableHeaderClass: string,
                                    tableBodyClass: string): TableStylingConfig {
    return {
        containerStyleObject,
        tableStyleObject,
        headerStyleObject,
        bodyStyleObject,
        containerClass,
        tableContainerClass,
        headerContainerClass,
        bodyContainerClass,
        tableHeaderClass,
        tableBodyClass,
    }

}
