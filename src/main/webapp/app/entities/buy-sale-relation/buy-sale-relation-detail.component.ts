import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBuySaleRelation } from 'app/shared/model/buy-sale-relation.model';

@Component({
    selector: 'jhi-buy-sale-relation-detail',
    templateUrl: './buy-sale-relation-detail.component.html'
})
export class BuySaleRelationDetailComponent implements OnInit {
    buySaleRelation: IBuySaleRelation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ buySaleRelation }) => {
            this.buySaleRelation = buySaleRelation;
        });
    }

    previousState() {
        window.history.back();
    }
}
