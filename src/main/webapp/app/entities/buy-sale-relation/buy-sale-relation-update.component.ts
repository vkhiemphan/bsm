import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBuySaleRelation } from 'app/shared/model/buy-sale-relation.model';
import { BuySaleRelationService } from './buy-sale-relation.service';
import { IBuyContract } from 'app/shared/model/buy-contract.model';
import { BuyContractService } from 'app/entities/buy-contract';
import { ISaleContract } from 'app/shared/model/sale-contract.model';
import { SaleContractService } from 'app/entities/sale-contract';

@Component({
    selector: 'jhi-buy-sale-relation-update',
    templateUrl: './buy-sale-relation-update.component.html'
})
export class BuySaleRelationUpdateComponent implements OnInit {
    private _buySaleRelation: IBuySaleRelation;
    isSaving: boolean;

    buycontracts: IBuyContract[];

    salecontracts: ISaleContract[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private buySaleRelationService: BuySaleRelationService,
        private buyContractService: BuyContractService,
        private saleContractService: SaleContractService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ buySaleRelation }) => {
            this.buySaleRelation = buySaleRelation;
        });
        this.buyContractService.query().subscribe(
            (res: HttpResponse<IBuyContract[]>) => {
                this.buycontracts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.saleContractService.query().subscribe(
            (res: HttpResponse<ISaleContract[]>) => {
                this.salecontracts = res.body;
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

    trackBuyContractById(index: number, item: IBuyContract) {
        return item.id;
    }

    trackSaleContractById(index: number, item: ISaleContract) {
        return item.id;
    }
    get buySaleRelation() {
        return this._buySaleRelation;
    }

    set buySaleRelation(buySaleRelation: IBuySaleRelation) {
        this._buySaleRelation = buySaleRelation;
    }
}
