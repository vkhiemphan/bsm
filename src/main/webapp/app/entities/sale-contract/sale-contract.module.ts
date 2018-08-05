import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuySaleManagerSharedModule } from 'app/shared';
import {
    SaleContractComponent,
    SaleContractDetailComponent,
    SaleContractUpdateComponent,
    SaleContractDeletePopupComponent,
    SaleContractDeleteDialogComponent,
    saleContractRoute,
    saleContractPopupRoute
} from './';

const ENTITY_STATES = [...saleContractRoute, ...saleContractPopupRoute];

@NgModule({
    imports: [BuySaleManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SaleContractComponent,
        SaleContractDetailComponent,
        SaleContractUpdateComponent,
        SaleContractDeleteDialogComponent,
        SaleContractDeletePopupComponent
    ],
    entryComponents: [SaleContractComponent, SaleContractUpdateComponent, SaleContractDeleteDialogComponent, SaleContractDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuySaleManagerSaleContractModule {}
