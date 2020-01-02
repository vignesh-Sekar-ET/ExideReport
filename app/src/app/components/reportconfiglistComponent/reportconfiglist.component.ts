/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, ViewChild } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Columnsetting } from '../../columnsetting';
import { reportconfigserviceService } from '../../services/reportconfigservice/reportconfigservice.service';
import { NSnackbarService } from 'neutrinos-seed-services';



@Component({
    selector: 'bh-reportconfiglist',
    templateUrl: './reportconfiglist.template.html'
})

export class reportconfiglistComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    updateData:any;
    tablePaginationSettings: Columnsetting = <Columnsetting>{};
    columnDefinition = [];
    constructor(private bdms: NDataModelService, public dialog: MatDialog, public route: Router, private formBuilder: FormBuilder, public reportConfigService: reportconfigserviceService,private snackBar: NSnackbarService) {
        super();
        this.mm = new ModelMethods(bdms);
        this.ReportConfigList();
        this.tablePaginationSettings.enablePagination = true;
        this.tablePaginationSettings.pageSize = 5;
        this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
        this.tablePaginationSettings.showFirstLastButtons = true;
        this.columnDefinition = [
            {
                'name': 'ReportName',
                'displayName': 'Report Name',
                'disableSorting': false,
                'formcontrol': 'jndc'
            },
            {
                'name': 'starttime',
                'displayName': 'Execution Srt Time',
                'disableSorting': false,
                'icon': 'face',
                'formcontrol': 'jndc1'

            },
            {
                'name': 'endtime',
                'displayName': 'Execution End Time',
                'disableSorting': false,
                'icon': 'home',
                'formcontrol': 'jndc2'
            },
            {
                'name': 'isdownloadable',
                'displayName': 'Downloadable',
                'disableSorting': false,
                'icon': 'face',
                'formcontrol': 'jndc3'
            },
            {
                'name': 'issubscribe',
                'displayName': 'Subscribe',
                'disableSorting': false,
                'icon': 'face',
                'formcontrol': 'jndc3'
            },
             {
                'name': 'status',
                'displayName': 'Status',
                'disableSorting': false,
                'icon': 'face',
                'formcontrol': 'jndc3'
            },


        ];

    }
   ngOnInit() {

    }
     Create() {
        this.reportConfigService.changecomp = 'create';
        this.route.navigateByUrl('/dashboard/reportConfigCreate');

    }
     Update() {
        if (this.updateData) {
            this.reportConfigService.changecomp = 'update';
             this.reportConfigService.updatename = this.updateData;
             this.route.navigateByUrl('/dashboard/reportConfigCreate');

        }
        else {
            this.snackBar.openSnackBar('Please Select ReportConfigList', 2000);

        }
    }
     selectTablerowData(selectedRows: object[], i) {
        this.updateData = selectedRows;
    }
    
    ReportConfigList(){
    this.reportConfigService.getReportConfigList();
  }
}



