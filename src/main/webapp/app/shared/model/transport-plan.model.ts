import { Moment } from 'moment';
import { ITransportContractPart } from 'app/shared/model//transport-contract-part.model';

export interface ITransportPlan {
    id?: number;
    transportDate?: Moment;
    transportTime?: number;
    amountPerOne?: number;
    transportContractPart?: ITransportContractPart;
}

export class TransportPlan implements ITransportPlan {
    constructor(
        public id?: number,
        public transportDate?: Moment,
        public transportTime?: number,
        public amountPerOne?: number,
        public transportContractPart?: ITransportContractPart
    ) {}
}
