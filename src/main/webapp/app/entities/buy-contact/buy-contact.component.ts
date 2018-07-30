import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBuyContact } from 'app/shared/model/buy-contact.model';
import { Principal } from 'app/core';
import { BuyContactService } from './buy-contact.service';
import {IBuyContactWithSaleData} from 'app/shared/model/buy-contact-with-sale-data.model';

@Component({
    selector: 'jhi-buy-contact',
    templateUrl: './buy-contact.component.html'
})
export class BuyContactComponent implements OnInit, OnDestroy {
    buyContacts: IBuyContact[];
    currentAccount: any;
    eventSubscriber: Subscription;
    buyContactsWithSaleData: IBuyContactWithSaleData[];

    constructor(
        private buyContactService: BuyContactService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.buyContactService.query().subscribe(
            (res: HttpResponse<IBuyContact[]>) => {
                this.buyContacts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.buyContactService.getAllBuyContactsWithSaleData().subscribe(
            (res: HttpResponse<IBuyContact[]>) => {
                this.buyContactsWithSaleData = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBuyContacts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBuyContact) {
        return item.id;
    }

    registerChangeInBuyContacts() {
        this.eventSubscriber = this.eventManager.subscribe('buyContactListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
