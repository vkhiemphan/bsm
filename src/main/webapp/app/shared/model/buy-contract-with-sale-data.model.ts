import { Moment } from 'moment';
import { IProduct } from 'app/shared/model//product.model';
import { IProvider } from 'app/shared/model//provider.model';
import {IBuySaleRelation} from "app/shared/model/buy-sale-relation.model";

export interface IBuyContractWithSaleData {
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
    buySaleRelations?: IBuySaleRelation[]
}

export class BuyContractWithSaleData implements IBuyContractWithSaleData {
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
        public buySaleRelations?: IBuySaleRelation[]
    ) {}
}
