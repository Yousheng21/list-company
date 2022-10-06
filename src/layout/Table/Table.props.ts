import {ReactNode} from "react";
import {AppDispatch, RootState} from "../../redux/store";
import {IEmployee} from "../../interfaces/employee.interface";
import {ICompany} from "../../interfaces/company.interface";

export interface TableProps {
    children: ReactNode;
    isEmployee?: boolean;
    setAll: () => (dispatch: AppDispatch, getState: () => RootState) => void;
    clearAll:() => (dispatch: AppDispatch) => void;
    remove: (arg: number[] | number, selectedData:string[]) => (dispatch: AppDispatch, getState: () => RootState) => void;
    removeAll:(arg?: string[]) => (dispatch: AppDispatch, getState: () => RootState) => void;
    data: IEmployee[] | ICompany[] | null;
    selectedData: string[];
    setShowModal: (arg: boolean) => void;
}