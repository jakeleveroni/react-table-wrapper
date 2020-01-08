import React from 'react';
import './App.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {TestComponent} from "./components/test-component/test.component";

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Table Wrapper Test Page
                </p>
            </header>
            <div>
                <TestComponent/>
            </div>
        </div>
    );
};

export default App;
