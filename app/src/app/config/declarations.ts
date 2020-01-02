import { PageNotFoundComponent } from '../not-found.component';
import { LayoutComponent } from '../layout/layout.component';
import { ImgSrcDirective } from '../directives/imgSrc.directive';
import { APP_INITIALIZER } from '@angular/core';
import { NDataSourceService } from '../n-services/n-dataSorce.service';
import { environment } from '../../environments/environment';
import { NMapComponent } from '../n-components/nMapComponent/n-map.component';
import { NLocaleResource } from '../n-services/n-localeResources.service';
import { NAuthGuardService } from 'neutrinos-seed-services';
import { ArtImgSrcDirective } from '../directives/artImgSrc.directive';

window['neutrinos'] = {
  environments: environment
}

//CORE_REFERENCE_IMPORTS
//CORE_REFERENCE_IMPORT-dbconfiglistComponent
import { dbconfiglistComponent } from '../components/dbconfiglistComponent/dbconfiglist.component';
//CORE_REFERENCE_IMPORT-reportconfigcreateComponent
import { reportconfigcreateComponent } from '../components/reportconfigcreateComponent/reportconfigcreate.component';
//CORE_REFERENCE_IMPORT-reportconfigserviceService
import { reportconfigserviceService } from '../services/reportconfigservice/reportconfigservice.service';
//CORE_REFERENCE_IMPORT-reportconfiglistComponent
import { reportconfiglistComponent } from '../components/reportconfiglistComponent/reportconfiglist.component';
//CORE_REFERENCE_IMPORT-authService
import { authService } from '../services/auth/auth.service';
//CORE_REFERENCE_IMPORT-route_guardService
import { route_guardService } from '../services/route_guard/route_guard.service';
//CORE_REFERENCE_IMPORT-tabledemoComponent
import { tabledemoComponent } from '../components/tabledemoComponent/tabledemo.component';
//CORE_REFERENCE_IMPORT-reportcreateserviceService
import { reportcreateserviceService } from '../services/reportcreateservice/reportcreateservice.service';
//CORE_REFERENCE_IMPORT-reportcreateComponent
//CORE_REFERENCE_IMPORT-reportlistserviceService
import { reportlistserviceService } from '../services/reportlistservice/reportlistservice.service';
//CORE_REFERENCE_IMPORT-reportlistComponent
//CORE_REFERENCE_IMPORT-admindashboardComponent
import { admindashboardComponent } from '../components/admindashboardComponent/admindashboard.component';
//CORE_REFERENCE_IMPORT-generatereportComponent
import { generatereportComponent } from '../components/generatereportComponent/generatereport.component';

//CORE_REFERENCE_IMPORT-sampleserviceService
import { sampleserviceService } from '../services/sampleservice/sampleservice.service';
//CORE_REFERENCE_IMPORT-createreportlistComponent
import { createreportlistComponent } from '../components/createreportlistComponent/createreportlist.component';
//CORE_REFERENCE_IMPORT-createreportComponent
import { createreportComponent } from '../components/createreportComponent/createreport.component';
//CORE_REFERENCE_IMPORT-loginserviceService
import { loginserviceService } from '../services/loginservice/loginservice.service';
//CORE_REFERENCE_IMPORT-loginComponent
import { loginComponent } from '../components/loginComponent/login.component';

//CORE_REFERENCE_IMPORT-usergrouplistComponent
import { usergrouplistComponent } from '../components/usergrouplistComponent/usergrouplist.component';
//CORE_REFERENCE_IMPORT-usergrouplistComponent
import { userreportlistComponent } from '../components/userreportlistComponent/userreportlist.component';

import { usercreateComponent } from '../components/usercreateComponent/usercreate.component';

import { userupdateComponent } from '../components/userupdateComponent/userupdate.component';

import { userdeleteComponent } from '../components/userdeleteComponent/userdelete.component';
//CORE_REFERENCE_IMPORT-dbconfigcreateComponent
//CORE_REFERENCE_IMPORT-dbconfigcreateComponent
import { dbconfigcreateComponent } from '../components/dbconfigcreateComponent/dbconfigcreate.component';
//CORE_REFERENCE_IMPORT-dbconfigComponent
import { dbconfigComponent } from '../components/dbconfigComponent/dbconfig.component';
//CORE_REFERENCE_IMPORT-serService
import { serService } from '../services/ser/ser.service';
import { mappingserviceService } from '../services/mappingservice/mappingservice.service';
import { userlistserviceService } from '../services/userlistservice/userlistservice.service';
//CORE_REFERENCE_IMPORT-dummyComponent
//CORE_REFERENCE_IMPORT-dashboardService
import { dashboardService } from '../services/dashboard/dashboard.service';
import { tablepaginationserviceService } from '../services/tablepaginationservice/tablepaginationservice.service';

//CORE_REFERENCE_IMPORT-dashboardComponent
import { dashboardComponent } from '../components/dashboardComponent/dashboard.component';
import { reportgrouplistComponent } from '../components/reportgrouplistComponent/reportgrouplist.component';
import { reportgroupcreateComponent } from '../components/reportgroupcreateComponent/reportgroupcreate.component';
import { reportgroupupdateComponent } from '../components/reportgroupupdateComponent/reportgroupupdate.component';
import { reportgroupdeleteComponent } from '../components/reportgroupdeleteComponent/reportgroupdelete.component';
import { dbconfigupdateComponent } from '../components/dbconfigupdateComponent/dbconfigupdate.component';
import { usergroupmappingcreateComponent } from '../components/usergroupmappingcreateComponent/usergroupmappingcreate.component';

// import { reportgrouplistComponent } from '../components/reportgrouplistComponent/reportgrouplist.component';
/**
 * Reads datasource object and injects the datasource object into window object
 * Injects the imported environment object into the window object
 *
 */
export function startupServiceFactory(startupService: NDataSourceService) {
  return () => startupService.getDataSource();
}

/**
*bootstrap for @NgModule
*/
export const appBootstrap: any = [
  LayoutComponent,
];


/**
*Entry Components for @NgModule
*/
export const appEntryComponents: any = [
  //CORE_REFERENCE_PUSH_TO_ENTRY_ARRAY
];

/**
*declarations for @NgModule
*/
export const appDeclarations = [
  ImgSrcDirective,
  LayoutComponent,
  PageNotFoundComponent,
  reportgrouplistComponent,
  NMapComponent,
  ArtImgSrcDirective,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-dbconfiglistComponent
dbconfiglistComponent,
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-reportconfigcreateComponent
reportconfigcreateComponent,
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-reportconfiglistComponent
reportconfiglistComponent,
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-tabledemoComponent
tabledemoComponent,
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-admindashboardComponent
admindashboardComponent,
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-generatereportComponent
generatereportComponent,
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-dashboardComponent
dashboardComponent,
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-createreportlistComponent
createreportlistComponent,
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-createreportComponent
createreportComponent,
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-loginComponent
loginComponent,

  NMapComponent,
  ArtImgSrcDirective,
  //CORE_REFERENCE_PUSH_TO_DEC_ARRAY
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-usergrouplistComponent
usergrouplistComponent,
userreportlistComponent,
usercreateComponent,
userupdateComponent,
userdeleteComponent,
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-dbconfigcreateComponent
dbconfigcreateComponent,
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-dbconfigComponent
dbconfigComponent,
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-dummyComponent
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-dashboardComponent
dashboardComponent,
reportgrouplistComponent,
reportgroupcreateComponent,
reportgroupupdateComponent,
reportgroupdeleteComponent,
dbconfigupdateComponent,
usergroupmappingcreateComponent
];

/**
* provider for @NgModuke
*/
export const appProviders = [
  NDataSourceService,
  NLocaleResource,
  {
    // Provider for APP_INITIALIZER
    provide: APP_INITIALIZER,
    useFactory: startupServiceFactory,
    deps: [NDataSourceService],
    multi: true
  },
  NAuthGuardService,
  //CORE_REFERENCE_PUSH_TO_PRO_ARRAY
//CORE_REFERENCE_PUSH_TO_PRO_ARRAY-reportconfigserviceService
reportconfigserviceService,
//CORE_REFERENCE_PUSH_TO_PRO_ARRAY-authService
authService,
//CORE_REFERENCE_PUSH_TO_PRO_ARRAY-route_guardService
route_guardService,
//CORE_REFERENCE_PUSH_TO_PRO_ARRAY-reportcreateserviceService
reportcreateserviceService,
//CORE_REFERENCE_PUSH_TO_PRO_ARRAY-reportlistserviceService
reportlistserviceService,
//CORE_REFERENCE_PUSH_TO_PRO_ARRAY-sampleserviceService
sampleserviceService,
//CORE_REFERENCE_PUSH_TO_PRO_ARRAY-loginserviceService
loginserviceService,
//CORE_REFERENCE_PUSH_TO_PRO_ARRAY-serService
serService,
//CORE_REFERENCE_PUSH_TO_PRO_ARRAY-dashboardService
dashboardService,
userlistserviceService,
mappingserviceService,
tablepaginationserviceService
];

/**
* Routes available for bApp
*/

// CORE_REFERENCE_PUSH_TO_ROUTE_ARRAY_START
export const appRoutes = [{path: 'login', component: loginComponent},{path: 'dashboard', component: dashboardComponent,
children: [{path: 'adminDashboard', component: admindashboardComponent},{path: 'generatereport', component: generatereportComponent},{path: 'admindash', component: admindashboardComponent,
children: []},{path: 'createuserlist', component: userreportlistComponent, canActivate: [route_guardService]},{path: 'userCreate', component: usercreateComponent},{path: 'userUpdate', component: userupdateComponent},{path: 'usergroupmap', component: usergrouplistComponent},{path: 'createreport', component: createreportComponent},{path: 'createreportlist', component: createreportlistComponent},{path: 'reportgrouplist', component: reportgrouplistComponent},{path: 'reportCreate', component: reportgroupcreateComponent},{path: 'reportDelete', component: reportgroupdeleteComponent},{path: 'reportConfigList', component: reportconfiglistComponent},{path: 'reportConfigCreate', component: reportconfigcreateComponent},{path: 'userGroupmappingCreate', component: usergroupmappingcreateComponent,
children: []},{path: 'dbconfiglist', component: dbconfiglistComponent},{path: 'dbconfigCreate', component: dbconfigcreateComponent},{path: 'dbconfigupdate', component: dbconfigupdateComponent}]},{path: '', redirectTo: 'login', pathMatch: 'full'},{path: '**', component: PageNotFoundComponent}]
// CORE_REFERENCE_PUSH_TO_ROUTE_ARRAY_END
