import React from 'react';
import {withLayout} from "./layout/Layout";
import "./App.css";
import {TableCompany} from "./components/TableCompany/TableCompany";
import {TableEmployee} from "./components/TableEmployee/TableEmployee";

const App = (): JSX.Element => {
    return (
        <main className="main">
            <TableCompany className="company" />
            <TableEmployee className="employee" />
        </main>
    );
};

export default withLayout(App);
