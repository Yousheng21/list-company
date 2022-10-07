export interface ICompany {
    id:string;
    name: string;
    address: string;
    countEmployees: number;
    select: boolean;
}

export interface IStateCompany {
    page: number;
    perPage: number;
    companies: ICompany[];
    selectCompanies: string[];
}