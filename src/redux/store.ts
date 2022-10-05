import {configureStore} from "@reduxjs/toolkit";
import {CompanySlice} from "./slices/CompanySlice";
import {EmployeeSlice} from "./slices/EmployeeSlice";

const store = configureStore({
    reducer: {
        company: CompanySlice.reducer,
        employee: EmployeeSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;