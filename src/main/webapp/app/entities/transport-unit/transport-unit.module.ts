import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuySaleManagerSharedModule } from 'app/shared';
import {
    TransportUnitComponent,
    TransportUnitDetailComponent,
    TransportUnitUpdateComponent,
    TransportUnitDeletePopupComponent,
    TransportUnitDeleteDialogComponent,
    transportUnitRoute,
    transportUnitPopupRoute
} from './';

const ENTITY_STATES = [...transportUnitRoute, ...transportUnitPopupRoute];

@NgModule({
    imports: [BuySaleManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransportUnitComponent,
        TransportUnitDetailComponent,
        TransportUnitUpdateComponent,
        TransportUnitDeleteDialogComponent,
        TransportUnitDeletePopupComponent
    ],
    entryComponents: [
        TransportUnitComponent,
        TransportUnitUpdateComponent,
        TransportUnitDeleteDialogComponent,
        TransportUnitDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuySaleManagerTransportUnitModule {}
