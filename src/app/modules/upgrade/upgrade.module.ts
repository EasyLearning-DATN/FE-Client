import {NgModule} from '@angular/core';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {InvoiceComponent} from '../../components/upgrade/invoice/invoice.component';
import {PaymentSuccessComponent} from '../../components/upgrade/success/success.component';
import {UpgradeComponent} from '../../components/upgrade/upgrade/upgrade.component';
import {SharedModule} from '../shared/shared.module';

import {UpgradeRoutingModule} from './upgrade-routing.module';


@NgModule({
  declarations: [
    UpgradeComponent,
    PaymentSuccessComponent,
    InvoiceComponent,
  ],
  imports: [
    UpgradeRoutingModule,
    SharedModule,
  ],
})
export class UpgradeModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
