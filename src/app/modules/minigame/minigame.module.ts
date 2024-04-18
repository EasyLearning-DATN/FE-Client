import {NgModule} from '@angular/core';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import { FunnyWheelsComponent } from 'src/app/components/minigame/FunnyWheels/funny-wheels/funny-wheels.component';
import { MiniGameRoutingModule } from './minigame-routing.module';

@NgModule({
  declarations: [
    FunnyWheelsComponent
  ],
  imports: [
    MiniGameRoutingModule,
  ],
})
export class MiniGameModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
