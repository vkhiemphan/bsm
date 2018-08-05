import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuySaleManagerSharedModule } from 'app/shared';
import {
    TransportContractComponent,
    TransportContractDetailComponent,
    TransportContractUpdateComponent,
    TransportContractDeletePopupComponent,
    TransportContractDeleteDialogComponent,
    transportContractRoute,
    transportContractPopupRoute
} from './';

const ENTITY_STATES = [...transportContractRoute, ...transportContractPopupRoute];

@NgModule({
    imports: [BuySaleManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransportContractComponent,
        TransportContractDetailComponent,
        TransportContractUpdateComponent,
        TransportContractDeleteDialogComponent,
        TransportContractDeletePopupComponent
    ],
    entryComponents: [
        TransportContractComponent,
        TransportContractUpdateComponent,
        TransportContractDeleteDialogComponent,
        TransportContractDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuySaleManagerTransportContractModule {}
