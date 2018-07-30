import { NgModule } from '@angular/core';

import { BuySaleManagerSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [BuySaleManagerSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [BuySaleManagerSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class BuySaleManagerSharedCommonModule {}
