export interface ICompany {
    id:string;
    name: string;
    address: string;
    countEmployees: number;
    select: boolean;
}

export interface IStateCompany {
    companies: null | ICompany[];
    selectCompanies: string[];
}