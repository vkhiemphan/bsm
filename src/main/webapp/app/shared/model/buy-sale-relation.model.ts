import { IBuyContract } from 'app/shared/model/buy-contract.model';
import { ISaleContract } from 'app/shared/model/sale-contract.model';

export interface IBuySaleRelation {
    id?: number;
    amount?: number;
    buyContract?: IBuyContract;
    saleContract?: ISaleContract;
}

export class BuySaleRelation implements IBuySaleRelation {
    constructor(public id?: number, public amount?: number, public buyContract?: IBuyContract, public saleContract?: ISaleContract) {}
}
