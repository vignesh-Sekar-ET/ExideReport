/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, ViewChild } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Columnsetting } from '../../columnsetting';
import { dashboardService } from '../../services/dashboard/dashboard.service';
import { Router } from '@angular/router';

@Component({
    selector: 'bh-reportgrouplist',
    templateUrl: './reportgrouplist.template.html'
})

export class reportgrouplistComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    updateDb: any;
    UpdateLabel: string = "Update";
    rowData: any = [];

    tablePaginationSettings: Columnsetting = <Columnsetting>{};
    columnDefinition = [];

    constructor(private bdms: NDataModelService, private ser: dashboardService, private route: Router) {
        super();
        this.mm = new ModelMethods(bdms);
        this.tablePaginationSettings.enablePagination = true;
        this.tablePaginationSettings.pageSize = 5;
        this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
        this.tablePaginationSettings.showFirstLastButtons = true;
        //Columns Name
        this.columnDefinition = [
            {
                'name': 'JNDI',
                'displayName': 'jndiname',
                'disableSorting': false,
            },
            {
                'name': 'ServerIP',
                'displayName': 'serverip',
                'disableSorting': false,
                'icon': 'face'

            },
            {
                'name': 'PortNumber',
                'displayName': 'portno',
                'disableSorting': false,
                'icon': 'home'
            },
            {
                'name': 'DBName',
                'displayName': 'dbname',
                'disableSorting': false,
                'icon': 'face'
            },
            {
                'name': 'DriveType',
                'displayName': 'drivertype',
                'disableSorting': false,
                'icon': 'face'
            },
            {
                'name': 'PoolSize',
                'displayName': 'poolsize',
                'disableSorting': false,
                'icon': 'face'
            },
            {
                'name': 'UserName',
                'displayName': 'dbuser',
                'disableSorting': false,
                'icon': 'face'
            },
            {
                'name': 'Active',
                'displayName': 'status',
                'disableSorting': false,
                'icon': 'face'
            }
        ];
    }

    ngOnInit() {
        // console.log(this.rowData);
        // console.log(this.ser.getConfigListGet())
        this.updateDbconfig(event);
        this.ser.getConfigListGet().subscribe(data => {  this.rowData = data; })
    }
    onNotifySelected(selectedRows: object[]) {
        console.log(selectedRows);
        this.updateDb = selectedRows;
    }
    updateDbconfig(event) {
        if (event == "Update") {
            this.ser.dbconfigupdate = this.updateDb;
            this.route.navigateByUrl('dashboard/dbconfigUpdate');
        }

    }
    // updateDbconfig(event) {
    //     if (event == "Update") {
    //         if (this.ser.updateVal == false) {
    //             this.ser.dbconfigupdate = this.updateDb;
    //             this.route.navigateByUrl('dashboard/dbconfigUpdate');
    //         }
    //         else {
    //             console.log(this.ser.updateVal)
    //             for (let i = 0; i < this.rowData.length; i++) {
    //                 if (i == this.ser.dbconfigupdate.index) {
    //                     this.rowData[i] = this.ser.dbconfigupdate.row[0]
    //                 }
    //             }
    //         }
    //     }
    //     if (this.ser.updateVal == true) {
    //         for (let i = 0; i < this.rowData.length; i++) {
    //             if (i == this.ser.dbconfigupdate.index) {
    //                 console.log("sample");
    //                 this.rowData[i] = this.ser.dbconfigupdate.row[0];
    //             }
    //         }
    //     }

    // }

    dbconfigCreate() {
        this.route.navigateByUrl('dashboard/dbconfigCreate');
    }
}



