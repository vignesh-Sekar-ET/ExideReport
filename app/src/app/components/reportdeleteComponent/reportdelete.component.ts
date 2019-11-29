/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import{reportlistComponent} from '../reportlistComponent/reportlist.component'



@Component({
    selector: 'bh-reportdelete',
    templateUrl: './reportdelete.template.html'
})

export class reportdeleteComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;

    constructor(private bdms: NDataModelService,private dialog: MatDialog
    ) {
        super();
        this.mm = new ModelMethods(bdms);
    }
      onNoClick(): void {
          this.dialog.closeAll();
          
  }
       ngOnInit() {

    }

   

}
