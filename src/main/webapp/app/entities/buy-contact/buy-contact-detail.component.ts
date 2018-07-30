import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBuyContact } from 'app/shared/model/buy-contact.model';
import {IBuySaleRelation} from 'app/shared/model/buy-sale-relation.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {BuySaleRelationService} from 'app/entities/buy-sale-relation';
import {JhiAlertService} from 'ng-jhipster';

@Component({
    selector: 'jhi-buy-contact-detail',
    templateUrl: './buy-contact-detail.component.html'
})
export class BuyContactDetailComponent implements OnInit {
    buyContact: IBuyContact;
    buySaleRelations: IBuySaleRelation[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private buySaleRelationService: BuySaleRelationService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ buyContact }) => {
            this.buyContact = buyContact;
        });
        this.buySaleRelationService.findAllByBuyContract(this.buyContact.id).subscribe(
            (res: HttpResponse<IBuyContact[]>) => {
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
