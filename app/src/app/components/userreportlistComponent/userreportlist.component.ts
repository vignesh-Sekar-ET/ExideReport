/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, ViewChild } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { userdeleteComponent } from '../userdeleteComponent/userdelete.component'
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Columnsetting } from '../../columnsetting';
import { userlistserviceService } from '../../services/userlistservice/userlistservice.service';
import { Observable, of } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
    selector: 'bh-userreportlist',
    templateUrl: './userreportlist.template.html'
})

export class userreportlistComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    userReportList: any;
    updateData: any;
    userupdatename: any;
    userdeleteName: any;



    tablePaginationSettings: Columnsetting = <Columnsetting>{};
    columnDefinition = [];



    constructor(private bdms: NDataModelService, public dialog: MatDialog, public route: Router, private formBuilder: FormBuilder, private userlistservice: userlistserviceService, private snackBar: MatSnackBar) {
        super();
        this.mm = new ModelMethods(bdms);

        this.userlistservice.getJson().subscribe((response) => {
            this.userReportList = response
            this.userReportList.map(item => {
                if (item.Active == 1) { item.Active = 'InActive' }
                else { item.Active = 'Active' }
            })
        });


        this.tablePaginationSettings.enablePagination = true;
        this.tablePaginationSettings.pageSize = 5;
        this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
        this.tablePaginationSettings.showFirstLastButtons = true;
        //Columns Name
        this.columnDefinition = [

            {
                'name': 'Groupname',
                'displayName': 'User Group Name',
                'disableSorting': false,
                'icon': 'face',

            },
            {
                'name': 'GroupCode',
                'displayName': 'User Group Code',
                'disableSorting': false,
                'icon': 'home',
            },

            {
                'name': 'Active',
                'displayName': 'Status',
                'disableSorting': false,
                'icon': 'home',
            },


        ];

    }

    openDialog() {
        if (this.updateData) {
            this.userlistservice.userdeleteName = this.updateData;
            const dialogRef = this.dialog.open(userdeleteComponent, {
                width: '400px'
            });
        }
        else {
            this.snackBar.open('Please Select ReportGroup', 'Close', {
                duration: 3000
            });

        }

    }
    onClickCreate() {
        this.route.navigateByUrl('/dashboard/userCreate');
    }
    onClickUpdate() {
        if (this.updateData) {
            this.userlistservice.userupdatename = this.updateData;
            this.route.navigateByUrl('/dashboard/userUpdate');
        }
        else {

            this.snackBar.open('Please Select UserGroupList!!', 'Close', {
                duration: 3000
            });
        }
    }



    ngOnInit() {

    }
    onNotifySelected(selectedRows: object[]) {
        this.updateData = selectedRows;
    }
}



