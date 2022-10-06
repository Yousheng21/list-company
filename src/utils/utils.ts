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