import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISaleContact } from 'app/shared/model/sale-contact.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {BuyContactService} from 'app/entities/buy-contact';
import {IBuyContact} from 'app/shared/model/buy-contact.model';
import {JhiAlertService} from 'ng-jhipster';
import {IBuyContactForSale} from 'app/shared/model/buy-contact-for-sale.model';
import {BuySaleRelationService} from 'app/entities/buy-sale-relation';
import {IBuySaleRelation} from 'app/shared/model/buy-sale-relation.model';

@Component({
    selector: 'jhi-sale-contact-detail',
    templateUrl: './sale-contact-detail.component.html'
})
export class SaleContactDetailComponent implements OnInit {
    saleContact: ISaleContact;
    buyContacts: IBuyContact[];
    buyContactsForSale: IBuyContactForSale[];
    buySaleRelations: IBuySaleRelation[];
    showCannotSaveError: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private buyContactService: BuyContactService,
        private buySaleRelationService: BuySaleRelationService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ saleContact }) => {
            this.saleContact = saleContact;
        });
        this.buySaleRelationService.findAllBySaleContract(this.saleContact.id).subscribe(
            (res: HttpResponse<IBuyContact[]>) => {
                this.buySaleRelations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    selectGoodSources(id: number) {
        this.buyContactService.getAllBuyContactsForSaleContact(id).subscribe(
            (res: HttpResponse<IBuyContact[]>) => {
                this.buyContacts = res.body;
                if (this.buyContacts && this.buyContacts.length > 0) {
                    this.buyContactsForSale = [];
                    this.buyContacts.forEach(bc => {
                        const bcfs = {
                            id: bc.id,
                            buyContactCode: bc.buyContactCode,
                            amount: bc.amount,
                            remainAmount: bc.remainAmount,
                            price: bc.price,
                            etaDate: bc.etaDate,
                            amountSaleInContact: null
                        };
                        this.buyContactsForSale.push(bcfs);
                    });
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    saveSelectedGoodSources(id: number, buyContactsForSale: any[]) {
        this.showCannotSaveError = false;
        let totalAmount = 0;
        const buyContactSelected = [];
        buyContactsForSale.forEach(bc => {
            if (bc.amountSaleInContact && bc.amountSaleInContact > 0 && bc.amountSaleInContact <= bc.remainAmount) {
                totalAmount += bc.amountSaleInContact;
                buyContactSelected.push(bc);
            } else {
                this.showCannotSaveError = true;
                totalAmount = 0;
                return false;
            }
        });
        if (totalAmount > 0 && totalAmount <= this.saleContact.amount) {
            this.buySaleRelationService.saveSelectedGoodResources(id, buyContactSelected).subscribe(
                (res: HttpResponse<IBuyContact[]>) => {
                    this.buySaleRelations = res.body;
                    this.buyContactsForSale = null;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else {
            this.showCannotSaveError = true;
        }
    }

    previousState() {
        window.history.back();
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
