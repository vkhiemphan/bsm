import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BuySaleManagerSharedModule } from 'app/shared';
import {
    BuySaleRelationComponent,
    BuySaleRelationDetailComponent,
    BuySaleRelationUpdateComponent,
    BuySaleRelationDeletePopupComponent,
    BuySaleRelationDeleteDialogComponent,
    buySaleRelationRoute,
    buySaleRelationPopupRoute
} from './';

const ENTITY_STATES = [...buySaleRelationRoute, ...buySaleRelationPopupRoute];

@NgModule({
    imports: [BuySaleManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BuySaleRelationComponent,
        BuySaleRelationDetailComponent,
        BuySaleRelationUpdateComponent,
        BuySaleRelationDeleteDialogComponent,
        BuySaleRelationDeletePopupComponent
    ],
    entryComponents: [
        BuySaleRelationComponent,
        BuySaleRelationUpdateComponent,
        BuySaleRelationDeleteDialogComponent,
        BuySaleRelationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuySaleManagerBuySaleRelationModule {}
