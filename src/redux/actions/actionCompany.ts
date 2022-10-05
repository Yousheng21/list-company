import { addSelected, edit, initialize, remove, removeSelected} from "../slices/CompanySlice";
import data from "../../api/dataCompanies.json";
import {AppDispatch} from "../store";
import {ICompany} from "../../interfaces/company.interface";

export const getCompanies = () => (dispatch: AppDispatch) => {
    const resp = data;
    dispatch(initialize(resp));
};

export const editCompany = (company: ICompany, index: number) => (dispatch: AppDispatch) => {
    dispatch(edit({company, index}));
};

export const removeCompany = (index: number) => (dispatch: AppDispatch) => {
    dispatch(remove(index));
};

export const addSelectCompany = (id: string) => (dispatch: AppDispatch) => {
    dispatch(addSelected(id));
};

export const removeSelectCompany = (index: number) => (dispatch: AppDispatch) => {
    dispatch(removeSelected(index));
};