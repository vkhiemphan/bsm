import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BuySaleManagerProductModule } from './product/product.module';
import { BuySaleManagerCustomerModule } from './customer/customer.module';
import { BuySaleManagerProviderModule } from './provider/provider.module';
import { BuySaleManagerSaleContractModule } from './sale-contract/sale-contract.module';
import { BuySaleManagerBuyContractModule } from './buy-contract/buy-contract.module';
import { BuySaleManagerBuySaleRelationModule } from './buy-sale-relation/buy-sale-relation.module';
import { BuySaleManagerPositionModule } from './position/position.module';
import { BuySaleManagerTransportUnitModule } from './transport-unit/transport-unit.module';
import { BuySaleManagerTransportContractModule } from './transport-contract/transport-contract.module';
import { BuySaleManagerTransportContractPartModule } from './transport-contract-part/transport-contract-part.module';
import { BuySaleManagerTransportPlanModule } from './transport-plan/transport-plan.module';
import { BuySaleManagerTransportHistoryModule } from './transport-history/transport-history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        BuySaleManagerProductModule,
        BuySaleManagerCustomerModule,
        BuySaleManagerProviderModule,
        BuySaleManagerSaleContractModule,
        BuySaleManagerBuyContractModule,
        BuySaleManagerBuySaleRelationModule,
        BuySaleManagerPositionModule,
        BuySaleManagerTransportUnitModule,
        BuySaleManagerTransportContractModule,
        BuySaleManagerTransportContractPartModule,
        BuySaleManagerTransportPlanModule,
        BuySaleManagerTransportHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuySaleManagerEntityModule {}
