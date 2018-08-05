import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransportUnit } from 'app/shared/model/transport-unit.model';
import { TransportUnitService } from './transport-unit.service';
import { TransportUnitComponent } from './transport-unit.component';
import { TransportUnitDetailComponent } from './transport-unit-detail.component';
import { TransportUnitUpdateComponent } from './transport-unit-update.component';
import { TransportUnitDeletePopupComponent } from './transport-unit-delete-dialog.component';
import { ITransportUnit } from 'app/shared/model/transport-unit.model';

@Injectable({ providedIn: 'root' })
export class TransportUnitResolve implements Resolve<ITransportUnit> {
    constructor(private service: TransportUnitService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((transportUnit: HttpResponse<TransportUnit>) => transportUnit.body));
        }
        return of(new TransportUnit());
    }
}

export const transportUnitRoute: Routes = [
    {
        path: 'transport-unit',
        component: TransportUnitComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportUnits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transport-unit/:id/view',
        component: TransportUnitDetailComponent,
        resolve: {
            transportUnit: TransportUnitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportUnits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transport-unit/new',
        component: TransportUnitUpdateComponent,
        resolve: {
            transportUnit: TransportUnitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportUnits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transport-unit/:id/edit',
        component: TransportUnitUpdateComponent,
        resolve: {
            transportUnit: TransportUnitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportUnits'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transportUnitPopupRoute: Routes = [
    {
        path: 'transport-unit/:id/delete',
        component: TransportUnitDeletePopupComponent,
        resolve: {
            transportUnit: TransportUnitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportUnits'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
