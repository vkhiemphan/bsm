import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SaleContact } from 'app/shared/model/sale-contact.model';
import { SaleContactService } from './sale-contact.service';
import { SaleContactComponent } from './sale-contact.component';
import { SaleContactDetailComponent } from './sale-contact-detail.component';
import { SaleContactUpdateComponent } from './sale-contact-update.component';
import { SaleContactDeletePopupComponent } from './sale-contact-delete-dialog.component';
import { ISaleContact } from 'app/shared/model/sale-contact.model';

@Injectable({ providedIn: 'root' })
export class SaleContactResolve implements Resolve<ISaleContact> {
    constructor(private service: SaleContactService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((saleContact: HttpResponse<SaleContact>) => saleContact.body));
        }
        return of(new SaleContact());
    }
}

export const saleContactRoute: Routes = [
    {
        path: 'sale-contact',
        component: SaleContactComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SaleContacts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sale-contact/:id/view',
        component: SaleContactDetailComponent,
        resolve: {
            saleContact: SaleContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SaleContacts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sale-contact/new',
        component: SaleContactUpdateComponent,
        resolve: {
            saleContact: SaleContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SaleContacts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sale-contact/:id/edit',
        component: SaleContactUpdateComponent,
        resolve: {
            saleContact: SaleContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SaleContacts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const saleContactPopupRoute: Routes = [
    {
        path: 'sale-contact/:id/delete',
        component: SaleContactDeletePopupComponent,
        resolve: {
            saleContact: SaleContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SaleContacts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
