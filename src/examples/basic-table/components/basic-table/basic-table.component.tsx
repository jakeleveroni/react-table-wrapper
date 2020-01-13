import React from "react";
import {TableWrapperComponent} from "../../../..";
import {AgentToolsTableBuilder} from "../../../..";
import {AbstractTableBuilder} from "../../../../services/table-building-services/abstract-table-builder.service";


export interface TestTableData {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    signupDate: string,
    locale: string,
    ssn: string,
    isSubscribed: string
}


export class BasicTableComponent extends React.Component<any, {}> {
    public builder: AbstractTableBuilder<TestTableData>;
    private data: TestTableData[];

    constructor(props: any) {
        super(props);

        // get a reference to the ATTableBuilder
        this.builder = new AgentToolsTableBuilder<TestTableData>();
        this.data = []
    }

    public render() {
        // Inject the table object and watch the magic happen
        return (<div className="react-table-wrapper-container">
            <TableWrapperComponent tableModel={this.data} tableBuilder={this.builder}/>
        </div>);
    }
}
