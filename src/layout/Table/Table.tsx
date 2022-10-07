import React, {ChangeEvent} from 'react';
import {TableProps} from "./Table.props";
import "./Table.css";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {compareNumeric} from "../../utils/utils";
import {getStateCompany} from "../../redux/selectors/selectorCompany";

export const Table = ({children, isEmployee, setAll, clearAll, data, selectedData, remove, removeAll, setShowModal, changeData}: TableProps): JSX.Element | null => {
    const dispatch: AppDispatch = useDispatch();

    const {selectCompanies} = useSelector(getStateCompany);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        dispatch(value ? setAll() : clearAll());
    };

    const handleRemove = () => {
        if (!data) return;

        if (data.length === selectedData.length) {
            dispatch(removeAll(selectedData));
        } else {
            let indexes = selectedData.map((item) => data.findIndex((index) => index.id == item));
            indexes = indexes.sort(compareNumeric);

            dispatch(remove(indexes, selectedData));
        }
    };

    if (isEmployee && !selectCompanies.length) return null;
    return (
        <aside className="table-wrapper">
            <div className="table-wrapper-header">
                <label>
                    Выделить все
                    <input type="checkbox" disabled={!data?.length} checked={changeData} onChange={handleChange} />
                </label>
                <div className="table-wrapper-header__buttons">
                    <button onClick={() => setShowModal(true)}>+</button>
                    <button disabled={!selectedData.length} onClick={handleRemove}>-</button>
                </div>
            </div>
            {children}
        </aside>
    );
};
