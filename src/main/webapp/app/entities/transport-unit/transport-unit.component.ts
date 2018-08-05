import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITransportUnit } from 'app/shared/model/transport-unit.model';
import { Principal } from 'app/core';
import { TransportUnitService } from './transport-unit.service';

@Component({
    selector: 'jhi-transport-unit',
    templateUrl: './transport-unit.component.html'
})
export class TransportUnitComponent implements OnInit, OnDestroy {
    transportUnits: ITransportUnit[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private transportUnitService: TransportUnitService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.transportUnitService.query().subscribe(
            (res: HttpResponse<ITransportUnit[]>) => {
                this.transportUnits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTransportUnits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITransportUnit) {
        return item.id;
    }

    registerChangeInTransportUnits() {
        this.eventSubscriber = this.eventManager.subscribe('transportUnitListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
