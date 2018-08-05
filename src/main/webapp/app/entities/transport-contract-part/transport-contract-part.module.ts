import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuySaleManagerSharedModule } from 'app/shared';
import {
    TransportContractPartComponent,
    TransportContractPartDetailComponent,
    TransportContractPartUpdateComponent,
    TransportContractPartDeletePopupComponent,
    TransportContractPartDeleteDialogComponent,
    transportContractPartRoute,
    transportContractPartPopupRoute
} from './';

const ENTITY_STATES = [...transportContractPartRoute, ...transportContractPartPopupRoute];

@NgModule({
    imports: [BuySaleManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransportContractPartComponent,
        TransportContractPartDetailComponent,
        TransportContractPartUpdateComponent,
        TransportContractPartDeleteDialogComponent,
        TransportContractPartDeletePopupComponent
    ],
    entryComponents: [
        TransportContractPartComponent,
        TransportContractPartUpdateComponent,
        TransportContractPartDeleteDialogComponent,
        TransportContractPartDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuySaleManagerTransportContractPartModule {}
