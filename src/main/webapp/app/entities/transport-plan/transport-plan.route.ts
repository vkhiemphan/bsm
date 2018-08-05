import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransportPlan } from 'app/shared/model/transport-plan.model';
import { TransportPlanService } from './transport-plan.service';
import { TransportPlanComponent } from './transport-plan.component';
import { TransportPlanDetailComponent } from './transport-plan-detail.component';
import { TransportPlanUpdateComponent } from './transport-plan-update.component';
import { TransportPlanDeletePopupComponent } from './transport-plan-delete-dialog.component';
import { ITransportPlan } from 'app/shared/model/transport-plan.model';

@Injectable({ providedIn: 'root' })
export class TransportPlanResolve implements Resolve<ITransportPlan> {
    constructor(private service: TransportPlanService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((transportPlan: HttpResponse<TransportPlan>) => transportPlan.body));
        }
        return of(new TransportPlan());
    }
}

export const transportPlanRoute: Routes = [
    {
        path: 'transport-plan',
        component: TransportPlanComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportPlans'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transport-plan/:id/view',
        component: TransportPlanDetailComponent,
        resolve: {
            transportPlan: TransportPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportPlans'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transport-plan/new',
        component: TransportPlanUpdateComponent,
        resolve: {
            transportPlan: TransportPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportPlans'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transport-plan/:id/edit',
        component: TransportPlanUpdateComponent,
        resolve: {
            transportPlan: TransportPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportPlans'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transportPlanPopupRoute: Routes = [
    {
        path: 'transport-plan/:id/delete',
        component: TransportPlanDeletePopupComponent,
        resolve: {
            transportPlan: TransportPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransportPlans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
