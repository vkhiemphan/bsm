import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITransportContract } from 'app/shared/model/transport-contract.model';
import { Principal } from 'app/core';
import { TransportContractService } from './transport-contract.service';

@Component({
    selector: 'jhi-transport-contract',
    templateUrl: './transport-contract.component.html'
})
export class TransportContractComponent implements OnInit, OnDestroy {
    transportContracts: ITransportContract[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private transportContractService: TransportContractService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.transportContractService.query().subscribe(
            (res: HttpResponse<ITransportContract[]>) => {
                this.transportContracts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTransportContracts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITransportContract) {
        return item.id;
    }

    registerChangeInTransportContracts() {
        this.eventSubscriber = this.eventManager.subscribe('transportContractListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
