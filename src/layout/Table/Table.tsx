import React from 'react';
import {TableProps} from "./Table.props";
import "./Table.css";

export const Table = ({children}: TableProps): JSX.Element => {
    return (
        <aside className="table-wrapper">
            <div className="table-wrapper-header">
                Шапка
            </div>
            {children}
        </aside>
    );
};
