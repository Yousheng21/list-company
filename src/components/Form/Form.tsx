import React, {useId} from 'react';
import {FormProps} from "./Form.props";
import ReactDOM from "react-dom";
import "./Form.css";

export const Form = ({children, data, show, setShow, save}: FormProps): JSX.Element | null => {
    const id = useId();

    const handleSave = () => {
        save({...data, id: data.id ?? id, select: data.select ?? false});
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
                        <button type="button" onClick={handleSave}>Сохранить</button>
                    </div>
                </form>

            </div>
        </div>, document.body
    );
};
