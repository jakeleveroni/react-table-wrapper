import {KeyboardNavigation} from "react-bootstrap-table";

export function GetDefaultTableKeyboardNavigationConfig(): KeyboardNavigation {
    return {
        customStyle: undefined,
        clickToNav: false,
        customStyleOnEditCell: undefined,
        enterToEdit: undefined,
        enterToExpand: undefined,
        enterToSelect: undefined
    };
}
