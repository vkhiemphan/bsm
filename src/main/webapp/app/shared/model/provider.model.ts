export interface IProvider {
    id?: number;
    providerCode?: string;
    name?: string;
    address?: string;
    note?: string;
    email?: string;
}

export class Provider implements IProvider {
    constructor(
        public id?: number,
        public providerCode?: string,
        public name?: string,
        public address?: string,
        public note?: string,
        public email?: string
    ) {}
}
