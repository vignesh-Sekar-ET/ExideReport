import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { reportgroupdeleteComponent } from '../app/components/reportgroupdeleteComponent/reportgroupdelete.component';
import { userdeleteComponent } from '../app/components/userdeleteComponent/userdelete.component';

import { appDeclarations, appBootstrap, appProviders, appEntryComponents } from './config/declarations';
import { appImportModules } from './config/import-modules';
import { CcLogoDirective } from './cc-logo.directive';
import { UserIdleModule } from 'angular-user-idle';
import { AllowOnlyNumberDirective } from './allow-only-number.directive';
import { usergroupmappingcreateComponent } from './components/usergroupmappingcreateComponent/usergroupmappingcreate.component';
import { usergroupmappingviewComponent } from './components/usergroupmappingviewComponent/usergroupmappingview.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  declarations: [...appDeclarations, CcLogoDirective, AllowOnlyNumberDirective
    , usergroupmappingcreateComponent, usergroupmappingviewComponent],
  imports: [...appImportModules, UserIdleModule.forRoot({ idle: 600, timeout: 10, ping: 10 }), AngularMultiSelectModule],
  providers: [...appProviders],
  entryComponents: [...appEntryComponents, reportgroupdeleteComponent, userdeleteComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [...appBootstrap]
})
export class AppModule { }
