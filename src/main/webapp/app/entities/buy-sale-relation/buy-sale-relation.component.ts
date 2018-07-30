import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBuySaleRelation } from 'app/shared/model/buy-sale-relation.model';
import { Principal } from 'app/core';
import { BuySaleRelationService } from './buy-sale-relation.service';

@Component({
    selector: 'jhi-buy-sale-relation',
    templateUrl: './buy-sale-relation.component.html'
})
export class BuySaleRelationComponent implements OnInit, OnDestroy {
    buySaleRelations: IBuySaleRelation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private buySaleRelationService: BuySaleRelationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.buySaleRelationService.query().subscribe(
            (res: HttpResponse<IBuySaleRelation[]>) => {
                this.buySaleRelations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBuySaleRelations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBuySaleRelation) {
        return item.id;
    }

    registerChangeInBuySaleRelations() {
        this.eventSubscriber = this.eventManager.subscribe('buySaleRelationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
