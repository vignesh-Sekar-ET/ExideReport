/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, ElementRef, AfterContentInit, Renderer, Directive, DoCheck, Input, ViewChild } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
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
    @ViewChild(FormGroupDirective, { static: true }) formGroupDirective: FormGroupDirective;

    seasons: any = [
        { value: 1, viewValue: 'Yes' },
        { value: 0, viewValue: 'No' }
    ];
    dbData = [
        { value: 'MSSQL', viewValue: 'MSSQL' },
        { value: 'ORACLE', viewValue: 'ORACLE' },
        { value: 'DB2', viewValue: 'DB2' }
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
            this.submitted = true;
            this.create();
        }
        else {
            this.update();
        }

    }


    get RadioButton() { return this.dbConfigForm.get("active") }
    get jndiname() { return this.dbConfigForm.get("jndiname") }
    get drivertype() { return this.dbConfigForm.get("drivertype") }
    dbconfigupdate() {
        this.dbConfigForm.patchValue({ active: this.ser.getTableValue[0]["isactive"] == "Yes" ? 1 : 0 })
        this.dbConfigForm.patchValue({ drivertype: this.ser.getTableValue[0]["db"] })
        this.dbConfigForm.patchValue({ jndiname: this.ser.getTableValue[0]["JNDIName"] })
    }
    create() {

        if (this.dbConfigForm.valid) {
            // console.log("valid")
            let jndiname = this.dbConfigForm.value.jndiname;
            let active = this.dbConfigForm.value.active;
            let drivertype = this.dbConfigForm.value.drivertype;
            this.ser.getConfigListPost(jndiname, active, drivertype).subscribe(
                data => {
                    // console.log(data)
                    if (data["result"] == "success") {
                        this.action = "Db configuration created"
                        this.route.navigateByUrl('dashboard/dbconfiglist');
                        this.openSnackBar();
                    }
                    if (data["reason"]) {
                        this.action = "Duplicate configuration created please create new dbconfiguration";
                        this.openSnackBar();
                    }

                }
            )
        }
    }

    update() {
        let jndiname = this.dbConfigForm.value.jndiname;
        let drivertype = this.dbConfigForm.value.drivertype;
        let active = this.dbConfigForm.value.active;
        let updateid = this.ser.getTableValue[0].jndi_id;
        if (this.dbConfigForm.valid) {
            this.ser.getconfigUpdate(jndiname, drivertype, active, updateid).subscribe(data => {
                console.log(data)
                if (data["result"] === "success") {
                    this.action = "Db configuration updated"
                    this.route.navigateByUrl('dashboard/dbconfiglist');
                    this.openSnackBar();
                }
                if (data["reason"]) {
                    this.action = "Duplicate configuration created please create new dbconfiguration";
                    this.openSnackBar();
                }
            })
        }


    }
    clear(event) {
        this.submitted = false;
        this.dbConfigForm.reset()
        this.dbConfigForm.markAsDirty()
        this.dbConfigForm.markAsTouched()
    }
    private currentFormState() {
        const formState = {
            dirty: this.dbConfigForm.dirty,
            invalid: this.dbConfigForm.invalid,
            pending: this.dbConfigForm.pending,
            pristine: this.dbConfigForm.pristine,
            status: this.dbConfigForm.status,
            touched: this.dbConfigForm.touched,
            untouched: this.dbConfigForm.untouched,
            valid: this.dbConfigForm.valid
        };

        return formState;
    }
}
