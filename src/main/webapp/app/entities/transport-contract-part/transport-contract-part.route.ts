import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransportContractPart } from 'app/shared/model/transport-contract-part.model';
import { TransportContractPartService } from './transport-contract-part.service';
import { TransportContractPartComponent } from './transport-contract-part.component';
import { TransportContractPartDetailComponent } from './transport-contract-part-detail.component';
import { TransportContractPartUpdateComponent } from './transport-contract-part-update.component';
import { TransportContractPartDeletePopupComponent } from './transport-contract-part-delete-dialog.component';
import { ITransportContractPart } from 'app/shared/model/transport-contract-part.model';

@Injectable({ providedIn: 'root' })
export class TransportContractPartResolve implements Resolve<ITransportContractPart> {
    constructor(private service: TransportContractPartService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((transportContractPart: HttpResponse<TransportContractPart>) => transportContractPart.body));
        }
        return of(new TransportContractPart());
    }
}

export const transportContractPartRoute: Routes = [
    {
        path: 'transport-contract-part',
        component: TransportContractPartComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportContractParts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transport-contract-part/:id/view',
        component: TransportContractPartDetailComponent,
        resolve: {
            transportContractPart: TransportContractPartResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportContractParts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transport-contract-part/new',
        component: TransportContractPartUpdateComponent,
        resolve: {
            transportContractPart: TransportContractPartResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportContractParts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transport-contract-part/:id/edit',
        component: TransportContractPartUpdateComponent,
        resolve: {
            transportContractPart: TransportContractPartResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportContractParts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transportContractPartPopupRoute: Routes = [
    {
        path: 'transport-contract-part/:id/delete',
        component: TransportContractPartDeletePopupComponent,
        resolve: {
            transportContractPart: TransportContractPartResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportContractParts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
