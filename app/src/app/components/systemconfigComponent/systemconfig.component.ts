/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NSnackbarService } from 'neutrinos-seed-services';
import { AllowOnlyNumberDirective } from '../../allow-only-number.directive';
import { systemconfigserviceService } from '../../services/systemconfigservice/systemconfigservice.service';



@Component({
    selector: 'bh-systemconfig',
    templateUrl: './systemconfig.template.html'
})

export class systemconfigComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    systemConfigForm: FormGroup;
    data: any = [];
    buttonhide:boolean = false;
    
    state = [
        { value: 'active', viewValue: 'Active' },
        { value: 'inactive', viewValue: 'InActive' },
    ];

    constructor(private bdms: NDataModelService, private formBuilder: FormBuilder, private route: Router, private systemconfigservice: systemconfigserviceService, private snackBar: NSnackbarService) {
        super();
        this.mm = new ModelMethods(bdms);
        this.systemconfigservice.changecomp = 'create'
        this.systemconfigservice.getSystemConfig().subscribe((response) => {
            this.data = response;
            this.getsystemlist();
            this.systemConfigForm.disable();
        });

    }

    ngOnInit() {
        this.systemConfigForm = this.formBuilder.group({
            systemMaxTimeout: ['', Validators.required],
            systemMaxRecordOutput: ['', Validators.required],
            selectStatus: ['', Validators.required]

        });


    }

    getsystemlist() {
        this.systemConfigForm.patchValue({ systemMaxTimeout: this.data[0].max_timeout });
        this.systemConfigForm.patchValue({ systemMaxRecordOutput: this.data[0].max_rec_out });
        if (this.data[0].Active == 0) {
            this.systemConfigForm.patchValue({ selectStatus: 'InActive' })
        }
        else if (this.data[0].Active == 1) {
            this.systemConfigForm.patchValue({ selectStatus: 'active' })
        }


    }
    update(){
            this.systemConfigForm.enable();
            this.buttonhide=true;
    }
    Submit(){
         
            if (this.systemConfigForm.invalid) {
                return;
            }
            else {
                let systemMaxTimeout = parseInt(this.systemConfigForm.value.systemMaxTimeout);
                let systemRecordoutput = parseInt(this.systemConfigForm.value.systemMaxRecordOutput);
                let status = parseInt(this.systemConfigForm.value.selectStatus == 'active' ? "1" : "0");
                let configId=this.data[0].config_id;
                this.systemconfigservice.systemConfigUpdate(systemMaxTimeout, systemRecordoutput, status,configId).subscribe(
                    (data) => {
                        this.snackBar.openSnackBar('Systemconfig Updated Successfully', 2000);

                    },
                    (err) => console.log(err));

            }
        }
        reset(){
        }


    }





   
