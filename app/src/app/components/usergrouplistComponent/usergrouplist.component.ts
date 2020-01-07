/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NSnackbarService } from 'neutrinos-seed-services';
import { Columnsetting } from '../../columnsetting';
import { Router } from '@angular/router';
import { dashboardService } from '../../services/dashboard/dashboard.service';
import { tablepaginationserviceService } from '../../services/tablepaginationservice/tablepaginationservice.service'
import { mappingserviceService } from '../../services/mappingservice/mappingservice.service';



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


@Component({
    selector: 'bh-usergrouplist',
    templateUrl: './usergrouplist.template.html'
})
export class usergrouplistComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    rowData: any;
    tablePaginationSettings: Columnsetting = <Columnsetting>{};
    columnDefinition = [];
    action: string;

    seasons: string[] = ['Yes', 'No'];
    dbData = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ]
    constructor(private bdms: NDataModelService, private tService: tablepaginationserviceService, private formBuilder: FormBuilder,
        private _snackBar: NSnackbarService, private ser: dashboardService, private route: Router, private mappingservice: mappingserviceService) {
        super();
        this.mm = new ModelMethods(bdms);
        this.tablePaginationSettings.enablePagination = true;
        this.tablePaginationSettings.pageSize = 5;
        this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
        this.tablePaginationSettings.showFirstLastButtons = true;

        //Columns Name
        this.columnDefinition = [
            {
                'name': 'UserGroup',
                'displayName': 'User Group',
                'disableSorting': false,
            },
            {
                'name': 'Groupname',
                'displayName': 'Report Group',
                'disableSorting': false,
                'icon': 'face'
            }
        ];
    }

    ngOnInit() {
        this.tService.disableCreateButton = false; //disable create button 
        this.mappingservice.getuserGroupmapping().subscribe((data) => {
            this.rowData = data;
            this.getValueOutside();
        })
    }


    //snackbar 
    openSnackBar() {
        this._snackBar.openSnackBar(this.action, 2000);
    }

    // convenience getter for easy access to form fields
    // get f() { return this.dbConfigForm.controls; }

    onNotifySelected(selectedRows: object[]) {
        this.ser.getTableValue = selectedRows;
    }
    getValueOutside() {
        console.log(this.rowData)
    }
    //getting update and create label
    onClick(label) {
        console.log(label)
        this.ser.dbConfigLabelCreateUpdate = label;
        if ((this.ser.dbConfigLabelCreateUpdate == 'Update') && (this.tService.disableCreateButton == false)) {
            // console.log(this.tService.dbconfigcreateDisablebutton)
            this.action = 'Please select user group list';
            this.openSnackBar();
        }
        else {
            this.route.navigateByUrl('dashboard/userGroupmappingCreate');
        }

    }
}
