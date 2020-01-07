/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Columnsetting } from '../../columnsetting';
import { Router } from '@angular/router';
import { dashboardService } from '../../services/dashboard/dashboard.service';
import { tablepaginationserviceService } from '../../services/tablepaginationservice/tablepaginationservice.service'
import { NSnackbarService } from 'neutrinos-seed-services';

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
    selector: 'bh-dbconfiglist',
    templateUrl: './dbconfiglist.template.html'
})

export class dbconfiglistComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    rowData: any;
    tablePaginationSettings: Columnsetting = <Columnsetting>{};
    columnDefinition = [];
    action: string;
    constructor(private bdms: NDataModelService, private snackBar: NSnackbarService, private route: Router, 
    private ser: dashboardService, private tService: tablepaginationserviceService) {
        super();
        this.mm = new ModelMethods(bdms);
        this.tablePaginationSettings.enablePagination = true;
        this.tablePaginationSettings.pageSize = 5;
        this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
        this.tablePaginationSettings.showFirstLastButtons = true;

        //Columns Name
        this.columnDefinition = [
            {
                'name': 'JNDIName',
                'displayName': 'JNDI Name',
                'disableSorting': false,
            },
            {
                'name': 'db',
                'displayName': 'Driver Type',
                'disableSorting': false,
                'icon': 'face'
            },
            {
                'name': 'isactive',
                'displayName': 'Status',
                'disableSorting': false,
                'icon': 'face'
            }
        ];

    }

    ngOnInit() {
        this.tService.disableCreateButton = false; //disable create button 
        this.ser.getConfigListGet().subscribe(
            data => {
                console.log(data)
                this.rowData = data;
                this.rowData.map(item => {
                    if (item.isactive === 1) {
                        item.isactive = "Yes";
                    }
                    else {
                        item.isactive = "No";
                    }
                })

                this.getValueOutside()
            }
        )
    }

    onNotifySelected(selectedRows: object[]) {
        this.ser.getTableValue = selectedRows;
    }
    onClick(label) {
        console.log(label)
        this.ser.dbConfigLabelCreateUpdate = label;
        if ((this.ser.dbConfigLabelCreateUpdate == 'Update') && (this.tService.disableCreateButton == false)) {
            // console.log(this.tService.dbconfigcreateDisablebutton)
            this.action = 'Please select dbconfiguration list';
            this.openSnackBar();
        }
        else {
            this.route.navigateByUrl('dashboard/dbconfigCreate');
        }

    }
    getValueOutside() {
        console.log(this.rowData)
    }
    openSnackBar() {
        this.snackBar.openSnackBar(this.action, 2000);
    }
}
