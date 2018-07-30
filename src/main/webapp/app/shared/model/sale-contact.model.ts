import { Moment } from 'moment';
import { IProduct } from 'app/shared/model//product.model';
import { ICustomer } from 'app/shared/model//customer.model';

export interface ISaleContact {
    id?: number;
    saleContactCode?: string;
    number?: number;
    amount?: number;
    price?: string;
    contactDate?: Moment;
    deliveryDate?: Moment;
    note?: string;
    status?: string;
    product?: IProduct;
    customer?: ICustomer;
}

export class SaleContact implements ISaleContact {
    constructor(
        public id?: number,
        public saleContactCode?: string,
        public number?: number,
        public amount?: number,
        public price?: string,
        public contactDate?: Moment,
        public deliveryDate?: Moment,
        public note?: string,
        public status?: string,
        public product?: IProduct,
        public customer?: ICustomer
    ) {}
}
