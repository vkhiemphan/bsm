import { ITransportContract } from 'app/shared/model//transport-contract.model';
import { IPosition } from 'app/shared/model//position.model';
import { ISaleContract } from 'app/shared/model/sale-contract.model';

export interface ITransportContractPart {
    id?: number;
    price?: number;
    size?: number;
    distance?: number;
    amount?: number;
    currentAmount?: number;
    saleContract?: ISaleContract;
    transportContract?: ITransportContract;
    positionStart?: IPosition;
    positionFinish?: IPosition;
}

export class TransportContractPart implements ITransportContractPart {
    constructor(
        public id?: number,
        public price?: number,
        public size?: number,
        public distance?: number,
        public amount?: number,
        public currentAmount?: number,
        public saleContract?: ISaleContract,
        public transportContract?: ITransportContract,
        public positionStart?: IPosition,
        public positionFinish?: IPosition
    ) {}
}
