import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuySaleManagerSharedModule } from 'app/shared';
import {
    TransportPlanComponent,
    TransportPlanDetailComponent,
    TransportPlanUpdateComponent,
    TransportPlanDeletePopupComponent,
    TransportPlanDeleteDialogComponent,
    transportPlanRoute,
    transportPlanPopupRoute
} from './';

const ENTITY_STATES = [...transportPlanRoute, ...transportPlanPopupRoute];

@NgModule({
    imports: [BuySaleManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransportPlanComponent,
        TransportPlanDetailComponent,
        TransportPlanUpdateComponent,
        TransportPlanDeleteDialogComponent,
        TransportPlanDeletePopupComponent
    ],
    entryComponents: [
        TransportPlanComponent,
        TransportPlanUpdateComponent,
        TransportPlanDeleteDialogComponent,
        TransportPlanDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuySaleManagerTransportPlanModule {}
