/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, ViewChild, Inject } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
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
import { NSnackbarService } from 'neutrinos-seed-services';
import { reportgroupdeleteComponent } from '../reportgroupdeleteComponent/reportgroupdelete.component';
import { dashboardService } from '../../services/dashboard/dashboard.service';

@Component({
    selector: 'bh-reportgrouplist',
    templateUrl: './reportgrouplist.template.html'
})

export class reportgrouplistComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    updateData: any;
    updatename: any;
    tablePaginationSettings: Columnsetting = <Columnsetting>{};
    columnDefinition = [];
    constructor(private bdms: NDataModelService, public dialog: MatDialog, public route: Router, 
    private formBuilder: FormBuilder, public reportservice: reportlistserviceService, private snackBar: NSnackbarService) {
        super();
        this.mm = new ModelMethods(bdms);
           this.refreshingtabledata();
        this.tablePaginationSettings.enablePagination = true;
        this.tablePaginationSettings.pageSize = 5;
        this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
        this.tablePaginationSettings.showFirstLastButtons = true;
        this.columnDefinition = [

            {
                'name': 'Groupname',
                'displayName': 'Groupname',
                'disableSorting': false,
                'icon': 'face',

            },
            {
                'name': 'GroupCode',
                'displayName': 'GroupCode',
                'disableSorting': false,
                'icon': 'home',
            },
            {
                'name': 'Active',
                'displayName': 'Status',
                'disableSorting': false,
                'icon': 'home',
            }

        ];

    }


    ngOnInit() {
}
    onClickCreate() {
        this.reportservice.changecomp = "create";
        this.route.navigateByUrl('/dashboard/reportCreate');
    }
    onClickUpdate() {
        this.reportservice.changecomp = "update";
        if (this.updateData) {
            this.reportservice.updatename = this.updateData;
            this.route.navigateByUrl('/dashboard/reportCreate');
        }
        else {
            this.snackBar.openSnackBar('Please Select ReportGroup', 2000);

        }
    }
    openDialog() {
        if (this.updateData) {
            this.reportservice.deleteName = this.updateData;
            const dialogRef = this.dialog.open(reportgroupdeleteComponent, {
                width: '400px',
            });

        }
        else {
            this.snackBar.openSnackBar('Please Select ReportGroup', 2000);

        }
    }

    onNotifySelected(selectedRows: object[], i) {
        this.updateData = selectedRows;
    }

    refreshingtabledata() {
     this.reportservice.getReportGroupList();
    }
}



