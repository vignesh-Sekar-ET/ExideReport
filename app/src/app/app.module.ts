import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { appDeclarations, appBootstrap, appProviders, appEntryComponents } from './config/declarations';
import { appImportModules } from './config/import-modules';
import { CcLogoDirective } from './cc-logo.directive';
import{userdeleteComponent} from '../app/components/userdeleteComponent/userdelete.component';
import{AllowOnlyNumberDirective}from './allow-only-number.directive';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MaterialTimePickerModule } from '@candidosales/material-time-picker';
import{reportgroupdeleteComponent} from '../app/components/reportgroupdeleteComponent/reportgroupdelete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DatePipe } from '@angular/common';
import{eventemitterserviceService}from '../app/services/eventemitterservice/eventemitterservice.service'





@NgModule({
  declarations: [...appDeclarations, CcLogoDirective,AllowOnlyNumberDirective],
  imports: [...appImportModules,NgMultiSelectDropDownModule,MaterialTimePickerModule,FormsModule,TimePickerModule ],
  providers: [...appProviders, DatePipe,eventemitterserviceService],
  entryComponents: [...appEntryComponents,reportgroupdeleteComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [...appBootstrap]
})
export class AppModule { }
