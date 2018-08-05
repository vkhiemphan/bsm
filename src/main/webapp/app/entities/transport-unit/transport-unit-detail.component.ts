import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransportUnit } from 'app/shared/model/transport-unit.model';

@Component({
    selector: 'jhi-transport-unit-detail',
    templateUrl: './transport-unit-detail.component.html'
})
export class TransportUnitDetailComponent implements OnInit {
    transportUnit: ITransportUnit;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportUnit }) => {
            this.transportUnit = transportUnit;
        });
    }

    previousState() {
        window.history.back();
    }
}
