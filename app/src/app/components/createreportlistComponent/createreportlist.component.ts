/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, ViewChild } from '@angular/core'

import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Columnsetting } from '../../columnsetting';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { reportcreateserviceService } from '../../services/reportcreateservice/reportcreateservice.service';


@Component({
    selector: 'bh-createreportlist',
    templateUrl: './createreportlist.template.html'
})

export class createreportlistComponent implements OnInit {

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    testContent: any;
    updateData: any;
    updatename: any;

    tablePaginationSettings: Columnsetting = <Columnsetting>{};
    columnDefinition = [];

    constructor(public route: Router, private snackBar: MatSnackBar, private reportservice: reportcreateserviceService) {

        this.reportservice.reportlist().subscribe((response) => {
            this.testContent = response;
            console.log(this.testContent);

            this.testContent.map(item => {
                if (item.querytype == 'q') { item.querytype = 'Query' }
                else { item.querytype = 'Store Procedure' }
            })
        });
        this.tablePaginationSettings.enablePagination = true;
        this.tablePaginationSettings.pageSize = 5;
        this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
        this.tablePaginationSettings.showFirstLastButtons = true;

        this.columnDefinition = [

            {
                'name': 'ReportName',
                'displayName': 'Report Name',
                'disableSorting': false,
                'icon': 'face',

            },
            {
                'name': 'GroupCode',
                'displayName': 'Report Group',
                'disableSorting': false,
                'icon': 'home',
            },
            {
                'name': 'querytype',
                'displayName': 'Query Type',
                'disableSorting': false,
                'icon': 'home',
            },
            {
                'name': 'tablename',
                'displayName': 'Parameter Table Name',
                'disableSorting': false,
                'icon': 'home',
            },

        ];
    }

    ngOnInit() {

    }


    reportcreate() {
        this.route.navigateByUrl('/dashboard/createreport');
    }


}