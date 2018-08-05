import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SaleContract } from 'app/shared/model/sale-contract.model';
import { SaleContractService } from './sale-contract.service';
import { SaleContractComponent } from './sale-contract.component';
import { SaleContractDetailComponent } from './sale-contract-detail.component';
import { SaleContractUpdateComponent } from './sale-contract-update.component';
import { SaleContractDeletePopupComponent } from './sale-contract-delete-dialog.component';
import { ISaleContract } from 'app/shared/model/sale-contract.model';

@Injectable({ providedIn: 'root' })
export class SaleContractResolve implements Resolve<ISaleContract> {
    constructor(private service: SaleContractService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((saleContract: HttpResponse<SaleContract>) => saleContract.body));
        }
        return of(new SaleContract());
    }
}

export const saleContractRoute: Routes = [
    {
        path: 'sale-contract',
        component: SaleContractComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SaleContracts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sale-contract/:id/view',
        component: SaleContractDetailComponent,
        resolve: {
            saleContract: SaleContractResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SaleContracts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sale-contract/new',
        component: SaleContractUpdateComponent,
        resolve: {
            saleContract: SaleContractResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SaleContracts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sale-contract/:id/edit',
        component: SaleContractUpdateComponent,
        resolve: {
            saleContract: SaleContractResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SaleContracts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const saleContractPopupRoute: Routes = [
    {
        path: 'sale-contract/:id/delete',
        component: SaleContractDeletePopupComponent,
        resolve: {
            saleContract: SaleContractResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SaleContracts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
