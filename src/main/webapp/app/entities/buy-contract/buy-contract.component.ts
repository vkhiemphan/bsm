import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBuyContract } from 'app/shared/model/buy-contract.model';
import { Principal } from 'app/core';
import { BuyContractService } from './buy-contract.service';
import { IBuyContractWithSaleData } from 'app/shared/model/buy-contract-with-sale-data.model';

@Component({
    selector: 'jhi-buy-contract',
    templateUrl: './buy-contract.component.html'
})
export class BuyContractComponent implements OnInit, OnDestroy {
    buyContracts: IBuyContract[];
    currentAccount: any;
    eventSubscriber: Subscription;
    buyContractsWithSaleData: IBuyContractWithSaleData[];

    constructor(
        private buyContractService: BuyContractService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.buyContractService.query().subscribe(
            (res: HttpResponse<IBuyContract[]>) => {
                this.buyContracts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.buyContractService.getAllBuyContractsWithSaleData().subscribe(
            (res: HttpResponse<IBuyContractWithSaleData[]>) => {
                this.buyContractsWithSaleData = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBuyContracts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBuyContract) {
        return item.id;
    }

    registerChangeInBuyContracts() {
        this.eventSubscriber = this.eventManager.subscribe('buyContractListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
