import React from "react";
import {TableWrapperComponent} from "../table-wrapper/table-wrapper";
import {AgentToolsTableBuilder} from "../../services/table-building-services/agent-tools-table-builder.service";
import {AtBaseTable} from "../../lib/models/at-common-tables/at-base-table.model";


export interface TestComponentProps {
}

export class TestComponent extends React.Component<TestComponentProps, {}> {

    public render() {
        // get a reference to the ATTableBuilder
        const builder = new AgentToolsTableBuilder();

        // Inject the table object and watch the magic happen
        return (<div className="react-table-wrapper-container">
            <TableWrapperComponent tableModel={AtBaseTable}
                                   tableBuilder={builder}/>
        </div>);
    }
}
