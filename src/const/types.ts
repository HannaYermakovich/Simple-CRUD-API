export interface User {
    id?: string;
    name: string;
    age: number;
    hobbies: string[];
}

export interface Methods {
    [GET: string]: () => void;
    POST: () => void;
    PUT: () => void;
    DELETE: () => void;
}

export interface ValidateId {
    isValidId: boolean;
    userId: string;
}

export interface ValidateURL {
    isValidAPI: boolean;
    api: string;
    userId: string;
}

export interface BaseData {
    id: string;
}

export interface Database<T extends BaseData> {
    set(value: T): void;
    get(id: string): T | undefined;
}