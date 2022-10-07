import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import cn from "classnames";
import {TableCompanyProps} from "./TableCompany.props";
import './TableCompany.css';
import {addCompany, clearAllSelectCompany, editCompany, getCompanies, removeAllCompany, removeCompany, setAllSelectCompany} from "../../redux/actions/actionCompany";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {ICompany} from "../../interfaces/company.interface";
import {Table} from "../../layout/Table/Table";
import {Form} from "../Form/Form";
import {IEmployee} from "../../interfaces/employee.interface";
import {isCompany} from "../../utils/utils";
import {templateCompany} from "../../data/data";
import {Input} from "../Input/Input";
import {getStateCompany} from "../../redux/selectors/selectorCompany";
import apiCompanies from "../../api/dataCompanies.json";

export const TableCompany = ({className}: TableCompanyProps): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [indexEdit, setIndexEdit] = useState(-1);
    const [data, setData] = useState(templateCompany);

    const {companies, selectCompanies} = useSelector(getStateCompany);

    useEffect(() => {
        dispatch(getCompanies());
    }, []);

    const handleData = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleCheckBox = (company: ICompany, e: ChangeEvent<HTMLInputElement>, index: number) => {
        const select = e.target.checked;
        dispatch(editCompany({...company, select}, index));
    };

    const handleSubmit = (company:ICompany | IEmployee) => {
        if (isCompany(company)) {
            if (indexEdit === -1) {
                dispatch(addCompany(company));
            } else {
                dispatch(editCompany(company, indexEdit));
            }
        }
    };

    const handleEdit = (company:ICompany, index: number) => {
        setData(company);
        setShowModal(true);
        setIndexEdit(index);
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const containerHeight = e.currentTarget.clientHeight;
        const scrollHeight = e.currentTarget.scrollHeight;
        const scrollTop = e.currentTarget.scrollTop;

        if (scrollHeight - containerHeight < scrollTop + 30 && companies.length < apiCompanies.length) {
            dispatch(getCompanies());
            e.currentTarget.scroll(0, scrollTop/2);
        }
    };

    const changeData = useMemo(() => !!companies?.length && companies?.length === selectCompanies.length, [selectCompanies.length]);

    if (!companies) return <span>Loading...</span>;
    return (
        <Table
            setAll={setAllSelectCompany}
            clearAll={clearAllSelectCompany}
            remove={removeCompany}
            removeAll={removeAllCompany}
            data={companies}
            setShowModal={setShowModal}
            changeData={changeData}
            selectedData={selectCompanies}
        >
            <div className={cn("table-wrapper-body", className)} onScroll={handleScroll}>
                {companies.map((company, index) => (
                    <div key={company.id} className={cn("row", {
                        row__selected: company.select
                    })}>
                        <div>{company.name}</div>
                        <div>{company.address}</div>
                        <div>{company.countEmployees}</div>
                        <div>
                            <input type="checkbox" checked={company.select} onChange={(e) => handleCheckBox(company, e, index)} name="" id=""/>
                            <button onClick={() => handleEdit(company, index)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
            <Form data={data} show={showModal} save={handleSubmit} setShow={setShowModal} >
                <div className="form-company">
                    <Input title="Название" onChange={handleData} value={data.name} name="name" />
                    <Input title="Адрес" onChange={handleData} value={data.address} name="address" />
                </div>
            </Form>
        </Table>

    );
};
