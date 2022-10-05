import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICompany, IStateCompany} from "../../interfaces/company.interface";

const initialState = {
    companies: null,
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
            state.companies && state.companies.push(action.payload);
        },
        edit: (state, action: PayloadAction<{company: ICompany, index:number}>) => {
            state.companies && state.companies.splice(action.payload.index,1,action.payload.company);
        },
        remove: (state, action:PayloadAction<number>) => {
            state.companies && state.companies.splice(action.payload,1);
        },
        addSelected: (state, action:PayloadAction<string>) => {
            state.selectCompanies.push(action.payload);
        },
        removeSelected: (state, action:PayloadAction<number>) => {
            state.selectCompanies.splice(action.payload,1);
        },
    },
});

export const { add, edit, remove, initialize, addSelected, removeSelected } = CompanySlice.actions;

export default CompanySlice.reducer;