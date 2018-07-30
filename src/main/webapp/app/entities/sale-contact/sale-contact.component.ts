import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISaleContact } from 'app/shared/model/sale-contact.model';
import { Principal } from 'app/core';
import { SaleContactService } from './sale-contact.service';

@Component({
    selector: 'jhi-sale-contact',
    templateUrl: './sale-contact.component.html'
})
export class SaleContactComponent implements OnInit, OnDestroy {
    saleContacts: ISaleContact[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private saleContactService: SaleContactService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.saleContactService.query().subscribe(
            (res: HttpResponse<ISaleContact[]>) => {
                this.saleContacts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSaleContacts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISaleContact) {
        return item.id;
    }

    registerChangeInSaleContacts() {
        this.eventSubscriber = this.eventManager.subscribe('saleContactListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
