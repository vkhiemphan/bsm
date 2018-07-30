import { Moment } from 'moment';
import { IProduct } from 'app/shared/model//product.model';
import { IProvider } from 'app/shared/model//provider.model';
import {IBuySaleRelation} from "app/shared/model/buy-sale-relation.model";

export interface IBuyContactWithSaleData {
    id?: number;
    buyContactCode?: string;
    number?: number;
    amount?: number;
    price?: string;
    contactDate?: Moment;
    etaDate?: Moment;
    note?: string;
    status?: string;
    product?: IProduct;
    provider?: IProvider;
    remainAmount?: number;
    buySaleRelations?: IBuySaleRelation[]
}

export class BuyContactWithSaleData implements IBuyContactWithSaleData {
    constructor(
        public id?: number,
        public buyContactCode?: string,
        public number?: number,
        public amount?: number,
        public price?: string,
        public contactDate?: Moment,
        public etaDate?: Moment,
        public note?: string,
        public status?: string,
        public product?: IProduct,
        public provider?: IProvider,
        public remainAmount?: number,
        public buySaleRelations?: IBuySaleRelation[]
    ) {}
}
