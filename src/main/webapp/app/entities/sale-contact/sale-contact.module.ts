import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuySaleManagerSharedModule } from 'app/shared';
import {
    SaleContactComponent,
    SaleContactDetailComponent,
    SaleContactUpdateComponent,
    SaleContactDeletePopupComponent,
    SaleContactDeleteDialogComponent,
    saleContactRoute,
    saleContactPopupRoute
} from './';

const ENTITY_STATES = [...saleContactRoute, ...saleContactPopupRoute];

@NgModule({
    imports: [BuySaleManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SaleContactComponent,
        SaleContactDetailComponent,
        SaleContactUpdateComponent,
        SaleContactDeleteDialogComponent,
        SaleContactDeletePopupComponent
    ],
    entryComponents: [SaleContactComponent, SaleContactUpdateComponent, SaleContactDeleteDialogComponent, SaleContactDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuySaleManagerSaleContactModule {}
