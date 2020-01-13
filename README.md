## Table Resource
This table is a wrapper around the react-bootstrap-table project. Here are the docs for this project
they do a good job of explaining all the props that it takes

__BootstrapTable Props Docs__: [here](http://allenfang.github.io/react-bootstrap-table/docs.html#propsOnBootstrapTable)

__TableColumnHeader Props Docs__: [here](http://allenfang.github.io/react-bootstrap-table/docs.html#propsOnTableHeaderColumn)
## Installation
    
    npm i jlev-react-table-wrapper
    
or

    yarn add jlev-react-table-wrapper
    
For now also you need to include the following in the `<head>` tag of your apps main entry component:

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://getbootstrap.com/docs/4.1/assets/js/vendor/popper.min.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"> <link rel="stylesheet" href="http://allenfang.github.io/react-bootstrap-table/css/react-bootstrap-table-all.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/css/bootstrap-select.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/js/bootstrap-select.min.js"></script>

We are working on getting rid of this but for the time being this is necessary.

## Building a table
To build a table using this package you need to make use of the AgentToolsTableBuilderService.tsx
and the \<TableWrapperComponent> element. The \<TableWrapperComponent> takes 2 props
`tableBuilder` and `tableModel`.

`tableBuilder`: An instance of a class that implements AbstractTableBuilderService 
i.e. the AgentToolsTableBuilderService class.

`tableModel`: A configuration object of type BuiltTableConfigModel\<T> that defines the input data of the table as well
as all the settings that you want applied to the table. You can see the structure of
this object defined below.

## Examples
An example can be found in the /examples folder. Basically you define a table model that follows the `BuiltTableModel<T>`
guidelines below. This can be seen in the /examples/table-definitions.model.tsx. The you create an instance of the
`AgentToolsTableBuilderService` class which implements the `AbstractTableBuilderService` class. You then pass the service and
the model as props to the \<TableWrapperComponent> i.e.

    <TableWrapperComponent tableModel={your_table_definition} tableBuilder={your_builder_instance}/>

This process can be seen in the `/examples/basic-table/components/basic-table.component.tsx` file.

The `<TableWrapperComponent>` takes an `AbstractTableBuilderService` instance for the builder in case you 
would like to create your own builder service implementation as the only one we have now is geared towards
Agent Tools projects specifically.

## Model Definitions

#### BuiltTableModel\<T extends object> 
A templated type where T is the type of the object that your data input is made up of.
    
    // REQUIRED the collection to put into the table
    data: T[]
    
    // a transformation method that you want applied to the input data defualts null
    dataTransformer?: (data: any[]) => T[]
    
    // REQUIRED the main configuration object for the table defined below
    mainConfig: TableWrapperConfig\<TRow extends object>
    
    // REQUIRED the column definition for the table defined below
    columnsConfig: Array<Partial<TableWrapperColumnConfig<T>>>
    
    // the extra options for style, functionality etc. defined below
    optionsConfig: Options<TRow>
    
    // overrides for other parts of the table defined below, defaults to null
    overrides?: TableOverridesModel<T extends object>
    
##### TableWrapperConfig\<TRow extends object>
A templated type where T is the type of the object that your data input is made up of.

    // height of the table classic css string fashion, defaults to 100%
    height?: string;

    // height of the table classic css string fashion, defaults to 100%    
    maxHeight?: string;
    
    // indicates if rows are striped defaults true
    striped?: boolean;
    
    // indicates if row should darken when hovered over defaults true
    onHoverHighlight?: boolean;
    
    // compacts the table rows and cells defaults false
    denseView?: boolean;
    
    // applies a border around the table defaults true
    isBordered?: boolean;

    // indicates that pagination is active on table, defaults false    
    hasPagination?: boolean;
    
    // class name to apply to each row    
    trClassName?: string;
    
    // definition of actions for insertion into and deletion from the table rows defualt null
    tableAlterationActions: TableManipulationConfig;
    
    // indicates table supports column specific filtering defaults false
    columnSpecificFiltering?: boolean;
    
    // indicates whether search bar is active, defaults true
    hasSearch?: boolean;
    
    // indicates search bar placeholder text, defaults 'Search'
    searchPlaceHolder?: string;
    
    // indicates table supports search across multiple columns defaults true
    multiColumnSearch?: boolean;
    
    // indicates whether table supports export to csv defaults false
    exportCsv?: boolean;
    
    // indicates the name for the csv file exported, defaults '' 
    csvFileName?: string | (() => string);
    
    // indicates not to show paginator if pagination is enabled but there is only 1 page 
    ignorePaginationIfOnlyOnePage?: boolean;
    
    // Not sure at the moment what this is
    scrollTop?: 'Top' | 'Bottom' | number;
    
    // table styling object for applying classes and styles to parts of the table defualt null
    styling: TableStylingConfig;
    
    // defines the options and implementation of row expansion for the table, defualt null
    rowExpansionConfig: RowExpansionConfig;
    
    // indicates max number of rows you can sort by, defaults to 1
    multiColumnSortLimit?: number;
    
    // defines the keyboard navigation implementation for the table, defaults null
    keyboardNavigationConfig?: boolean | KeyboardNavigation;
    
    // TODO not implemented yet, but will define method that table itself can fetch data
    fetchInfo: any;
    
    // defines the row selection implementation for the table defaults null
    rowSelectionConfig?: SelectRow;
    
    // defines the cell editing implementation for the table defaults null    
    cellEditConfig?: CellEdit;
    
    // other table options that are defined below defaults null
    tableOptionsConfig: Options<TRow>;

##### TableWrapperColumnConfig\<T>

    // TODO define these
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

##### Options\<TRow>
For documentation of the `Options\<TRow>` object please refer to these [docs](http://allenfang.github.io/react-bootstrap-table/docs.html#options) 
Keep in mind that you can define as many or as few of these properties in your table as they all area already initialized
with default values.

##### TableOverridesModel

    // styling configurations for applying classes and styles to table elements
    tableStylingConfig?: Partial<TableStylingConfig>;
    
    // cell editing implementation
    tableCellEditConfig?: Partial<CellEdit<T>>;
    
    // implementation for navigating the table with keyboard inputs
    tableKeyboardNavigationConfig?: Partial<KeyboardNavigation>;
    
    // implementation for insert and delete actions into the table
    tableManipulationConfig?: Partial<TableManipulationConfig>;
    
    // implementation for row expansion functionality
    tableRowExpansionConfig?: Partial<RowExpansionConfig>;
    
    // implementation for row selection functionality
    tableRowSelectionConfig?: Partial<SelectRow<T>>;


##### TableStylingConfig

    // table container styling
    containerStyleObject?: CSSProperties;
    
    // table element styling
    tableStyleObject?: CSSProperties;
    
    // table header styling
    headerStyleObject?: CSSProperties;
    
    // table body styling
    bodyStyleObject?: CSSProperties;
    
    // table outer container class
    containerClass?: string;
    
    // table container class
    tableContainerClass?: string;
    
    // table header container class
    headerContainerClass?: string;
    
    // table body container class
    bodyContainerClass?: string;
    
    // table header class
    tableHeaderClass?: string;
    
    // table body class
    tableBodyClass?: string;

##### tableCellEditConfig?: Partial\<CellEdit\<T>>
Please see the documentation [here](http://allenfang.github.io/react-bootstrap-table/docs.html#cellEdit)

##### KeyboardNavigation
Please see the documentation [here](http://allenfang.github.io/react-bootstrap-table/docs.html#keyBoardNav)

##### TableManipulationConfig
    
    // insert row functionality
    insertionSettings: {
        // enable insert functionality
        canInsert?: boolean;
        
        // method called after row insertion, row data is input parameter
        afterInsert?: (row: any) => void;
    };
    deletionSettings: {
        // enable delete functionality
        canDelete?: boolean;
           
        // method called after row deletion, rowKeys are input parameters
        afterDelete?: (rowKeys: any) => void;
    };

##### RowExpansionConfig
    
    // JSX to show when row is expanded
    expandableComponent ? : (row: any) => string | ReactElement;

    // method that evaluates whether a row is expandable or not
    expandableRow ? : (row: any) => boolean;
    
    // row expansion options
    expandColumnOptions: {
        // css width property
        columnWidth: string,
        
        // enables column expansion and adds expansion indicator
        expandColumnVisible: boolean,
        
        //If both an indicator column and a selection column are displaying, this specifies whether the indicator column
        // should be shown first. Default is true, false will move the expand indicator column after selection column.
        expandColumnBeforeSelectColumn: boolean,
        
        // component to show when column is expanded
        expandColumnComponent: (props: ExpandColumnComponentProps): string | ReactElement,
        
        // defiens component for header column expansion
        expandedColumnHeaderComponent: (props: ExpandedColumnHeaderProps): string | ReactElement
    }
    
additional docs for column expansion [here](http://allenfang.github.io/react-bootstrap-table/docs.html#expandColumnOptions)

##### SelectRow\<T>
Please see the docs [here](http://allenfang.github.io/react-bootstrap-table/docs.html#selectRow)
