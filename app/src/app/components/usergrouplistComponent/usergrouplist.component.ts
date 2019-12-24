/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, ViewChild, Inject } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Columnsetting } from '../../columnsetting';
import { reportlistserviceService } from '../../services/reportlistservice/reportlistservice.service';
import { Observable, of } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { userdeleteComponent } from '../userdeleteComponent/userdelete.component';
import { reportgroupdeleteComponent } from '../reportgroupdeleteComponent/reportgroupdelete.component'



//comment 

/**
 * Service import Example :
 * import { HeroService } from '../../services/hero/hero.service';
 */

/**
* 
* Serivice Designer import Example - Service Name - HeroService
* import { HeroService } from 'app/sd-services/HeroService';
*/
export interface PeriodicElement {
   Groupname: string;
  Groupcode: number;
  Status: string;
    
}
const ELEMENT_DATA: PeriodicElement[] = [
   
   
];
@Component({
    selector: 'bh-usergrouplist',
    templateUrl: './usergrouplist.template.html'
})
export class usergrouplistComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
     tablerow: any = [
        { value: '0'}
       
    ];
   
    constructor(private bdms: NDataModelService, public dialog: MatDialog, public route: Router, private formBuilder: FormBuilder, private reportservice: reportlistserviceService, private snackBar: MatSnackBar) {
        super();
        this.mm = new ModelMethods(bdms);
        this.reportservice.getJson().subscribe((response) => {
            this.dataSource = response;
            this.reportservice.tableData = this.dataSource;
            // this.dataSource.map(item => {
            //     if (item.Active == 1) { item.Active = 'Active' }
            //     else { item.Active = 'Inactive' }
            // })
        });
    }
    displayedColumns = ['Groupname', 'Groupcode' ,'Status', 'Select'];
        dataSource = ELEMENT_DATA;
      ngOnInit() {
       
    }

   


}
