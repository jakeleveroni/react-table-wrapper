import React from "react";


export interface TestComponentProps {
}

export class TestComponent extends React.Component<TestComponentProps, {}> {

    public render() {
        return (<div className="react-table-wrapper-container">
            <p>Test Component</p>
            <p>Inject service here and try out the building of tables</p>
        </div>);
    }
}
