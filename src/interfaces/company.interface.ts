export interface ICompany {
    id:string;
    name: string;
    address: string;
    countEmployees: number;
    select: boolean;
}

export interface IStateCompany {
    companies: ICompany[];
    selectCompanies: string[];
}

export const templateCompany = {
    name: "",
    address: ""
} as ICompany;