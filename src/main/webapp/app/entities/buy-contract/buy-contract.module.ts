import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuySaleManagerSharedModule } from 'app/shared';
import {
    BuyContractComponent,
    BuyContractDetailComponent,
    BuyContractUpdateComponent,
    BuyContractDeletePopupComponent,
    BuyContractDeleteDialogComponent,
    buyContractRoute,
    buyContractPopupRoute
} from './';

const ENTITY_STATES = [...buyContractRoute, ...buyContractPopupRoute];

@NgModule({
    imports: [BuySaleManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BuyContractComponent,
        BuyContractDetailComponent,
        BuyContractUpdateComponent,
        BuyContractDeleteDialogComponent,
        BuyContractDeletePopupComponent
    ],
    entryComponents: [BuyContractComponent, BuyContractUpdateComponent, BuyContractDeleteDialogComponent, BuyContractDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuySaleManagerBuyContractModule {}
