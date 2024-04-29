import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvoiceComponent} from '../../components/upgrade/invoice/invoice.component';
import {PaymentSuccessComponent} from '../../components/upgrade/success/success.component';
import {UpgradeComponent} from '../../components/upgrade/upgrade/upgrade.component';
import {authCanActivateGuard} from '../../guards/auth.can-activate.guard';

const routes: Routes = [
  {path: '', component: UpgradeComponent, canActivate: [authCanActivateGuard]},
  {path: 'payment-success', component: PaymentSuccessComponent, canActivate: [authCanActivateGuard]},
  {path: 'invoice', component: InvoiceComponent, canActivate: [authCanActivateGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpgradeRoutingModule {
}
