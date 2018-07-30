export interface ICustomer {
    id?: number;
    customerCode?: string;
    name?: string;
    address?: string;
    note?: string;
    email?: string;
}

export class Customer implements ICustomer {
    constructor(
        public id?: number,
        public customerCode?: string,
        public name?: string,
        public address?: string,
        public note?: string,
        public email?: string
    ) {}
}
