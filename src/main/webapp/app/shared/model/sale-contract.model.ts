import { Moment } from 'moment';
import { IProduct } from 'app/shared/model//product.model';
import { ICustomer } from 'app/shared/model//customer.model';

export interface ISaleContract {
    id?: number;
    saleContractCode?: string;
    number?: number;
    amount?: number;
    price?: string;
    contractDate?: Moment;
    deliveryDate?: Moment;
    note?: string;
    status?: string;
    product?: IProduct;
    customer?: ICustomer;
}

export class SaleContract implements ISaleContract {
    constructor(
        public id?: number,
        public saleContractCode?: string,
        public number?: number,
        public amount?: number,
        public price?: string,
        public contractDate?: Moment,
        public deliveryDate?: Moment,
        public note?: string,
        public status?: string,
        public product?: IProduct,
        public customer?: ICustomer
    ) {}
}
