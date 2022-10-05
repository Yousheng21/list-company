import {addSelected, edit, initialize, remove, removeSelected} from "../slices/EmployeeSlice";
import data from "../../api/dataEmployees.json";
import {AppDispatch, RootState} from "../store";
import {IEmployee} from "../../interfaces/employee.interface";

export const getEmployees = () => (dispatch: AppDispatch) => {
    const response = data;
    dispatch(initialize(response));
};

export const editEmployee = (company: IEmployee, id: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const index = getState().employee.employees.findIndex(item => Number(item.id) === Number(id));
    dispatch(edit({company, index}));
};

export const removeEmployee = (index: number) => (dispatch: AppDispatch) => {
    dispatch(remove(index));
};

export const addSelectEmployee = (id: string) => (dispatch: AppDispatch) => {
    dispatch(addSelected(id));
};

export const removeSelectEmployee = (index: number) => (dispatch: AppDispatch) => {
    dispatch(removeSelected(index));
};