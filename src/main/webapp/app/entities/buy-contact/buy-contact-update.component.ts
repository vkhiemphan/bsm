import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBuyContact } from 'app/shared/model/buy-contact.model';
import { BuyContactService } from './buy-contact.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';
import { IProvider } from 'app/shared/model/provider.model';
import { ProviderService } from 'app/entities/provider';

@Component({
    selector: 'jhi-buy-contact-update',
    templateUrl: './buy-contact-update.component.html'
})
export class BuyContactUpdateComponent implements OnInit {
    private _buyContact: IBuyContact;
    isSaving: boolean;

    products: IProduct[];

    providers: IProvider[];
    contactDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private buyContactService: BuyContactService,
        private productService: ProductService,
        private providerService: ProviderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ buyContact }) => {
            this.buyContact = buyContact;
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
        if (this.buyContact.id !== undefined) {
            this.subscribeToSaveResponse(this.buyContactService.update(this.buyContact));
        } else {
            this.subscribeToSaveResponse(this.buyContactService.create(this.buyContact));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBuyContact>>) {
        result.subscribe((res: HttpResponse<IBuyContact>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get buyContact() {
        return this._buyContact;
    }

    set buyContact(buyContact: IBuyContact) {
        this._buyContact = buyContact;
    }
}
