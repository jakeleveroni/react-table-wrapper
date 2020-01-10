import React from 'react';
import './App.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {TestComponent} from "./components/test-component/test.component";

const App: React.FC = () => {
    return (
        <div className="App">
            <p>Table Demo</p>
            <div className="table-main-container" style={{marginTop: "100px"}}>
                <TestComponent/>
            </div>
        </div>
    );
};

export default App;
