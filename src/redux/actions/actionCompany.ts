import {
    addSelected,
    clearAllSelected,
    edit,
    initialize,
    remove,
    removeSelected,
    setAllSelected,
    add
} from "../slices/CompanySlice";
import data from "../../api/dataCompanies.json";
import {AppDispatch, RootState} from "../store";
import {ICompany} from "../../interfaces/company.interface";
import {IEmployee} from "../../interfaces/employee.interface";
import {isCompany} from "../../utils/utils";

export const getCompanies = () => (dispatch: AppDispatch) => {
    const resp = data;
    dispatch(initialize(resp));
};

export const editCompany = (company: ICompany, index: number) => (dispatch: AppDispatch, getState: () => RootState) => {
    const {selectCompanies} = getState().company;
    const include = selectCompanies.includes(company.id);

    if (company.select && !include) {
        dispatch(addSelected(company.id));
    } else if(include && !company.select) {
        dispatch(removeSelected(selectCompanies.indexOf(company.id)));
    }

    dispatch(edit({company, index}));
};

export const addCompany = (company: ICompany | IEmployee) => (dispatch: AppDispatch) => {
    if (isCompany(company)){
        dispatch(add({...company, countEmployees: 0}));
    }
};

export const removeCompany = (data: number | number[]) => (dispatch: AppDispatch) => {
    dispatch(remove(data));
};

export const removeAllCompany = () => (dispatch: AppDispatch) => {
    dispatch(initialize([]));
    dispatch(clearAllSelected());
};

export const setAllSelectCompany = () => (dispatch: AppDispatch, getState: () => RootState) => {
    const {companies} = getState().company;
    const array =  companies.map((company) => company.id);
    dispatch(setAllSelected(array));
};

export const clearAllSelectCompany = () => (dispatch: AppDispatch) => {
    dispatch(clearAllSelected());
};

export const changeCountEmployees = (id: string, type: "plus"| "minus") => (dispatch: AppDispatch, getState: () => RootState) => {
    return getState().company.companies.map((item, index) => {
        if (item.id === id) {
            dispatch(edit({company: {countEmployees: type === "plus" ? item.countEmployees + 1 : item.countEmployees - 1}, index}));
        }
    });
};