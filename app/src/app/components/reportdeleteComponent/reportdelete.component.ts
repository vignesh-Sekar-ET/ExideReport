/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import{reportlistComponent} from '../reportlistComponent/reportlist.component';
import{reportlistserviceService} from'../../services/reportlistservice/reportlistservice.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Location } from '@angular/common';







@Component({
    selector: 'bh-reportdelete',
    templateUrl: './reportdelete.template.html'
})

export class reportdeleteComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    datavalue:any;

    constructor(private bdms: NDataModelService,private dialog: MatDialog,private reportListService:reportlistserviceService,private snackBar: MatSnackBar,private route:Router,private location: Location
    ) {
        super();
        this.mm = new ModelMethods(bdms);
    }
      onNoClick(): void {
          this.dialog.closeAll();
          
  }
       ngOnInit() {

    }

    onDeleteClick(){
    // let deleteid=this.reportListService.deleteName[0].id;
    //    this.reportListService.onDeleteClick(deleteid).subscribe(
    //             (data) => {
                   
    //                  this.datavalue = data;

    //                 if (this.datavalue.result) {
    //                     this.snackBar.open('Report Deleted Successfully!!', 'Close', {
    //                       duration: 3000
    //                       });
    //                       this.route.navigateByUrl('/dashboard/reportList');
    //                          location.reload();
    //                       this.dialog.closeAll();


    //                 }
    //                 else {
    //                     console.log("fail");

    //                 }; 
    //             },
    //             (err) => console.log(err));

    }

   

}
