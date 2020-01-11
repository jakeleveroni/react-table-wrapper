import {KeyboardNavigation} from "react-bootstrap-table";
import {CSSProperties} from "react";

export function KeyboardNavigationMixin(clickToNav?: boolean,
                                        enterToEdit?: boolean,
                                        enterToExpand?: boolean,
                                        enterToSelect?: boolean,
                                        customStyle?: (cell: any, row: any) => CSSProperties,
                                        customStyleOnEditCell?: (cell: any, row: any) => CSSProperties): KeyboardNavigation {
    return {
        clickToNav: clickToNav,
        customStyleOnEditCell: customStyleOnEditCell,
        enterToEdit: enterToEdit,
        enterToExpand: enterToExpand,
        enterToSelect: enterToSelect,
        customStyle: customStyle
    };
}
