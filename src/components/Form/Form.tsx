import React, {useId} from 'react';
import {FormProps} from "./Form.props";
import ReactDOM from "react-dom";
import "./Form.css";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";

export const Form = ({children, data, show, setShow, save}: FormProps): JSX.Element | null => {
    const dispatch: AppDispatch = useDispatch();

    const id = useId();

    const handleSave = () => {
        dispatch(save({...data, id, select: false}));
        setShow(false);
    };

    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="modal-wrapper">
            <div className="modal">
                <h1>Форма</h1>
                <form className="modal-form" action="">
                    {children}
                    <div className="modal-form__buttons">
                        <button onClick={() => setShow(false)}>Отменить</button>
                        <button type="button" onClick={handleSave}>Save</button>
                    </div>
                </form>

            </div>
        </div>, document.body
    );
};
