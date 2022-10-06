export interface IEmployee {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    select: boolean;
    companyId: string;
}

export interface IStateEmployee  {
    employees: IEmployee[];
    selectedEmployees: string[];
}

export const templateEmployee = {
    firstName: "",
    lastName: "",
    position: "",
    companyId: ""
} as IEmployee;