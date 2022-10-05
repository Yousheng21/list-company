import React, {ChangeEvent, useEffect} from 'react';
import cn from "classnames";
import {TableEmployeeProps} from "./TableEmployee.props";
import './TableEmployee.css';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {IEmployee} from "../../interfaces/employee.interface";
import {
    addSelectEmployee,
    editEmployee,
    getEmployees,
    removeSelectEmployee
} from "../../redux/actions/actionEmployee";

export const TableEmployee = ({className, ...props}: TableEmployeeProps): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();

    const {employees, selectedEmployees } = useSelector((state:RootState) => state.employee);
    const selectedCompanies = useSelector((state:RootState) => state.company.selectCompanies);

    useEffect(() => {
        if (!employees.length) dispatch(getEmployees());
    }, []);

    // useEffect(() => {
    //     dispatch(filterEmployees(selectedCompanies));
    // }, [selectedCompanies]);


    const handleCheckBox = (employee: IEmployee, e: ChangeEvent<HTMLInputElement>) => {
        const select = e.target.checked;
        const currIndex = selectedCompanies.findIndex(item => item === employee.id);

        dispatch(editEmployee({...employee, select}, employee.id));
        dispatch(select ? addSelectEmployee(employee.id) : removeSelectEmployee(currIndex));
    };
    const filtered = () => employees.filter((employee) => selectedCompanies.includes(employee.companyId));
    console.log(employees, filtered);
    return (
        <div className={cn("table-wrapper-body", className)} {...props}>
            {filtered().map((employee, index) => (
                <div key={employee.id} className={cn("row", {
                    row__selected: employee.select
                })}>
                    <div>{employee.firstName}</div>
                    <div>{employee.lastName}</div>
                    <div>{employee.position}</div>
                    <div>
                        <input type="checkbox" checked={employee.select} onChange={(e) => handleCheckBox(employee, e)} name="" id=""/>
                    </div>
                </div>
            ))}
        </div>
    );
};
