import React from 'react';
import {withLayout} from "./layout/Layout";
import {Table} from "./layout/Table/Table";
import "./App.css";

const App = (): JSX.Element => {
    return (
        <main className="main">
            <Table>
                <div>
                    Компании
                </div>
            </Table>
            <Table>
                <div>
                    Сотрудники
                </div>
            </Table>
        </main>
    );
};

export default withLayout(App);
