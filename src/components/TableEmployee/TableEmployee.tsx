import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import cn from "classnames";
import {TableEmployeeProps} from "./TableEmployee.props";
import './TableEmployee.css';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {IEmployee} from "../../interfaces/employee.interface";
import {addEmployee, clearAllSelectEmployee, editEmployee, getEmployees, removeAllEmployee, removeEmployee, setAllSelectEmployee,} from "../../redux/actions/actionEmployee";
import {Table} from "../../layout/Table/Table";
import {Form} from "../Form/Form";
import {ICompany} from "../../interfaces/company.interface";
import {isCompany} from "../../utils/utils";
import {templateEmployee} from "../../data/data";
import {Input} from "../Input/Input";
import {filteredEmployees, getStateEmployee} from "../../redux/selectors/selectorEmployee";
import {getStateCompany} from "../../redux/selectors/selectorCompany";

export const TableEmployee = ({className, ...props}: TableEmployeeProps): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [idEdit, setIdEdit] = useState("");
    const [data, setData] = useState(templateEmployee);

    const {employees, selectedEmployees } = useSelector(getStateEmployee);
    const {companies} = useSelector(getStateCompany);
    const filtered = useSelector(filteredEmployees);

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

    const handleSubmit = (employee: IEmployee | ICompany) => {
        if (!isCompany(employee)) {
            if (!idEdit) {
                dispatch(addEmployee(employee));
            } else {
                dispatch(editEmployee(employee, idEdit));
            }
        }
    };

    const handleEdit = (employee:IEmployee, id: string) => {
        setData(employee);
        setShowModal(true);
        setIdEdit(id);
    };

    const changeData = useMemo(() => !!selectedEmployees.length && selectedEmployees.length === filtered.length, [selectedEmployees.length]);
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
            changeData={changeData}
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
                            <button onClick={() => handleEdit(employee, employee.id)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
            <Form data={data} show={showModal} save={handleSubmit} setShow={setShowModal} >
                <div className="form-employee">
                    <Input title="Имя" onChange={handleData} value={data.firstName} name="firstName"/>
                    <Input title="Фамилия" onChange={handleData} value={data.lastName} name="lastName" />
                    <Input title="Должность" onChange={handleData} value={data.position} name="position" />
                    <select name="companyId" value={data.companyId} onChange={handleData}>
                        <option hidden value="">Компания</option>
                        {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
                    </select>
                </div>
            </Form>
        </Table>
    );
};
