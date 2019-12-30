/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { reportcreateserviceService } from '../../services/reportcreateservice/reportcreateservice.service';
import { reportlistserviceService } from '../../services/reportlistservice/reportlistservice.service';
import 'rxjs';
import  {NSnackbarService} from 'neutrinos-seed-services';
import { AllowOnlyNumberDirective } from '../../allow-only-number.directive';
@Component({
    selector: 'bh-reportgroupcreate',
    templateUrl: './reportgroupcreate.template.html'
})
export class reportgroupcreateComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    reportCreateForm: FormGroup;
    status: any;
    title:String;
    state = [
        { value: 'active', viewValue: 'Active' },
        { value: 'InActive', viewValue: 'InActive' },
    ];
    constructor(private bdms: NDataModelService, private formBuilder: FormBuilder, private reportserviceupdate: reportlistserviceService, private CreateService: reportcreateserviceService, private route: Router, private snackBar: NSnackbarService) {
        super();
        this.dm = new ModelMethods(bdms);
        this.title='Report Group - Create'
        
    }

    ngOnInit() {
        this.reportCreateForm = this.formBuilder.group({
            reportGroupName: ['', Validators.required],
            reportGroupCode: ['', Validators.required],
            selectStatus: ['active', Validators.required]

        });
        if (this.reportserviceupdate.changecomp == "update") {
             this.title='Report Group - Update';
             this.reportCreateForm.patchValue({ reportGroupName: this.reportserviceupdate.updatename[0].Groupname }),
            this.reportCreateForm.patchValue({ reportGroupCode: this.reportserviceupdate.updatename[0].GroupCode })
            let updateid = this.reportserviceupdate.updatename[0].id;
            if (this.reportserviceupdate.updatename[0].Active == "Inactive") {
               this.reportCreateForm.patchValue({ selectStatus: 'InActive' })
            }
            else if (this.reportserviceupdate.updatename[0].Active == "Active") {
                this.reportCreateForm.patchValue({ selectStatus: 'active' })
            }
        }

    }
    onSubmit() {
        if (this.reportserviceupdate.changecomp == "create") {
            if (this.reportCreateForm.invalid) {
                return;
            }
            else {
                let reportgroupname = this.reportCreateForm.value.reportGroupName;
                let reportgroupcode = this.reportCreateForm.value.reportGroupCode;
                let status = this.reportCreateForm.value.selectStatus == 'active' ? "1" : "0";
                this.CreateService.onSubmit(reportgroupname, reportgroupcode, status).subscribe(
                    (data) => {
                       this.snackBar.openSnackBar('Report Created Successfully', 2000);
                       this.route.navigateByUrl('/dashboard/reportgrouplist');

                    },
                    (err) => console.log(err));

            }

        }
        else if (this.reportserviceupdate.changecomp == "update") {
            if (this.reportCreateForm.invalid) {
                return;
            }
            else {
                let reportgroupname = this.reportCreateForm.value.reportGroupName;
                let reportgroupcode = this.reportCreateForm.value.reportGroupCode;
                let updateid = this.reportserviceupdate.updatename[0].id;
                let status = this.reportCreateForm.value.selectStatus == 'active' ? "1" : "0";
                this.reportserviceupdate.onSubmit(reportgroupname, reportgroupcode, status, updateid).subscribe(
                    (data) => {
                     this.snackBar.openSnackBar('Report Updated successfully', 2000);

                        this.route.navigateByUrl('/dashboard/reportgrouplist');
                    },
                    (err) => console.log(err));
            }
        }
 }
}

