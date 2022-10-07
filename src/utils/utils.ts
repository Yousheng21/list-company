import {ICompany} from "../interfaces/company.interface";
import {IEmployee} from "../interfaces/employee.interface";

export function compareNumeric(a: number, b: number) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
    return 0;
}

export function isCompany(object: ICompany | IEmployee): object is ICompany {
    return "address" in object;
}

export function companyEmployee(employees: IEmployee[], item:string) {
    return employees.filter(employee => employee.id === item)[0].companyId;
}