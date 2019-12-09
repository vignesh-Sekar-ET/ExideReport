/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';




//comment 

/**
 * Service import Example :
 * import { HeroService } from '../../services/hero/hero.service';
 */

/**
* 
* Serivice Designer import Example - Service Name - HeroService
* import { HeroService } from 'app/sd-services/HeroService';
*/
export interface PeriodicElement {
    userGroup: string;
    reportGroup: string;
}






const ELEMENT_DATA: PeriodicElement[] = [
    { userGroup: "Finance", reportGroup: 'Hydrogen' },
    { userGroup: "Finance", reportGroup: 'Hydrogen' },
    { userGroup: "Finance", reportGroup: 'Hydrogen' },
    { userGroup: "Finance", reportGroup: 'Hydrogen' },
    { userGroup: "Finance", reportGroup: 'Hydrogen' },
   
];
@Component({
    selector: 'bh-usergrouplist',
    templateUrl: './usergrouplist.template.html'
})
export class usergrouplistComponent extends NBaseComponent implements OnInit {
    mm: ModelMethods;
    dbConfigForm: FormGroup;
    submitted = false;

    seasons: string[] = ['Yes', 'No'];
    dbData = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ]
    constructor(private bdms: NDataModelService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
        super();
        this.mm = new ModelMethods(bdms);
        this.createDbconfig();
    }
 displayedColumns = ['User Group', 'Report Group'];
        dataSource = ELEMENT_DATA;
    ngOnInit() {
       
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

    //snackbar 
    openSnackBar() {
        this._snackBar.open("message", 'close', {
            duration: 1000
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.dbConfigForm.controls; }
    onSubmit() {
        this.submitted = true;
        console.log(this.submitted)
        if (this.dbConfigForm.invalid) {
            return;
        }
        else {
            console.log("submit application saddd asas");
            this.openSnackBar()
        }
    }

}
