/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, ElementRef, AfterContentInit, Renderer, Directive, DoCheck, Input } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dashboardService } from '../../services/dashboard/dashboard.service';
import { Router } from '@angular/router';
import { NSnackbarService } from 'neutrinos-seed-services';
/**
 * Service import Example :
 * import { HeroService } from '../../services/hero/hero.service';
 */

/**
* 
* Serivice Designer import Example - Service Name - HeroService
* import { HeroService } from 'app/sd-services/HeroService';
*/
// @Directive({ selector: '[inputfocus]' })
@Component({
    selector: 'bh-dbconfigcreate',
    templateUrl: './dbconfigcreate.template.html'
})

export class dbconfigcreateComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    dbConfigForm: FormGroup;
    submitted = false;
    Dbresponse: any;
    action: string;
    seasons: any = [
        { value: 0, viewValue: 'Yes' },
        { value: 1, viewValue: 'No' }
    ];
    dbData = [
        { value: 'mssql', viewValue: 'MSSQL' },
        { value: 'sql', viewValue: 'SQL' },
        { value: 'mongodb', viewValue: 'MongoDB' }
    ]
    constructor(private bdms: NDataModelService, private snackBar: NSnackbarService, private route: Router, private ser: dashboardService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, public el: ElementRef, public renderer: Renderer) {
        super();
        this.mm = new ModelMethods(bdms);
        this.createDbconfig();
    }

    ngOnInit() {
        if (this.ser.dbConfigLabelCreateUpdate === 'Create') {
            console.log("create")
        }
        else {
            this.dbconfigupdate();
        }
    }

    openSnackBar() {
        this.snackBar.openSnackBar(this.action, 2000);
    }
    createDbconfig() {
        this.dbConfigForm = this.formBuilder.group(
            {
                jndiname: ['', Validators.required],
                drivertype: ['', Validators.required],
                active: ['', Validators.required]
            }
        )
    }
    // convenience getter for easy access to form fields

    onSubmit(event) {
        if (this.ser.dbConfigLabelCreateUpdate === 'Create') {
            console.log("submit")
            this.dbconfigCreatesubmitbutton();
        }
        else {
            this.dbconfigUpdatesubmitbutton();
        }

    }
    clear() {
        this.dbConfigForm.reset();
        // this.dbConfigForm.markAsPristine();
        // this.dbConfigForm.markAsUntouched();
    }
    get RadioButton() { return this.dbConfigForm.get("active") }
    get jndiname() { return this.dbConfigForm.get("jndiname") }
    dbconfigupdate() {
        this.dbConfigForm.patchValue({ active: this.ser.dbconfigupdate[0]["isactive"] == "Yes" ? 0 : 1 })
        this.dbConfigForm.patchValue({ drivertype: this.ser.dbconfigupdate[0]["db"] })
        this.dbConfigForm.patchValue({ jndiname: this.ser.dbconfigupdate[0]["JNDIName"] })

    }
    dbconfigCreatesubmitbutton() {
        this.submitted = true;
        if (this.dbConfigForm.valid) {
            console.log("valid")
            let jndiname = this.dbConfigForm.value.jndiname;
            let active = this.dbConfigForm.value.active;
            let drivertype = this.dbConfigForm.value.drivertype;
            this.ser.getConfigListPost(jndiname, active, drivertype).subscribe(
                data => {
                    console.log(data)
                    this.action = "Db configuration created"
                    this.route.navigateByUrl('dashboard/dbconfigList');
                    this.openSnackBar();

                }
            )
        }
    }

    dbconfigUpdatesubmitbutton() {
        let jndiname = this.dbConfigForm.value.jndiname;
        let drivertype = this.dbConfigForm.value.drivertype;
        let active = this.dbConfigForm.value.active;
        let updateid = this.ser.dbconfigupdate[0].jndi_id;
        if (this.dbConfigForm.valid) {
            this.ser.getconfigUpdate(jndiname, drivertype, active, updateid).subscribe(data => {
                console.log(data)
                this.route.navigateByUrl('dashboard/dbconfigList');
                this.action = "Db configuration updated";
                this.openSnackBar()
            })
        }


    }
}
