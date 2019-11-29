/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { reportcreateserviceService } from '../../services/reportcreateservice/reportcreateservice.service'
import 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';




@Component({
    selector: 'bh-reportcreate',
    templateUrl: './reportcreate.template.html'
})


export class reportcreateComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    reportCreateForm: FormGroup;
    status: any;
    datavalue: any;

    state = [
        { value: 'active', viewValue: 'Active' },
        { value: 'inactive', viewValue: 'Inactive' },
    ];

    constructor(private bdms: NDataModelService, private formBuilder: FormBuilder, private CreateService: reportcreateserviceService,private route:Router,private snackBar: MatSnackBar) {
        super();
        this.dm = new ModelMethods(bdms);
    }

    ngOnInit() {
        this.reportCreateForm = this.formBuilder.group({
            reportGroupName: ['', Validators.required],
            reportGroupCode: ['', Validators.required],
            selectStatus: ['active', Validators.required]

        });

    }

    onSubmit() {
        if (this.reportCreateForm.invalid) {
            return;
        }
        else {

            let reportgroupname = this.reportCreateForm.value.reportGroupName;
            let reportgroupcode = this.reportCreateForm.value.reportGroupCode;
            if (this.reportCreateForm.value.selectStatus == "active") {
                status = "1"
            }
            else if (this.reportCreateForm.value.selectStatus == "inactive") {
                status = "0"

            }
            this.CreateService.onSubmit(reportgroupname, reportgroupcode, status).subscribe(
                (data) => {

                    this.datavalue = data;
                    console.log(this.datavalue.result);

                    if (this.datavalue.result) {
                          this.snackBar.open('Report Created Successfully!!', 'Close', {
                          duration: 3000
                          });
                       
                        this.route.navigateByUrl('/dashboard/reportList');

                    }
                    else {
                        console.log("fail");

                    };
                },
                (err) => console.log(err));







        }
    }

    onCancel() {
         this.route.navigateByUrl('/dashboard/reportList');

    }






}
