import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBuySaleRelation } from 'app/shared/model/buy-sale-relation.model';
import { BuySaleRelationService } from './buy-sale-relation.service';
import { IBuyContact } from 'app/shared/model/buy-contact.model';
import { BuyContactService } from 'app/entities/buy-contact';
import { ISaleContact } from 'app/shared/model/sale-contact.model';
import { SaleContactService } from 'app/entities/sale-contact';

@Component({
    selector: 'jhi-buy-sale-relation-update',
    templateUrl: './buy-sale-relation-update.component.html'
})
export class BuySaleRelationUpdateComponent implements OnInit {
    private _buySaleRelation: IBuySaleRelation;
    isSaving: boolean;

    buycontacts: IBuyContact[];

    salecontacts: ISaleContact[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private buySaleRelationService: BuySaleRelationService,
        private buyContactService: BuyContactService,
        private saleContactService: SaleContactService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ buySaleRelation }) => {
            this.buySaleRelation = buySaleRelation;
        });
        this.buyContactService.query().subscribe(
            (res: HttpResponse<IBuyContact[]>) => {
                this.buycontacts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.saleContactService.query().subscribe(
            (res: HttpResponse<ISaleContact[]>) => {
                this.salecontacts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.buySaleRelation.id !== undefined) {
            this.subscribeToSaveResponse(this.buySaleRelationService.update(this.buySaleRelation));
        } else {
            this.subscribeToSaveResponse(this.buySaleRelationService.create(this.buySaleRelation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBuySaleRelation>>) {
        result.subscribe((res: HttpResponse<IBuySaleRelation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackBuyContactById(index: number, item: IBuyContact) {
        return item.id;
    }

    trackSaleContactById(index: number, item: ISaleContact) {
        return item.id;
    }
    get buySaleRelation() {
        return this._buySaleRelation;
    }

    set buySaleRelation(buySaleRelation: IBuySaleRelation) {
        this._buySaleRelation = buySaleRelation;
    }
}
