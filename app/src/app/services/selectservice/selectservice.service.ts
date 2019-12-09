/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { ReportGroup } from '../../report-group';
import { UserGroup } from '../../user-group';

@Injectable()
export class selectserviceService {
getCountries() {
    return [
     new UserGroup(1, 'USA' ),
     new UserGroup(2, 'Brazil' ),
    ];
  }
  
  getStates() {
   return [
     new ReportGroup(1, 1, 'Arizona' ),
     new ReportGroup(2, 1, 'Alaska' ),
     new ReportGroup(3, 1, 'Florida'),
     new ReportGroup(4, 1, 'Hawaii'),
     new ReportGroup(5, 2, 'Sao Paulo' ),
     new ReportGroup(6, 2, 'Rio de Janeiro'),
     new ReportGroup(7, 2, 'Minas Gerais' )
    ];
  }
}
