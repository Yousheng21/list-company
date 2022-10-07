import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";

export const filteredEmployees = createSelector(
    (state: RootState) => state.employee.employees,
    (state: RootState) => state.company.selectCompanies,
    (employees, companies) => {
        return employees.filter(item => companies.includes(item.companyId));
    }
);

export const getStateEmployee = (state: RootState) => state.employee;