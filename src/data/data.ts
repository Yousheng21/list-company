import {ICompany} from "../interfaces/company.interface";
import {IEmployee} from "../interfaces/employee.interface";

export const templateCompany = {
    name: "",
    address: ""
} as ICompany;

export const templateEmployee = {
    firstName: "",
    lastName: "",
    position: "",
    companyId: ""
} as IEmployee;