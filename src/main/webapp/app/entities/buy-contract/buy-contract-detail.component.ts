import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBuyContract } from 'app/shared/model/buy-contract.model';
import {IBuySaleRelation} from 'app/shared/model/buy-sale-relation.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {BuySaleRelationService} from 'app/entities/buy-sale-relation';
import {JhiAlertService} from 'ng-jhipster';

@Component({
    selector: 'jhi-buy-contract-detail',
    templateUrl: './buy-contract-detail.component.html'
})
export class BuyContractDetailComponent implements OnInit {
    buyContract: IBuyContract;
    buySaleRelations: IBuySaleRelation[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private buySaleRelationService: BuySaleRelationService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ buyContract }) => {
            this.buyContract = buyContract;
        });
        this.buySaleRelationService.findAllByBuyContract(this.buyContract.id).subscribe(
            (res: HttpResponse<IBuyContract[]>) => {
                this.buySaleRelations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
