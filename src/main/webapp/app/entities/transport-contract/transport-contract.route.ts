import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransportContract } from 'app/shared/model/transport-contract.model';
import { TransportContractService } from './transport-contract.service';
import { TransportContractComponent } from './transport-contract.component';
import { TransportContractDetailComponent } from './transport-contract-detail.component';
import { TransportContractUpdateComponent } from './transport-contract-update.component';
import { TransportContractDeletePopupComponent } from './transport-contract-delete-dialog.component';
import { ITransportContract } from 'app/shared/model/transport-contract.model';

@Injectable({ providedIn: 'root' })
export class TransportContractResolve implements Resolve<ITransportContract> {
    constructor(private service: TransportContractService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((transportContract: HttpResponse<TransportContract>) => transportContract.body));
        }
        return of(new TransportContract());
    }
}

export const transportContractRoute: Routes = [
    {
        path: 'transport-contract',
        component: TransportContractComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportContracts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transport-contract/:id/view',
        component: TransportContractDetailComponent,
        resolve: {
            transportContract: TransportContractResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportContracts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transport-contract/new',
        component: TransportContractUpdateComponent,
        resolve: {
            transportContract: TransportContractResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportContracts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transport-contract/:id/edit',
        component: TransportContractUpdateComponent,
        resolve: {
            transportContract: TransportContractResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportContracts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transportContractPopupRoute: Routes = [
    {
        path: 'transport-contract/:id/delete',
        component: TransportContractDeletePopupComponent,
        resolve: {
            transportContract: TransportContractResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportContracts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
