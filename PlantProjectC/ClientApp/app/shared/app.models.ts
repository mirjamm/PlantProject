export interface Plant {
    id?: number;
    name: string;
    latinName: string;
    family: string;
    genus: string;
    conservation: string;
}

export interface Family {
    id?: number;
    name: string;
}

export interface Genus {
    id?: number;
    name: string;
}

export interface Conservation {
    id?: number;
    name: string;
}

export interface ResponseModel {
    isError: boolean,
    errorMessage: string
}