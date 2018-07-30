import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuySaleManagerSharedModule } from 'app/shared';
import {
    BuyContactComponent,
    BuyContactDetailComponent,
    BuyContactUpdateComponent,
    BuyContactDeletePopupComponent,
    BuyContactDeleteDialogComponent,
    buyContactRoute,
    buyContactPopupRoute
} from './';

const ENTITY_STATES = [...buyContactRoute, ...buyContactPopupRoute];

@NgModule({
    imports: [BuySaleManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BuyContactComponent,
        BuyContactDetailComponent,
        BuyContactUpdateComponent,
        BuyContactDeleteDialogComponent,
        BuyContactDeletePopupComponent
    ],
    entryComponents: [BuyContactComponent, BuyContactUpdateComponent, BuyContactDeleteDialogComponent, BuyContactDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuySaleManagerBuyContactModule {}
