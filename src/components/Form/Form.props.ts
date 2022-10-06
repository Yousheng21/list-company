import {AppDispatch} from "../../redux/store";
import {ICompany} from "../../interfaces/company.interface";
import {IEmployee} from "../../interfaces/employee.interface";
import {ReactNode} from "react";

export interface FormProps {
    children: ReactNode;
    data: IEmployee | ICompany;
    show: boolean;
    setShow: (arg: boolean) => void;
    save: (arg: ICompany | IEmployee) => (dispatch: AppDispatch) => void;
}