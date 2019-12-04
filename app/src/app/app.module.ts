import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { appDeclarations, appBootstrap, appProviders, appEntryComponents } from './config/declarations';
import { appImportModules } from './config/import-modules';
import { CcLogoDirective } from './cc-logo.directive';
import{userdeleteComponent} from '../app/components/userdeleteComponent/userdelete.component';
import{AllowOnlyNumberDirective}from './allow-only-number.directive';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MaterialTimePickerModule } from '@candidosales/material-time-picker';



@NgModule({
  declarations: [...appDeclarations, CcLogoDirective,AllowOnlyNumberDirective],
  imports: [...appImportModules,NgMultiSelectDropDownModule,MaterialTimePickerModule],
  providers: [...appProviders],
  entryComponents: [...appEntryComponents,userdeleteComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [...appBootstrap]
})
export class AppModule { }
