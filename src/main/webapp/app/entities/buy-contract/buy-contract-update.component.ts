import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBuyContract } from 'app/shared/model/buy-contract.model';
import { BuyContractService } from './buy-contract.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';
import { IProvider } from 'app/shared/model/provider.model';
import { ProviderService } from 'app/entities/provider';

@Component({
    selector: 'jhi-buy-contract-update',
    templateUrl: './buy-contract-update.component.html'
})
export class BuyContractUpdateComponent implements OnInit {
    private _buyContract: IBuyContract;
    isSaving: boolean;

    products: IProduct[];

    providers: IProvider[];
    contractDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private buyContractService: BuyContractService,
        private productService: ProductService,
        private providerService: ProviderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ buyContract }) => {
            this.buyContract = buyContract;
        });
        this.productService.query().subscribe(
            (res: HttpResponse<IProduct[]>) => {
                this.products = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.providerService.query().subscribe(
            (res: HttpResponse<IProvider[]>) => {
                this.providers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.buyContract.id !== undefined) {
            this.subscribeToSaveResponse(this.buyContractService.update(this.buyContract));
        } else {
            this.subscribeToSaveResponse(this.buyContractService.create(this.buyContract));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBuyContract>>) {
        result.subscribe((res: HttpResponse<IBuyContract>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProductById(index: number, item: IProduct) {
        return item.id;
    }

    trackProviderById(index: number, item: IProvider) {
        return item.id;
    }

    get buyContract() {
        return this._buyContract;
    }

    set buyContract(buyContract: IBuyContract) {
        this._buyContract = buyContract;
    }
}
