import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IEmployee, IStateEmployee} from "../../interfaces/employee.interface";

const initialState = {
    employees: [],
    selectedEmployees: []
};

export const EmployeeSlice = createSlice({
    name: 'employee',
    initialState: initialState as IStateEmployee,
    reducers: {
        initialize: (state, action:PayloadAction<IEmployee[]>) => {
            state.employees = action.payload;
        },
        add: (state, action:PayloadAction<IEmployee>) => {
            state.employees.push(action.payload);
        },
        edit: (state, action: PayloadAction<{company: IEmployee, index:number}>) => {
            state.employees.splice(action.payload.index,1,action.payload.company);
        },
        remove: (state, action:PayloadAction<number>) => {
            state.employees.splice(action.payload,1);
        },
        addSelected: (state, action:PayloadAction<string>) => {
            state.selectedEmployees.push(action.payload);
        },
        removeSelected: (state, action:PayloadAction<number>) => {
            state.selectedEmployees.splice(action.payload,1);
        },
    },
});

export const { add, edit, remove, initialize, addSelected, removeSelected } = EmployeeSlice.actions;

export default EmployeeSlice.reducer;