import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISaleContract } from 'app/shared/model/sale-contract.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {BuyContractService} from 'app/entities/buy-contract';
import {IBuyContract} from 'app/shared/model/buy-contract.model';
import {JhiAlertService} from 'ng-jhipster';
import {IBuyContractForSale} from 'app/shared/model/buy-contract-for-sale.model';
import {BuySaleRelationService} from 'app/entities/buy-sale-relation';
import {IBuySaleRelation} from 'app/shared/model/buy-sale-relation.model';

@Component({
    selector: 'jhi-sale-contract-detail',
    templateUrl: './sale-contract-detail.component.html'
})
export class SaleContractDetailComponent implements OnInit {
    saleContract: ISaleContract;
    buyContracts: IBuyContract[];
    buyContractsForSale: IBuyContractForSale[];
    buySaleRelations: IBuySaleRelation[];
    showCannotSaveError: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private buyContractService: BuyContractService,
        private buySaleRelationService: BuySaleRelationService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ saleContract }) => {
            this.saleContract = saleContract;
        });
        this.buySaleRelationService.findAllBySaleContract(this.saleContract.id).subscribe(
            (res: HttpResponse<IBuyContract[]>) => {
                this.buySaleRelations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    selectGoodSources(id: number) {
        this.buyContractService.getAllBuyContractsForSaleContract(id).subscribe(
            (res: HttpResponse<IBuyContract[]>) => {
                this.buyContracts = res.body;
                if (this.buyContracts && this.buyContracts.length > 0) {
                    this.buyContractsForSale = [];
                    this.buyContracts.forEach(bc => {
                        const bcfs = {
                            id: bc.id,
                            buyContractCode: bc.buyContractCode,
                            amount: bc.amount,
                            remainAmount: bc.remainAmount,
                            price: bc.price,
                            etaDate: bc.etaDate,
                            amountSaleInContract: null
                        };
                        this.buyContractsForSale.push(bcfs);
                    });
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    saveSelectedGoodSources(id: number, buyContractsForSale: any[]) {
        this.showCannotSaveError = false;
        let totalAmount = 0;
        const buyContractSelected = [];
        buyContractsForSale.forEach(bc => {
            if (bc.amountSaleInContract && bc.amountSaleInContract > 0 && bc.amountSaleInContract <= bc.remainAmount) {
                totalAmount += bc.amountSaleInContract;
                buyContractSelected.push(bc);
            } else {
                this.showCannotSaveError = true;
                totalAmount = 0;
                return false;
            }
        });
        if (totalAmount > 0 && totalAmount <= this.saleContract.amount) {
            this.buySaleRelationService.saveSelectedGoodResources(id, buyContractSelected).subscribe(
                (res: HttpResponse<IBuyContract[]>) => {
                    this.buySaleRelations = res.body;
                    this.buyContractsForSale = null;
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
