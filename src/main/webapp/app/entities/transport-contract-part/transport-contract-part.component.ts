import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITransportContractPart } from 'app/shared/model/transport-contract-part.model';
import { Principal } from 'app/core';
import { TransportContractPartService } from './transport-contract-part.service';

@Component({
    selector: 'jhi-transport-contract-part',
    templateUrl: './transport-contract-part.component.html'
})
export class TransportContractPartComponent implements OnInit, OnDestroy {
    transportContractParts: ITransportContractPart[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private transportContractPartService: TransportContractPartService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.transportContractPartService.query().subscribe(
            (res: HttpResponse<ITransportContractPart[]>) => {
                this.transportContractParts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTransportContractParts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITransportContractPart) {
        return item.id;
    }

    registerChangeInTransportContractParts() {
        this.eventSubscriber = this.eventManager.subscribe('transportContractPartListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
