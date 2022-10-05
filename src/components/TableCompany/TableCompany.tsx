import React, {ChangeEvent, useEffect} from 'react';
import cn from "classnames";
import {TableCompanyProps} from "./TableCompany.props";
import './TableCompany.css';
import {addSelectCompany, editCompany, getCompanies, removeSelectCompany} from "../../redux/actions/actionCompany";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {ICompany} from "../../interfaces/company.interface";

export const TableCompany = ({className, ...props}: TableCompanyProps): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();

    const companies = useSelector((state:RootState) => state.company.companies);
    const selectedCompanies = useSelector((state:RootState) => state.company.selectCompanies);

    useEffect(() => {
        dispatch(getCompanies());
    }, []);


    const handleCheckBox = (company: ICompany, e: ChangeEvent<HTMLInputElement>, index: number) => {
        const select = e.target.checked;
        const currIndex = selectedCompanies.findIndex(item => item === company.id);

        dispatch(editCompany({...company, select}, index));
        dispatch(select ? addSelectCompany(company.id) : removeSelectCompany(currIndex));
    };

    if (!companies) return <span>Loading...</span>;

    return (
        <div className={cn("table-wrapper-body", className)} {...props}>
            {companies.map((company, index) => (
                <div key={company.id} className={cn("row", {
                    row__selected: selectedCompanies.includes(company.id)
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
    );
};
