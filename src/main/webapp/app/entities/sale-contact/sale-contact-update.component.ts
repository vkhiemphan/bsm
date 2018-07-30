import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISaleContact } from 'app/shared/model/sale-contact.model';
import { SaleContactService } from './sale-contact.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';

@Component({
    selector: 'jhi-sale-contact-update',
    templateUrl: './sale-contact-update.component.html'
})
export class SaleContactUpdateComponent implements OnInit {
    private _saleContact: ISaleContact;
    isSaving: boolean;

    products: IProduct[];

    customers: ICustomer[];
    contactDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private saleContactService: SaleContactService,
        private productService: ProductService,
        private customerService: CustomerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ saleContact }) => {
            this.saleContact = saleContact;
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
        if (this.saleContact.id !== undefined) {
            this.subscribeToSaveResponse(this.saleContactService.update(this.saleContact));
        } else {
            this.subscribeToSaveResponse(this.saleContactService.create(this.saleContact));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISaleContact>>) {
        result.subscribe((res: HttpResponse<ISaleContact>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get saleContact() {
        return this._saleContact;
    }

    set saleContact(saleContact: ISaleContact) {
        this._saleContact = saleContact;
    }
}
