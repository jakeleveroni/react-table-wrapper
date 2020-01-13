import {UpperCaseAll} from "../../lib/formatters/string.formatter";
import {MaskSSN} from "../../lib/formatters/security.formatter";

export function GetAtBaseTable(data: any[]) {
    return {
        data,
        dataTransformer: (data: any[]) => { return data },
        mainConfig: {
            striped: true,
            onHoverHighlight: true,
            denseView: true,
            isBordered: true,
            hasPagination: false,
            trClassName: "at-base-table-row",
            columnSpecificFiltering: false,
            hasSearch: true,
            searchPlaceHolder: "Search",
            multiColumnSearch: false,
            exportCsv: false,
            ignorePaginationIfOnlyOnePage: true,
            keyboardNavigationConfig: false
        },
        columnsConfig: [{
            type: 'basic',
            dataSort: true,
            dataField: 'firstName',
            headerText: 'First Name',
            isKey: true,
        }, {
            type: 'basic',
            dataField: 'lastName',
            headerText: 'Last Name',
        }, {
            type: 'basic',
            dataField: 'email',
            headerText: 'Email',
        }, {
            type: 'basic',
            dataField: 'phone',
            headerText: 'Phone #',
        }, {
            type: 'basic',
            dataField: 'signupDate',
            headerText: 'Sign-up Date',
        }, {
            type: 'basic',
            dataField: 'ssn',
            headerText: 'SSN',
            dataFormat: (value: any) => {
                return new MaskSSN().format(value);
            }
        }, {
            type: 'basic',
            dataField: 'locale',
            headerText: 'Locale',
            dataFormat: (value: any) => {
                return new UpperCaseAll().format(value);
            }
        }, {
            type: 'basic',
            dataField: 'isSubscribed',
            headerText: 'Is Subscribed',
        }, {
            type: 'button',
            dataField: 'action',
            headerText: 'Action',
            formatExtraData: {
                test: 'hello',
                className: 'btn btn-primary'
            },
            cellAction: (cellValue: any, rowValue: any, extraData: any, ndx: number) => {
                console.log('[button] here', cellValue, rowValue, extraData, ndx);
            }
        }, {
            type: 'dropdown-bootstrap',
            dataField: 'dropdown',
            headerText: 'Drop Down',
            dropdownSelectionValues: [
                'Yes',
                'No',
                'Maybe',
                'No Answer'
            ],
            formatExtraData: {
                test: 'hello',
                selectClassName: 'dropdown-menu',
                selectItemClassName: 'dropdown-item'
            },
            cellAction: (cellValue: any, row: any, extraData: any, ndx: number) => {
                console.log('[drop-down] here', cellValue, row, extraData, ndx);
            }
        }],
        optionsConfig: {
            striped: true,
            sortIndicator: true,
            noDataText: 'No data...',
            hidePageListOnlyOnePage: true,
        }
    }
};
