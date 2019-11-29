/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, ViewChild } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { reportdeleteComponent } from '../reportdeleteComponent/reportdelete.component';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Columnsetting } from '../../columnsetting';
import{reportlistserviceService} from'../../services/reportlistservice/reportlistservice.service';
import { Observable, of } from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'bh-reportlist',
  templateUrl: './reportlist.template.html'
})

export class reportlistComponent extends NBaseComponent implements OnInit {
  mm: ModelMethods;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  testContent: any;
  updateData :any;
  updatename:any;



    tablePaginationSettings: Columnsetting = <Columnsetting>{};
    columnDefinition = [];

  

  constructor(private bdms: NDataModelService, public dialog: MatDialog, public route: Router, private formBuilder:FormBuilder,private reportservice:reportlistserviceService,private snackBar: MatSnackBar) {
    super();
    this.mm = new ModelMethods(bdms);
    
    this.reportservice.getJson().subscribe((response) => {
      console.log(response);
      this.testContent = response
 });


    this.tablePaginationSettings.enablePagination = true;
        this.tablePaginationSettings.pageSize = 5;
        this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
        this.tablePaginationSettings.showFirstLastButtons = true;
        //Columns Name
        this.columnDefinition = [
            {
                'name': 'id',
                'displayName': 'id',
                'disableSorting': false,
                'icon': 'face',
                'formcontrol':'jndc'
            },
            {
                'name': 'Groupname',
                'displayName': 'Groupname',
                'disableSorting': false,
                'icon': 'face',
                'formcontrol':'jndc1'

            },
            {
                'name': 'GroupCode',
                'displayName': 'GroupCode',
                'disableSorting': false,
                'icon': 'home',
                'formcontrol':'jndc2'
            }
           
        ];

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(reportdeleteComponent, {
      width: '400px'
    });
  }
  onClickCreate() {
    this.route.navigateByUrl('/dashboard/reportCreate');
  }
  onClickUpdate(event) {
      if(this.updateData){
      this.reportservice.updatename=this.updateData;
      this.route.navigateByUrl('/dashboard/reportUpdate');
      }
      else{

    //   this.snackBar.open('Please Select');
   this.snackBar.open('Please Select ReportGroup', 'Close', {
  duration: 3000
});
   
    }
   

  }



  ngOnInit() {
  
 }
 onNotifySelected(selectedRows :object[]){
  this.updateData = selectedRows;   
 }
}



