/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit, ElementRef, AfterContentInit, Renderer, Directive, DoCheck, Input } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { dashboardService } from '../../services/dashboard/dashboard.service';

/**
 * Service import Example :
 * import { HeroService } from '../../services/hero/hero.service';
 */

/**
* 
* Serivice Designer import Example - Service Name - HeroService
* import { HeroService } from 'app/sd-services/HeroService';
*/

@Component({
    selector: 'bh-dbconfigupdate',
    templateUrl: './dbconfigupdate.template.html'
})

export class dbconfigupdateComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    dbConfigForm: FormGroup;
    dbconfigUpdate: any;
    constructor(private bdms: NDataModelService, private ser: dashboardService, private route: Router, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, public el: ElementRef, public renderer: Renderer) {
        super();
        this.mm = new ModelMethods(bdms);
        this.UpdateDbconfig();
    }

    seasons: any = [
        { value: 0, viewValue: 'Yes' },
        { value: 1, viewValue: 'No' }
    ];
    dbData = [
        { value: 'mssql', viewValue: 'MSSQL' },
        { value: 'sql', viewValue: 'SQL' },
        { value: 'mongodb', viewValue: 'MongoDB' }
    ]
    ngOnInit() {

         // console.log(updateid)
        console.log(this.ser.getTableValue[0]["JNDI"])
        this.dbConfigForm.patchValue({
            // jndiname: [this.ser.dbconfigupdate[0]["JNDI"]],
            serverip: this.ser.getTableValue[0]["ServerIP"],
            portnumber: this.ser.getTableValue[0]["PortNumber"],
            dbname: this.ser.getTableValue[0]["DBName"],
            // drivertype:[this.ser.dbconfigupdate[0]["DriveType"]],
            connectionpoolsize: this.ser.getTableValue[0]["PoolSize"],
            dbusername: this.ser.getTableValue[0]["UserName"],
            password: this.ser.getTableValue[0]["Password"],
        })
        this.dbConfigForm.patchValue({ active: this.ser.getTableValue[0]["Active"] })
        this.dbConfigForm.patchValue({ drivertype: this.ser.getTableValue[0]["DriveType"] })
        this.dbConfigForm.patchValue({ jndiname: this.ser.getTableValue[0]["JNDI"] })
        console.log(this.ser.getTableValue[0]["Active"], this.ser.getTableValue[0]["DriveType"], typeof (this.ser.getTableValue[0]["JNDI"]))
    }


    UpdateDbconfig() {
        this.dbConfigForm = this.formBuilder.group(
            {
                jndiname: [''],
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
    onSubmit() {
        // console.log(this.dbConfigForm.value)
        // let val: any = {}
        let jndiname = this.dbConfigForm.value.jndiname;
        let serverip = this.dbConfigForm.value.serverip;
        let portnumber = this.dbConfigForm.value.portnumber;
        let dbname = this.dbConfigForm.value.dbname;
        let drivertype = this.dbConfigForm.value.drivertype;
        let connectionpoolsize = this.dbConfigForm.value.connectionpoolsize;
        let dbusername = this.dbConfigForm.value.dbusername;
        let password = this.dbConfigForm.value.password;
        let active = this.dbConfigForm.value.active;
        let updateid = this.ser.getTableValue[0].id;
        console.log(updateid)

        // this.ser.dbconfigupdate[0] = val;
        // console.log(this.ser.dbconfigupdate[0])
        if (this.dbConfigForm.invalid) {
            return;
        }
        else {
            this.ser.getconfigUpdate(jndiname,drivertype, active, updateid).subscribe(data => {
                console.log(data)
                // this.getTableValue = data;


            })

            // this.ser.updateVal = true;
            // console.log("submit" + this.ser.updateVal);

        }
    }
    openSnackBar() {
        this._snackBar.open("message", 'close', {
            duration: 1000
        });
    }

}
