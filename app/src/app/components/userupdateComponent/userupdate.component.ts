/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userlistserviceService } from '../../services/userlistservice/userlistservice.service'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import{AllowOnlyNumberDirective}from '../../allow-only-number.directive';


@Component({
    selector: 'bh-userupdate',
    templateUrl: './userupdate.template.html'
})

export class userupdateComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    reportCreateForm: FormGroup;
    datavalue: any;
    state = [
        { value: 'active', viewValue: 'Active' },
        { value: 'inactive', viewValue: 'Inactive' },
    ];


    constructor(private bdms: NDataModelService, private formBuilder: FormBuilder, private userUpdate: userlistserviceService, private route: Router, private snackBar: MatSnackBar) {
        super();
        this.mm = new ModelMethods(bdms);
    }

    ngOnInit() {
        console.log(this.userUpdate.userupdatename);

        this.reportCreateForm = this.formBuilder.group({
            userGroupName: ['', Validators.required],
            userGroupCode: ['', Validators.required],
            selectStatus: ['', Validators.required]

        });
        // this.reportCreateForm.patchValue({

        // })
        this.reportCreateForm.patchValue({ userGroupName: this.userUpdate.userupdatename[0].Groupname }),
            this.reportCreateForm.patchValue({ userGroupCode: this.userUpdate.userupdatename[0].GroupCode })
        let updateid = this.userUpdate.userupdatename[0].id;
        if (this.userUpdate.userupdatename[0].Active == "InActive") {
            this.reportCreateForm.patchValue({ selectStatus: 'inactive' })
        }
        else if (this.userUpdate.userupdatename[0].Active =="Active") {
            this.reportCreateForm.patchValue({ selectStatus: 'active' })
        }


    }

    onSubmit() {
        if (this.reportCreateForm.invalid) {
            return;
        }
        else {

            let usergroupname = this.reportCreateForm.value.userGroupName;
            let usergroupcode = this.reportCreateForm.value.userGroupCode;
            let userupdateid = this.userUpdate.userupdatename[0].id;

            if (this.reportCreateForm.value.selectStatus == "active") {
                status = "0"
            }
            else if (this.reportCreateForm.value.selectStatus == "inactive") {
                status = "1"

            }
            this.userUpdate.onUpdateSubmit(usergroupname, usergroupcode, status, userupdateid).subscribe(
                (data) => {

                    this.datavalue = data;

                    if (this.datavalue.result) {
                        this.snackBar.open('User Updated Successfully!!', 'Close', {
                            duration: 3000
                        });
                        this.route.navigateByUrl('/dashboard/createuserlist');

                    }
                    else {
                        console.log("fail");

                    };
                },
                (err) => console.log(err));
        }

    }



    onCancel() {
        this.route.navigateByUrl('/dashboard/createuserlist');

    }
}


