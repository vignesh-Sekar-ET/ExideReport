/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { reportlistserviceService } from '../../services/reportlistservice/reportlistservice.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import{AllowOnlyNumberDirective}from '../../allow-only-number.directive';

@Component({
    selector: 'bh-reportgroupupdate',
    templateUrl: './reportgroupupdate.template.html'
})

export class reportgroupupdateComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    reportCreateForm: FormGroup;
    datavalue: any;
    state = [
        { value: 'active', viewValue: 'Active' },
        { value: 'inactive', viewValue: 'Inactive' },
    ];


    constructor(private bdms: NDataModelService, private formBuilder: FormBuilder, private reportserviceupdate: reportlistserviceService, private route: Router, private snackBar: MatSnackBar) {
        super();
        this.mm = new ModelMethods(bdms);
    }

    ngOnInit() {
        console.log(this.reportserviceupdate.updatename);

        this.reportCreateForm = this.formBuilder.group({
            reportGroupName: ['', Validators.required],
            reportGroupCode: ['', Validators.required],
            selectStatus: ['', Validators.required]

        });
        // this.reportCreateForm.patchValue({

        // })
        this.reportCreateForm.patchValue({ reportGroupName: this.reportserviceupdate.updatename[0].Groupname }),
            this.reportCreateForm.patchValue({ reportGroupCode: this.reportserviceupdate.updatename[0].GroupCode })
        let updateid = this.reportserviceupdate.updatename[0].id;
        if (this.reportserviceupdate.updatename[0].Active == "InActive") {
            this.reportCreateForm.patchValue({ selectStatus: 'inactive' })
        }
        else if (this.reportserviceupdate.updatename[0].Active == "Active") {
            this.reportCreateForm.patchValue({ selectStatus: 'active' })
        }
    }

    onSubmit() {
        if (this.reportCreateForm.invalid) {
            return;
        }
        else {

            let reportgroupname = this.reportCreateForm.value.reportGroupName;
            let reportgroupcode = this.reportCreateForm.value.reportGroupCode;
            let updateid = this.reportserviceupdate.updatename[0].id;

            if (this.reportCreateForm.value.selectStatus == "active") {
                status = "1"
            }
            else if (this.reportCreateForm.value.selectStatus == "inactive") {
                status = "0"

            }
            this.reportserviceupdate.onSubmit(reportgroupname, reportgroupcode, status, updateid).subscribe(
                (data) => {

                    this.datavalue = data;

                    if (this.datavalue.result) {
                        this.snackBar.open('Report Updated Successfully!!', 'Close', {
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
        this.route.navigateByUrl('/dashboard/reportGroupList');

    }
}


