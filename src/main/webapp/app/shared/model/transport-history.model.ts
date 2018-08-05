import { Moment } from 'moment';
import { ITransportContractPart } from 'app/shared/model//transport-contract-part.model';

export interface ITransportHistory {
    id?: number;
    transportDate?: Moment;
    transportTime?: number;
    amountPerOne?: number;
    transportContractPart?: ITransportContractPart;
}

export class TransportHistory implements ITransportHistory {
    constructor(
        public id?: number,
        public transportDate?: Moment,
        public transportTime?: number,
        public amountPerOne?: number,
        public transportContractPart?: ITransportContractPart
    ) {}
}
