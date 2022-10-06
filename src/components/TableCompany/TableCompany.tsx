import React, {ChangeEvent, useEffect, useState} from 'react';
import cn from "classnames";
import {TableCompanyProps} from "./TableCompany.props";
import './TableCompany.css';
import {
    addCompany,
    clearAllSelectCompany,
    editCompany,
    getCompanies, removeAllCompany,
    removeCompany,
    setAllSelectCompany
} from "../../redux/actions/actionCompany";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {ICompany, templateCompany} from "../../interfaces/company.interface";
import {Table} from "../../layout/Table/Table";
import {Form} from "../Form/Form";

export const TableCompany = ({className, ...props}: TableCompanyProps): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(templateCompany);
    const {companies, selectCompanies} = useSelector((state:RootState) => state.company);

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

    if (!companies) return <span>Loading...</span>;

    return (
        <Table
            setAll={setAllSelectCompany}
            clearAll={clearAllSelectCompany}
            remove={removeCompany}
            removeAll={removeAllCompany}
            data={companies}
            setShowModal={setShowModal}
            selectedData={selectCompanies}>
            <div className={cn("table-wrapper-body", className)} {...props}>
                {companies.map((company, index) => (
                    <div key={company.id} className={cn("row", {
                        row__selected: company.select
                    })}>
                        <div>{company.name}</div>
                        <div>{company.address}</div>
                        <div>{company.countEmployees}</div>
                        <div>
                            <input type="checkbox" checked={company.select} onChange={(e) => handleCheckBox(company, e, index)} name="" id=""/>
                        </div>
                    </div>
                ))}
            </div>
            <Form data={data} show={showModal} save={addCompany} setShow={setShowModal} >
                <div className="form-company">
                    <label htmlFor="name">
                        Название
                        <input type="text" onChange={handleData} value={data.name} name="name" id="name"/>
                    </label>
                    <label htmlFor="address">
                        Адрес
                        <input type="text" onChange={handleData} value={data.address} name="address" id="address"/>
                    </label>
                </div>
            </Form>
        </Table>

    );
};
