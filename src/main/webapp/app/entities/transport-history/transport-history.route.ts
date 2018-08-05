import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransportHistory } from 'app/shared/model/transport-history.model';
import { TransportHistoryService } from './transport-history.service';
import { TransportHistoryComponent } from './transport-history.component';
import { TransportHistoryDetailComponent } from './transport-history-detail.component';
import { TransportHistoryUpdateComponent } from './transport-history-update.component';
import { TransportHistoryDeletePopupComponent } from './transport-history-delete-dialog.component';
import { ITransportHistory } from 'app/shared/model/transport-history.model';

@Injectable({ providedIn: 'root' })
export class TransportHistoryResolve implements Resolve<ITransportHistory> {
    constructor(private service: TransportHistoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((transportHistory: HttpResponse<TransportHistory>) => transportHistory.body));
        }
        return of(new TransportHistory());
    }
}

export const transportHistoryRoute: Routes = [
    {
        path: 'transport-history',
        component: TransportHistoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportHistories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transport-history/:id/view',
        component: TransportHistoryDetailComponent,
        resolve: {
            transportHistory: TransportHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportHistories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transport-history/new',
        component: TransportHistoryUpdateComponent,
        resolve: {
            transportHistory: TransportHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportHistories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transport-history/:id/edit',
        component: TransportHistoryUpdateComponent,
        resolve: {
            transportHistory: TransportHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportHistories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transportHistoryPopupRoute: Routes = [
    {
        path: 'transport-history/:id/delete',
        component: TransportHistoryDeletePopupComponent,
        resolve: {
            transportHistory: TransportHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportHistories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
