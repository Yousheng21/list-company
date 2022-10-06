import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICompany, IStateCompany} from "../../interfaces/company.interface";

const initialState = {
    companies: [],
    selectCompanies: []
};

export const CompanySlice = createSlice({
    name: 'company',
    initialState: initialState as IStateCompany,
    reducers: {
        initialize: (state, action:PayloadAction<ICompany[]>) => {
            state.companies = action.payload;
        },
        add: (state, action:PayloadAction<ICompany>) => {
            state.companies.push(action.payload);
        },
        edit: (state, action: PayloadAction<{company: Record<string, unknown> | ICompany, index:number}>) => {
            state.companies.splice(action.payload.index,1,{...state.companies[action.payload.index], ...action.payload.company});
        },
        remove: (state, action:PayloadAction<number | number[]>) => {
            if (typeof action.payload === "number") {
                state.companies.splice(action.payload,1);
            } else {
                action.payload.map((item, index) => state.companies.splice(item - index,1));
            }
        },
        addSelected: (state, action:PayloadAction<string>) => {
            state.selectCompanies.push(action.payload);
        },
        removeSelected: (state, action:PayloadAction<number>) => {
            state.selectCompanies.splice(action.payload,1);
        },
        setAllSelected: (state, action:PayloadAction<string[]>) => {
            state.selectCompanies = action.payload;
            state.companies = state.companies.map((item) => ({...item, select: true}));
        },
        clearAllSelected: (state) => {
            state.selectCompanies = [];
            state.companies = state.companies.map((item) => ({...item, select: false}));
        },
    },
});

export const { add, edit, remove, initialize, addSelected, removeSelected, setAllSelected, clearAllSelected } = CompanySlice.actions;

export default CompanySlice.reducer;