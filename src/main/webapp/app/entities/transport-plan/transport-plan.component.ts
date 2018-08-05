import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITransportPlan } from 'app/shared/model/transport-plan.model';
import { Principal } from 'app/core';
import { TransportPlanService } from './transport-plan.service';

@Component({
    selector: 'jhi-transport-plan',
    templateUrl: './transport-plan.component.html'
})
export class TransportPlanComponent implements OnInit, OnDestroy {
    transportPlans: ITransportPlan[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private transportPlanService: TransportPlanService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.transportPlanService.query().subscribe(
            (res: HttpResponse<ITransportPlan[]>) => {
                this.transportPlans = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTransportPlans();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITransportPlan) {
        return item.id;
    }

    registerChangeInTransportPlans() {
        this.eventSubscriber = this.eventManager.subscribe('transportPlanListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
