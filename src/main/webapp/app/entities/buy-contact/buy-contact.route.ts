import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BuyContact } from 'app/shared/model/buy-contact.model';
import { BuyContactService } from './buy-contact.service';
import { BuyContactComponent } from './buy-contact.component';
import { BuyContactDetailComponent } from './buy-contact-detail.component';
import { BuyContactUpdateComponent } from './buy-contact-update.component';
import { BuyContactDeletePopupComponent } from './buy-contact-delete-dialog.component';
import { IBuyContact } from 'app/shared/model/buy-contact.model';

@Injectable({ providedIn: 'root' })
export class BuyContactResolve implements Resolve<IBuyContact> {
    constructor(private service: BuyContactService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((buyContact: HttpResponse<BuyContact>) => buyContact.body));
        }
        return of(new BuyContact());
    }
}

export const buyContactRoute: Routes = [
    {
        path: 'buy-contact',
        component: BuyContactComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BuyContacts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'buy-contact/:id/view',
        component: BuyContactDetailComponent,
        resolve: {
            buyContact: BuyContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BuyContacts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'buy-contact/new',
        component: BuyContactUpdateComponent,
        resolve: {
            buyContact: BuyContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BuyContacts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'buy-contact/:id/edit',
        component: BuyContactUpdateComponent,
        resolve: {
            buyContact: BuyContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BuyContacts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const buyContactPopupRoute: Routes = [
    {
        path: 'buy-contact/:id/delete',
        component: BuyContactDeletePopupComponent,
        resolve: {
            buyContact: BuyContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BuyContacts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
