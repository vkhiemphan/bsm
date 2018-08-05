import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransportPlan } from 'app/shared/model/transport-plan.model';

@Component({
    selector: 'jhi-transport-plan-detail',
    templateUrl: './transport-plan-detail.component.html'
})
export class TransportPlanDetailComponent implements OnInit {
    transportPlan: ITransportPlan;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportPlan }) => {
            this.transportPlan = transportPlan;
        });
    }

    previousState() {
        window.history.back();
    }
}
