/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { userreportlistComponent } from '../userreportlistComponent/userreportlist.component'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { userlistserviceService } from '../../services/userlistservice/userlistservice.service'


@Component({
    selector: 'bh-userdelete',
    templateUrl: './userdelete.template.html'

})

export class userdeleteComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    datavalue: any;
  


    constructor(private bdms: NDataModelService, private dialog: MatDialog, private userDelete: userlistserviceService, private snackBar: MatSnackBar, private route: Router, private location: Location
    ) {
        super();
        this.mm = new ModelMethods(bdms);
    }
    onNoClick(): void {
        this.dialog.closeAll();

    }
    ngOnInit() {

    }

    onDeleteClick() {
        let deleteid = this.userDelete.userdeleteName[0].id;

        console.log(deleteid);
        this.userDelete.onDeleteClick(deleteid).subscribe(
            (data) => {

                this.datavalue = data;
                

                if (this.datavalue.result) {
                    this.snackBar.open('User Report Deleted Successfully!!', 'Close', {
                        duration: 3000
                    });
                    this.route.navigateByUrl('/dashboard/userReportList');
                    // location.reload();
                    this.dialog.closeAll();
                    this.ngOnInit();
                    
                    }
                else {
                    console.log("fail");

                };
            },
            (err) => console.log(err));

    }



}
