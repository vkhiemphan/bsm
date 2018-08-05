import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISaleContract } from 'app/shared/model/sale-contract.model';
import { SaleContractService } from './sale-contract.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';

@Component({
    selector: 'jhi-sale-contract-update',
    templateUrl: './sale-contract-update.component.html'
})
export class SaleContractUpdateComponent implements OnInit {
    private _saleContract: ISaleContract;
    isSaving: boolean;

    products: IProduct[];

    customers: ICustomer[];
    contractDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private saleContractService: SaleContractService,
        private productService: ProductService,
        private customerService: CustomerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ saleContract }) => {
            this.saleContract = saleContract;
        });
        this.productService.query().subscribe(
            (res: HttpResponse<IProduct[]>) => {
                this.products = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomer[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.saleContract.id !== undefined) {
            this.subscribeToSaveResponse(this.saleContractService.update(this.saleContract));
        } else {
            this.subscribeToSaveResponse(this.saleContractService.create(this.saleContract));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISaleContract>>) {
        result.subscribe((res: HttpResponse<ISaleContract>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCustomerById(index: number, item: ICustomer) {
        return item.id;
    }
    get saleContract() {
        return this._saleContract;
    }

    set saleContract(saleContract: ISaleContract) {
        this._saleContract = saleContract;
    }
}
