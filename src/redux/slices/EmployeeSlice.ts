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
        edit: (state, action: PayloadAction<{employee: IEmployee, index:number}>) => {
            state.employees.splice(action.payload.index,1,action.payload.employee);
        },
        remove: (state, action:PayloadAction<number | number[]>) => {
            if (typeof action.payload === "number") {
                state.employees.splice(action.payload,1);
            } else {
                action.payload.map((item, index) => state.employees.splice(item - index,1));
            }
        },
        addSelected: (state, action:PayloadAction<string>) => {
            state.selectedEmployees.push(action.payload);
        },
        removeSelected: (state, action:PayloadAction<number>) => {
            state.selectedEmployees.splice(action.payload,1);
        },
        setAllSelected: (state, action:PayloadAction<string[]>) => {
            state.selectedEmployees = action.payload;
            state.employees = state.employees.map((item) => ({...item, select: true}));
        },
        clearAllSelected: (state) => {
            state.selectedEmployees = [];
            state.employees = state.employees.map((item) => ({...item, select: false}));
        },
    },
});

export const { add, edit, remove, initialize, addSelected, removeSelected, setAllSelected, clearAllSelected } = EmployeeSlice.actions;

export default EmployeeSlice.reducer;