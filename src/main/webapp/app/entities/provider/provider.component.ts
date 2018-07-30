import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProvider } from 'app/shared/model/provider.model';
import { Principal } from 'app/core';
import { ProviderService } from './provider.service';

@Component({
    selector: 'jhi-provider',
    templateUrl: './provider.component.html'
})
export class ProviderComponent implements OnInit, OnDestroy {
    providers: IProvider[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private providerService: ProviderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.providerService.query().subscribe(
            (res: HttpResponse<IProvider[]>) => {
                this.providers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProviders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProvider) {
        return item.id;
    }

    registerChangeInProviders() {
        this.eventSubscriber = this.eventManager.subscribe('providerListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
