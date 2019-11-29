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
    valLength;
    submitted = false;
    Dbresponse:any;
    // seasons: string[] = ['Yes', 'No'];
    seasons: any=  [
        { value: '0', viewValue: 'Yes' },
        { value: '1', viewValue: 'No' }
    ];
    dbData = [
        { value: 'mssql', viewValue: 'MSSQL' },
        { value: 'sql', viewValue: 'SQL' },
        { value: 'mongodb', viewValue: 'MongoDB' }
    ]
    durationInSeconds = 5;

    constructor(private bdms: NDataModelService,private route: Router,private dbconfig:dashboardService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, public el: ElementRef, public renderer: Renderer) {
        super();
        this.mm = new ModelMethods(bdms);
        this.createDbconfig();
    }

    ngOnInit() {

    }

    openSnackBar() {
        this._snackBar.open("message", 'close', {
            duration: 1000
        });
    }
    createDbconfig() {
        this.dbConfigForm = this.formBuilder.group(
            {
                jndiname: ['', [Validators.required, Validators.maxLength(5)]],
                serverip: [''],
                portnumber: [''],
                dbname: [''],
                drivertype: [''],
                connectionpoolsize: [''],
                dbusername: [''],
                password: [''],
                active: ['']
            }
        )
    }
    // convenience getter for easy access to form fields
    get f() { return this.dbConfigForm.controls; }
    
    onSubmit() {
        let jndiname = this.dbConfigForm.value.jndiname;
        let serverip = this.dbConfigForm.value.serverip;
        let portnumber = this.dbConfigForm.value.portnumber;
        let dbname = this.dbConfigForm.value.dbname;
        let drivertype = this.dbConfigForm.value.drivertype;
        let connectionpoolsize = this.dbConfigForm.value.connectionpoolsize;
        let dbusername = this.dbConfigForm.value.dbusername;
        let password = this.dbConfigForm.value.password;
        let active = this.dbConfigForm.value.active;
        console.log(jndiname, serverip, portnumber, dbname)
        console.log(drivertype, connectionpoolsize, dbusername, password, active)
        this.dbconfig.getConfigListPost(jndiname, serverip, portnumber, dbname,drivertype, connectionpoolsize, dbusername, password, active).subscribe(
            data=>{
                console.log(data);
                this.Dbresponse = data;
                if(this.Dbresponse.result){
                    this.route.navigateByUrl("dashboard/DbGrouplist");
                }
            }
        )
        // console.log(this.dbconfig.getConfigListPost())
        this.submitted = true;
        this.valLength = length;
      
        if (this.dbConfigForm.invalid) {
            return;
        }
        else {
            // console.log("submit");
            this.openSnackBar()
        }
    }
    ErrorChecking(length) {
        this.valLength = length;
        console.log(this.valLength)
    }
}
