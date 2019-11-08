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
import { reportgrouplistComponent } from '../components/reportgrouplistComponent/reportgrouplist.component';

window['neutrinos'] = {
  environments: environment
}

//CORE_REFERENCE_IMPORTS
//CORE_REFERENCE_IMPORT-dashboardComponent
import { dashboardComponent } from '../components/dashboardComponent/dashboard.component';
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
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-dashboardComponent
dashboardComponent,
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-createreportlistComponent
createreportlistComponent,
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-createreportComponent
createreportComponent,
//CORE_REFERENCE_PUSH_TO_DEC_ARRAY-loginComponent
loginComponent,

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
//CORE_REFERENCE_PUSH_TO_PRO_ARRAY-sampleserviceService
sampleserviceService,
//CORE_REFERENCE_PUSH_TO_PRO_ARRAY-loginserviceService
loginserviceService,

];

/**
* Routes available for bApp
*/

// CORE_REFERENCE_PUSH_TO_ROUTE_ARRAY_START
export const appRoutes = [{path: 'login', component: loginComponent},{path: 'createreportlist', component: createreportlistComponent},{path: 'createreport', component: createreportComponent},{path: 'dashboard', component: dashboardComponent},{path: '', redirectTo: 'login', pathMatch: 'full'},{path: '**', component: PageNotFoundComponent}]
// CORE_REFERENCE_PUSH_TO_ROUTE_ARRAY_END
