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
    rowData:any;
    tablePaginationSettings: Columnsetting = <Columnsetting>{};
    columnDefinition = [];
    constructor(private bdms: NDataModelService, private route: Router, private ser: dashboardService) {
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
        this.ser.getConfigListGet().subscribe(
            data => {
                console.log(data)
                this.rowData = data;
                this.rowData.map(item => {
                    if(item.isactive === 1){
                        item.isactive = "Yes";
                    }
                    else{
                        item.isactive = "No";
                    }
                })

                this.getValueOutside()
            }
        )
    }

    onNotifySelected(selectedRows: object[]) {
        this.ser.dbconfigupdate = selectedRows;

    }
    onClick(label) {
        console.log(label)
        this.ser.dbConfigLabelCreateUpdate = label;
        if (this.ser.dbConfigLabelCreateUpdate) {
            this.route.navigateByUrl('dashboard/dbconfigCreate');
        }
    }
    getValueOutside(){
        console.log(this.rowData)
    }
}
