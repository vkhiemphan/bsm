import { Moment } from 'moment';
import { IProduct } from 'app/shared/model//product.model';
import { IProvider } from 'app/shared/model//provider.model';

export interface IBuyContractForSale {
    id?: number;
    buyContractCode?: string;
    number?: number;
    amount?: number;
    price?: string;
    contractDate?: Moment;
    etaDate?: Moment;
    note?: string;
    status?: string;
    product?: IProduct;
    provider?: IProvider;
    remainAmount?: number;
    amountSaleInContract?: number;
}

export class BuyContractForSale implements IBuyContractForSale {
    constructor(
        public id?: number,
        public buyContractCode?: string,
        public number?: number,
        public amount?: number,
        public price?: string,
        public contractDate?: Moment,
        public etaDate?: Moment,
        public note?: string,
        public status?: string,
        public product?: IProduct,
        public provider?: IProvider,
        public remainAmount?: number,
        public amountSaleInContract?: number
    ) {}
}
