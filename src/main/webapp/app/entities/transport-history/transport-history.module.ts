import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuySaleManagerSharedModule } from 'app/shared';
import {
    TransportHistoryComponent,
    TransportHistoryDetailComponent,
    TransportHistoryUpdateComponent,
    TransportHistoryDeletePopupComponent,
    TransportHistoryDeleteDialogComponent,
    transportHistoryRoute,
    transportHistoryPopupRoute
} from './';

const ENTITY_STATES = [...transportHistoryRoute, ...transportHistoryPopupRoute];

@NgModule({
    imports: [BuySaleManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransportHistoryComponent,
        TransportHistoryDetailComponent,
        TransportHistoryUpdateComponent,
        TransportHistoryDeleteDialogComponent,
        TransportHistoryDeletePopupComponent
    ],
    entryComponents: [
        TransportHistoryComponent,
        TransportHistoryUpdateComponent,
        TransportHistoryDeleteDialogComponent,
        TransportHistoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuySaleManagerTransportHistoryModule {}
