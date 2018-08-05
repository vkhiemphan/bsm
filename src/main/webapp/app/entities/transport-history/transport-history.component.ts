import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITransportHistory } from 'app/shared/model/transport-history.model';
import { Principal } from 'app/core';
import { TransportHistoryService } from './transport-history.service';

@Component({
    selector: 'jhi-transport-history',
    templateUrl: './transport-history.component.html'
})
export class TransportHistoryComponent implements OnInit, OnDestroy {
    transportHistories: ITransportHistory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private transportHistoryService: TransportHistoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.transportHistoryService.query().subscribe(
            (res: HttpResponse<ITransportHistory[]>) => {
                this.transportHistories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTransportHistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITransportHistory) {
        return item.id;
    }

    registerChangeInTransportHistories() {
        this.eventSubscriber = this.eventManager.subscribe('transportHistoryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
