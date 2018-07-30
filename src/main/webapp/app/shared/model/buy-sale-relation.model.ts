import { IBuyContact } from 'app/shared/model//buy-contact.model';
import { ISaleContact } from 'app/shared/model//sale-contact.model';

export interface IBuySaleRelation {
    id?: number;
    amount?: number;
    buyContact?: IBuyContact;
    saleContact?: ISaleContact;
}

export class BuySaleRelation implements IBuySaleRelation {
    constructor(public id?: number, public amount?: number, public buyContact?: IBuyContact, public saleContact?: ISaleContact) {}
}
