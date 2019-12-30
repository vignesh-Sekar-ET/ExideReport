/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, ViewChild } from '@angular/core'
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

@Component({
    selector: 'bh-reportconfiglist',
    templateUrl: './reportconfiglist.template.html'
})

export class reportconfiglistComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    // @ViewChild(MatSort, { static: true }) sort: MatSort;
    // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    // rowData = [
    //     { jndiname: 'Report1', serverip: '9PM', portno: '10PM', dbname: 'H', downloadable: 'yes' },
    //     { jndiname: 'Report2 ', serverip: '9PM', portno: '10PM', dbname: 'He', downloadable: 'yes' },
    //     { jndiname: 'Report3', serverip: '9PM', portno: '10AM', dbname: 'Li', downloadable: 'yes' },
    //     { jndiname: 'Report4', serverip: '9PM', portno: '10AM', dbname: 'Li', downloadable: 'yes' },
    //     { jndiname: 'Report5', serverip: '9PM', portno: '10AM', dbname: 'Li', downloadable: 'yes' }]


    tablePaginationSettings: Columnsetting = <Columnsetting>{};
    columnDefinition = [];
    constructor(private bdms: NDataModelService, public dialog: MatDialog, public route: Router, private formBuilder: FormBuilder) {
        super();
        this.mm = new ModelMethods(bdms);
        this.tablePaginationSettings.enablePagination = true;
        this.tablePaginationSettings.pageSize = 5;
        this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
        this.tablePaginationSettings.showFirstLastButtons = true;
        this.columnDefinition = [
            {
                'name': 'jndiname',
                'displayName': 'Report Name',
                'disableSorting': false,
                'formcontrol': 'jndc'
            },
            {
                'name': 'serverip',
                'displayName': 'Excution Start Time',
                'disableSorting': false,
                'icon': 'face',
                'formcontrol': 'jndc1'

            },
            {
                'name': 'portno',
                'displayName': 'Excution End Time',
                'disableSorting': false,
                'icon': 'home',
                'formcontrol': 'jndc2'
            },
            {
                'name': 'downloadable',
                'displayName': 'Downloable',
                'disableSorting': false,
                'icon': 'face',
                'formcontrol': 'jndc3'
            },


        ];

    }

    // openDialog(): void {
    //     const dialogRef = this.dialog.open(reportdeleteComponent, {
    //         width: '400px'
    //     });
    // }
    onClickCreate() {
        this.route.navigateByUrl('/dashboard/reportConfigCreate');
    }



    ngOnInit() {

    }
}



