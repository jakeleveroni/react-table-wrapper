import React from 'react';
import './App.css';
import {TestComponent} from "./components/test-component/test.component";

const App: React.FC = () => {
    return (
        <div className="App">
            <p>Table Demo</p>
            <div className="table-main-container">
                <TestComponent/>
            </div>
        </div>
    );
};

export default App;
