import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BuySaleRelation } from 'app/shared/model/buy-sale-relation.model';
import { BuySaleRelationService } from './buy-sale-relation.service';
import { BuySaleRelationComponent } from './buy-sale-relation.component';
import { BuySaleRelationDetailComponent } from './buy-sale-relation-detail.component';
import { BuySaleRelationUpdateComponent } from './buy-sale-relation-update.component';
import { BuySaleRelationDeletePopupComponent } from './buy-sale-relation-delete-dialog.component';
import { IBuySaleRelation } from 'app/shared/model/buy-sale-relation.model';

@Injectable({ providedIn: 'root' })
export class BuySaleRelationResolve implements Resolve<IBuySaleRelation> {
    constructor(private service: BuySaleRelationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((buySaleRelation: HttpResponse<BuySaleRelation>) => buySaleRelation.body));
        }
        return of(new BuySaleRelation());
    }
}

export const buySaleRelationRoute: Routes = [
    {
        path: 'buy-sale-relation',
        component: BuySaleRelationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BuySaleRelations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'buy-sale-relation/:id/view',
        component: BuySaleRelationDetailComponent,
        resolve: {
            buySaleRelation: BuySaleRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BuySaleRelations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'buy-sale-relation/new',
        component: BuySaleRelationUpdateComponent,
        resolve: {
            buySaleRelation: BuySaleRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BuySaleRelations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'buy-sale-relation/:id/edit',
        component: BuySaleRelationUpdateComponent,
        resolve: {
            buySaleRelation: BuySaleRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BuySaleRelations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const buySaleRelationPopupRoute: Routes = [
    {
        path: 'buy-sale-relation/:id/delete',
        component: BuySaleRelationDeletePopupComponent,
        resolve: {
            buySaleRelation: BuySaleRelationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BuySaleRelations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
