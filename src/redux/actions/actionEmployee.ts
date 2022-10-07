import {add, addSelected, clearAllSelected, edit, initialize, remove, removeSelected, setAllSelected} from "../slices/EmployeeSlice";
import data from "../../api/dataEmployees.json";
import {AppDispatch, RootState} from "../store";
import {IEmployee} from "../../interfaces/employee.interface";
import {ICompany} from "../../interfaces/company.interface";
import {companyEmployee, isCompany} from "../../utils/utils";
import {changeCountEmployees} from "./actionCompany";

export const getEmployees = () => (dispatch: AppDispatch) => {
    const response = data;
    dispatch(initialize(response));
};

export const editEmployee = (employee: IEmployee, id: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const {selectedEmployees} = getState().employee;
    const index = getState().employee.employees.findIndex(item => Number(item.id) === Number(id));
    const include = selectedEmployees.includes(employee.id);

    if (employee.select && !include) {
        dispatch(addSelected(employee.id));
    } else if(include && !employee.select){
        dispatch(removeSelected(selectedEmployees.indexOf(employee.id)));
    }

    dispatch(edit({employee, index}));
};

export const addEmployee = (employee: IEmployee | ICompany) => (dispatch: AppDispatch) => {
    if (!isCompany(employee)) {
        dispatch(add(employee));
        dispatch(changeCountEmployees(employee.companyId, "plus"));
    }
};

export const removeEmployee = (data: number | number[], selectedData: string[]) => (dispatch: AppDispatch, getState: () => RootState) => {
    const {employees} = getState().employee;
    dispatch(remove(data));
    selectedData.map(item => dispatch(changeCountEmployees(companyEmployee(employees, item), "minus")));
};

export const removeAllEmployee = (selectedData?: string[]) => (dispatch: AppDispatch, getState: () => RootState) => {
    if (selectedData){
        const {employees} = getState().employee;
        selectedData.map(item => dispatch(changeCountEmployees(companyEmployee(employees, item), "minus")));
    }
    dispatch(initialize([]));
    dispatch(clearAllSelected());
};

export const setAllSelectEmployee = () => (dispatch: AppDispatch, getState: () => RootState) => {
    const {employees} = getState().employee;
    const {selectCompanies} = getState().company;
    const arraySelected: string[] = [];

    const newEmployees = employees.map((employee) => {
        if (selectCompanies.includes(employee.companyId)) {
            arraySelected.push(employee.id);
            return {...employee, select:true};
        }
        return employee;
    });

    dispatch(setAllSelected({payload: arraySelected, newEmployees}));
};

export const clearAllSelectEmployee = () => (dispatch: AppDispatch) => {
    dispatch(clearAllSelected());
};