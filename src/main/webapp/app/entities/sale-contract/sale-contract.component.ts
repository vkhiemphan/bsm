import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISaleContract } from 'app/shared/model/sale-contract.model';
import { Principal } from 'app/core';
import { SaleContractService } from './sale-contract.service';

@Component({
    selector: 'jhi-sale-contract',
    templateUrl: './sale-contract.component.html'
})
export class SaleContractComponent implements OnInit, OnDestroy {
    saleContracts: ISaleContract[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private saleContractService: SaleContractService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.saleContractService.query().subscribe(
            (res: HttpResponse<ISaleContract[]>) => {
                this.saleContracts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSaleContracts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISaleContract) {
        return item.id;
    }

    registerChangeInSaleContracts() {
        this.eventSubscriber = this.eventManager.subscribe('saleContractListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
