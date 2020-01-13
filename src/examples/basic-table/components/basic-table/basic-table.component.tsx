import React from "react";
import {TableWrapperComponent} from "../../../../components/table-wrapper/table-wrapper";
import {AgentToolsTableBuilder} from "../../../../services/table-building-services/agent-tools-table-builder.service";
import {AtBaseTable} from "../../../table-definitions/at-base-table.model";
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

    constructor(props: any) {
        super(props);

        // get a reference to the ATTableBuilder
        this.builder = new AgentToolsTableBuilder<TestTableData>();
    }

    public render() {


        // Inject the table object and watch the magic happen
        return (<div className="react-table-wrapper-container">
            <TableWrapperComponent tableModel={AtBaseTable} tableBuilder={this.builder}/>
        </div>);
    }
}
