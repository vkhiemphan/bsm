import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BuySaleManagerProductModule } from './product/product.module';
import { BuySaleManagerCustomerModule } from './customer/customer.module';
import { BuySaleManagerProviderModule } from './provider/provider.module';
import { BuySaleManagerSaleContactModule } from './sale-contact/sale-contact.module';
import { BuySaleManagerBuyContactModule } from './buy-contact/buy-contact.module';
import { BuySaleManagerBuySaleRelationModule } from './buy-sale-relation/buy-sale-relation.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        BuySaleManagerProductModule,
        BuySaleManagerCustomerModule,
        BuySaleManagerProviderModule,
        BuySaleManagerSaleContactModule,
        BuySaleManagerBuyContactModule,
        BuySaleManagerBuySaleRelationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuySaleManagerEntityModule {}
