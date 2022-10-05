import React from 'react';
import {TableProps} from "./Table.props";
import "./Table.css";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export const Table = ({children, isEmployee}: TableProps): JSX.Element | null => {
    const selectedCompanies = useSelector((state:RootState) => state.company.selectCompanies);
    if (isEmployee && !selectedCompanies.length) return null;
    return (
        <aside className="table-wrapper">
            <div className="table-wrapper-header">
                Шапка
            </div>
            {children}
        </aside>
    );
};
