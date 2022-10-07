import React from 'react';
import {InputProps} from "./Input.props";
import "./Input.css";

export const Input = ({title, name,...props }: InputProps) => {
    return (
        <label htmlFor={name} className="label">
            {title}
            <input name={name} id={name} {...props} />
        </label>
    );
};
