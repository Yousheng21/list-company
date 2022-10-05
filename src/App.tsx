import React from 'react';
import {withLayout} from "./layout/Layout";
import {Table} from "./layout/Table/Table";
import "./App.css";
import {TableCompany} from "./components/TableCompany/TableCompany";
import {TableEmployee} from "./components/TableEmployee/TableEmployee";

const App = (): JSX.Element => {
    return (
        <main className="main">
            <Table>
                <TableCompany className="company" />
            </Table>
            <Table isEmployee>
                <TableEmployee className="employee" />
            </Table>
        </main>
    );
};

export default withLayout(App);
