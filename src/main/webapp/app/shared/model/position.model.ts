export interface IPosition {
    id?: number;
    positionCode?: string;
    name?: string;
    note?: string;
    address?: string;
}

export class Position implements IPosition {
    constructor(public id?: number, public positionCode?: string, public name?: string, public note?: string, public address?: string) {}
}
