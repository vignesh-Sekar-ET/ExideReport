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
    seasons: any = [
        { value: '0', viewValue: 'Yes' },
        { value: '1', viewValue: 'No' }
    ];
    constructor(private bdms: NDataModelService, private snackBar: NSnackbarService, private route: Router, private dbconfig: dashboardService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, public el: ElementRef, public renderer: Renderer) {
        super();
        this.mm = new ModelMethods(bdms);
        this.createDbconfig();
    }

    ngOnInit() {

    }

    openSnackBar() {
        this.snackBar.openSnackBar('Db configuration Created!!!', 2000);
    }
    createDbconfig() {
        this.dbConfigForm = this.formBuilder.group(
            {
                jndiname: ['', Validators.required],
                active: ['', Validators.required]
            }
        )
    }
    // convenience getter for easy access to form fields

    onSubmit(event) {
        this.submitted = true;
        if (this.dbConfigForm.invalid) {
            console.log("invalid")
            return;
        }
        else {
            console.log("valid")
            let jndiname = this.dbConfigForm.value.jndiname;
            let active = this.dbConfigForm.value.active;
            console.log(jndiname, active);
            this.dbconfig.getConfigListPost(jndiname, active).subscribe(
                data => {
                    this.openSnackBar();
                }
            )

        }
    }
    clear() {
        // this.submitted = false;
        this.dbConfigForm.reset();
        // this.dbConfigForm.markAsPristine();
        // this.dbConfigForm.markAsUntouched();
    }
    get RadioButton() { return this.dbConfigForm.get("active") }
    get jndiname() { return this.dbConfigForm.get("jndiname") }
}
