import React from "react";
import {TableWrapperComponent} from "../table-wrapper/table-wrapper";
import {generateBasicTableData} from "../../tests/mocks/base-table-data.mock";
import {AgentToolsTableBuilder} from "../../services/table-building-services/agent-tools-table-builder.service";
import {BaseError} from "../../lib/models/error-models/base-error.model";


export interface TestComponentProps {
}

export class TestComponent extends React.Component<TestComponentProps, {}> {

    public render() {
        const data = generateBasicTableData(10);
        const builder = new AgentToolsTableBuilder();
        const columns = builder.generateColumnsFromKeyArray(data.columns);

        if (columns instanceof BaseError) {
            return columns.getErrorJsx();
        } else {
            const baseTable = builder.generateBaseTable(data.data, columns);
            if (baseTable instanceof BaseError) {
                return baseTable.getErrorJsx();
            } else {
                return (<div className="react-table-wrapper-container">
                    <TableWrapperComponent data={data.data}
                                           tableConfig={baseTable.tableConfig}
                                           columns={baseTable.columns}
                                           tableBuilderService={builder}/>
                </div>);
            }
        }


    }
}
