import { Moment } from 'moment';
import { ITransportUnit } from 'app/shared/model//transport-unit.model';

export interface ITransportContract {
    id?: number;
    contractCode?: string;
    contractNumber?: number;
    contractDate?: Moment;
    startDate?: Moment;
    finishDate?: Moment;
    transportUnit?: ITransportUnit;
}

export class TransportContract implements ITransportContract {
    constructor(
        public id?: number,
        public contractCode?: string,
        public contractNumber?: number,
        public contractDate?: Moment,
        public startDate?: Moment,
        public finishDate?: Moment,
        public transportUnit?: ITransportUnit
    ) {}
}
