/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, ViewChild } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { reportgroupdeleteComponent } from '../reportgroupdeleteComponent/reportgroupdelete.component';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Columnsetting } from '../../columnsetting';
import { reportlistserviceService } from '../../services/reportlistservice/reportlistservice.service';
import { Observable, of } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { userdeleteComponent } from '../userdeleteComponent/userdelete.component'



@Component({
    selector: 'bh-reportgrouplist',
    templateUrl: './reportgrouplist.template.html'
})

export class reportgrouplistComponent extends NBaseComponent implements OnInit {
  mm: ModelMethods;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  testContent: any;
  updateData: any;
  updatename: any;

  tablePaginationSettings: Columnsetting = <Columnsetting>{};
  columnDefinition = [];



  constructor(private bdms: NDataModelService, public dialog: MatDialog, public route: Router, private formBuilder: FormBuilder, private reportservice: reportlistserviceService, private snackBar: MatSnackBar) {
    super();
    this.mm = new ModelMethods(bdms);

    /* Getting response from server setting the value in testcontent data variable*/
    this.reportservice.getJson().subscribe((response) => {
      this.testContent = response;

      /* Getting all array value and checking the particular field*/
      this.testContent.map(item => {
        if (item.Active == 1) { item.Active = 'InActive' }
        else { item.Active = 'Active' }
      })
      /* Ends*/

    });
    this.tablePaginationSettings.enablePagination = true;
    this.tablePaginationSettings.pageSize = 5;
    this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
    this.tablePaginationSettings.showFirstLastButtons = true;
    //Columns Name
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
  /* Click fn for delete component*/
  
  openDialog() {
    if(this.updateData){
    this.reportservice.deleteName = this.updateData;
    const dialogRef = this.dialog.open(reportgroupdeleteComponent, {
      width: '400px'
    });
    }
    else{
       this.snackBar.open('Please Select ReportGroup', 'Close', {
        duration: 3000
      });
    }
    
  }
  /* Ends*/


  /* Click fn for create component*/
  onClickCreate() {
    this.route.navigateByUrl('/dashboard/reportCreate');
  }

  /* Ends */

  /* Click fn for Update component*/
  onClickUpdate() {
    if (this.updateData) {
      this.reportservice.updatename = this.updateData;
      this.route.navigateByUrl('/dashboard/reportUpdate');
    }
    else {
      this.snackBar.open('Please Select ReportGroup', 'Close', {
        duration: 3000
      });

    }

  }
  /* Ends*/

  ngOnInit() {


  }
  /* Getting each row data in table*/
  onNotifySelected(selectedRows: object[]) {
    this.updateData = selectedRows;
    console.log(this.updateData);

  }
  /* Ends */
}



