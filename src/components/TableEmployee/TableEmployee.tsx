import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import cn from "classnames";
import {TableEmployeeProps} from "./TableEmployee.props";
import './TableEmployee.css';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {IEmployee, templateEmployee} from "../../interfaces/employee.interface";
import {addEmployee, clearAllSelectEmployee, editEmployee, getEmployees, removeAllEmployee, removeEmployee, setAllSelectEmployee,} from "../../redux/actions/actionEmployee";
import {Table} from "../../layout/Table/Table";
import {Form} from "../Form/Form";

export const TableEmployee = ({className, ...props}: TableEmployeeProps): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const [data, setData] = useState(templateEmployee);

    const {employees, selectedEmployees } = useSelector((state:RootState) => state.employee);
    const {companies, selectCompanies} = useSelector((state:RootState) => state.company);

    useEffect(() => {
        if (!employees.length) dispatch(getEmployees());
    }, []);

    const handleData = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {value, name} = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleCheckBox = (employee: IEmployee, e: ChangeEvent<HTMLInputElement>) => {
        const select = e.target.checked;

        dispatch(editEmployee({...employee, select}, employee.id));
    };

    const filtered = useMemo(() => employees.filter((employee) => selectCompanies.includes(employee.companyId)),
        [employees.length, selectCompanies.length, selectedEmployees.length]);

    return (
        <Table
            isEmployee
            setAll={setAllSelectEmployee}
            clearAll={clearAllSelectEmployee}
            remove={removeEmployee}
            removeAll={removeAllEmployee}
            data={employees}
            selectedData={selectedEmployees}
            setShowModal={setShowModal}
        >
            <div className={cn("table-wrapper-body", className)} {...props}>
                {filtered.map((employee) => (
                    <div key={employee.id} className={cn("row", {
                        row__selected: employee.select
                    })}>
                        <div>{employee.firstName}</div>
                        <div>{employee.lastName}</div>
                        <div>{employee.position}</div>
                        <div>
                            <input type="checkbox" checked={employee.select} onChange={(e) => handleCheckBox(employee, e)} name="" id=""/>
                            <button onClick={() => {
                                setData(employee);
                                setShowModal(true);
                            }}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
            <Form data={data} show={showModal} save={addEmployee} setShow={setShowModal} >
                <div className="form-employee">
                    <label htmlFor="firstName">
                        Имя
                        <input onChange={handleData} value={data.firstName} name="firstName" id="firstName"/>
                    </label>
                    <label htmlFor="lastName">
                        Фамилия
                        <input onChange={handleData} value={data.lastName} name="lastName" id="lastName"/>
                    </label>
                    <label htmlFor="position">
                        Должность
                        <input onChange={handleData} value={data.position} name="position" id="position"/>
                    </label>
                    <select name="companyId" value={data.companyId} onChange={handleData}>
                        <option hidden value="">Компания</option>
                        {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
                    </select>
                </div>
            </Form>
        </Table>
    );
};
