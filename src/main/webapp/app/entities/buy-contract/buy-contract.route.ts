import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BuyContract } from 'app/shared/model/buy-contract.model';
import { BuyContractService } from './buy-contract.service';
import { BuyContractComponent } from './buy-contract.component';
import { BuyContractDetailComponent } from './buy-contract-detail.component';
import { BuyContractUpdateComponent } from './buy-contract-update.component';
import { BuyContractDeletePopupComponent } from './buy-contract-delete-dialog.component';
import { IBuyContract } from 'app/shared/model/buy-contract.model';

@Injectable({ providedIn: 'root' })
export class BuyContractResolve implements Resolve<IBuyContract> {
    constructor(private service: BuyContractService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((buyContract: HttpResponse<BuyContract>) => buyContract.body));
        }
        return of(new BuyContract());
    }
}

export const buyContractRoute: Routes = [
    {
        path: 'buy-contract',
        component: BuyContractComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BuyContracts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'buy-contract/:id/view',
        component: BuyContractDetailComponent,
        resolve: {
            buyContract: BuyContractResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BuyContracts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'buy-contract/new',
        component: BuyContractUpdateComponent,
        resolve: {
            buyContract: BuyContractResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BuyContracts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'buy-contract/:id/edit',
        component: BuyContractUpdateComponent,
        resolve: {
            buyContract: BuyContractResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BuyContracts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const buyContractPopupRoute: Routes = [
    {
        path: 'buy-contract/:id/delete',
        component: BuyContractDeletePopupComponent,
        resolve: {
            buyContract: BuyContractResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BuyContracts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
