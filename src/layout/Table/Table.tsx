import React, {ChangeEvent, useMemo, useState} from 'react';
import {TableProps} from "./Table.props";
import "./Table.css";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {compareNumeric} from "../../utils/utils";

export const Table = ({children, isEmployee, setAll, clearAll, data, selectedData, remove, removeAll, setShowModal}: TableProps): JSX.Element | null => {
    const dispatch: AppDispatch = useDispatch();

    const [checked, setChecked] = useState(false);
    const {selectCompanies} = useSelector((state:RootState) => state.company);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;

        dispatch(value ? setAll() : clearAll());
        setChecked(value);
    };

    const handleRemove = () => {
        if (!data) return;

        if (data.length === selectedData.length) {
            console.log('a');
            dispatch(removeAll(selectedData));
        } else {
            let indexes = selectedData.map((item) => data.findIndex((index) => index.id == item));
            indexes = indexes.sort(compareNumeric);

            dispatch(remove(indexes, selectedData));
        }
    };

    const changeData = useMemo(() => !!data?.length && data?.length === selectedData.length, [selectedData.length]);

    if (isEmployee && !selectCompanies.length) return null;

    return (
        <aside className="table-wrapper">
            <div className="table-wrapper-header">
                <span>Выделить все</span>
                <input type="checkbox" disabled={!data?.length} checked={checked && changeData} onChange={handleChange} name="" id=""/>
                <button onClick={() => setShowModal(true)}>+</button>
                <button disabled={!selectedData.length} onClick={handleRemove}>-</button>
            </div>
            {children}
        </aside>
    );
};
