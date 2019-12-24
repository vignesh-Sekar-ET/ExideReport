/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, Input, Inject, ViewChild, AfterViewInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { reportgrouplistComponent } from '../reportgrouplistComponent/reportgrouplist.component'
import { reportlistserviceService } from '../../services/reportlistservice/reportlistservice.service';
import { Router } from '@angular/router';
import { NSnackbarService } from 'neutrinos-seed-services';
import { MatTableModule, MatTableDataSource, MatSort, ThemePalette, MatPaginator } from '@angular/material';
import { dashboardService } from '../../services/dashboard/dashboard.service';


export interface DialogData {
    rowid: number;
}


@Component({
    selector: 'bh-reportgroupdelete',
    templateUrl: './reportgroupdelete.template.html'
})

export class reportgroupdeleteComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    datavalue: any;
    @Input() rowData: any = [];
    dataSource: MatTableDataSource<{}>;
    deleterow: any;
    index: any
    constructor(private bdms: NDataModelService, public dialog: MatDialog, private reportListService: reportlistserviceService, private ser: dashboardService, private snackBar: NSnackbarService, private route: Router,
    ) {

        super();
        this.mm = new ModelMethods(bdms);
    }

    ngOnInit() {

    }

    onDeleteClick() {
        this.reportListService.deleteReportGroup()
        this.dialog.closeAll();
        this.snackBar.openSnackBar('Report Deleted Successfully', 2000);
    }


}
