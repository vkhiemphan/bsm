export interface IProduct {
    id?: number;
    name?: string;
    note?: string;
    productCode?: string;
}

export class Product implements IProduct {
    constructor(public id?: number, public name?: string, public note?: string, public productCode?: string) {}
}
