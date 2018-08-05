export interface ITransportUnit {
    id?: number;
    name?: string;
    code?: string;
    note?: string;
    phone?: string;
    address?: string;
    size?: string;
    type?: string;
}

export class TransportUnit implements ITransportUnit {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public note?: string,
        public phone?: string,
        public address?: string,
        public size?: string,
        public type?: string
    ) {}
}
