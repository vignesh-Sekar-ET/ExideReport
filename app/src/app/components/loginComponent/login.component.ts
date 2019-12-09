/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { loginserviceService } from '../../services/loginservice/loginservice.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dashboardService } from '../../services/dashboard/dashboard.service';
import 'rxjs';
import { authService } from '../../services/auth/auth.service';

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
    selector: 'bh-login',
    templateUrl: './login.template.html'
})

export class loginComponent implements OnInit {
    usergroup: any;
    loginform = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)])
    });
    datavalue: any;
    constructor(private loginservice: loginserviceService,
        private router: Router, private _snackBar: MatSnackBar,
        private dashserve: dashboardService,
        private auth: authService) {

    }

    ngOnInit() {

    }
    LoginSubmit() {
        let Uname = this.loginform.value.username;
        let Pass = this.loginform.value.password;
        this.loginservice.LoginSubmit(Uname, Pass).subscribe(
            (data) => {

                this.datavalue = data;
                if (this.datavalue.result == 'success') {
                    let groups = this.datavalue.groups;

                    for (let i = 0; i < groups.length; i++) {
                        // console.log(groups[i].cn);
                        // groups[i].cn = 'enduser';
                        if (groups[i].cn == "NRB_admins") {

                            this.usergroup = "admin";
                            this.dashserve.grouptype = this.usergroup;
                            this.auth.setvariable = this.usergroup;
                            this.router.navigate(['/dashboard/admindash']);
                            break;
                        }
                        else if (groups[i].cn == "NRB_reportwriter") {

                            this.usergroup = "reportwriter"
                            this.dashserve.grouptype = this.usergroup;
                            this.auth.setvariable = this.usergroup;
                            this.router.navigate(['/dashboard/reportgrouplist']);
                        }
                        else {
                            this.usergroup = "enduser"
                            this.dashserve.grouptype = this.usergroup;
                            this.auth.setvariable = this.usergroup;
                            this.router.navigate(['/dashboard/generatereport']);
                        }

                    }


                }
                else {
                    this._snackBar.open("Invalid User", "", {
                        duration: 2000,
                    });
                }

            },
            (err) => {
                this._snackBar.open("Server problem", "", {
                    duration: 2000,
                });
            });



    }





}
