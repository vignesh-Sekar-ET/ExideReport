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
import { reportcreateserviceService } from '../../services/reportcreateservice/reportcreateservice.service';
import 'rxjs';
import { authService } from '../../services/auth/auth.service';
import { UserIdleService } from 'angular-user-idle';

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
        private auth: authService, private userIdle: UserIdleService,
        private reportservice: reportcreateserviceService) {

    }

    ngOnInit() {

        //Start watching for user inactivity.
        this.userIdle.startWatching();

        // Start watching when user idle is starting.
        this.userIdle.onTimerStart().subscribe(/*count =>  console.log(count) */);

        // Start watch when time is up.
        this.userIdle.onTimeout().subscribe(() => {
            // this._snackBar.open("Idle out", "", {
            //     duration: 2000,
            // });
            // window.localStorage.clear();
            // window.sessionStorage.clear();
            // this.router.navigate(['/login']);
        });

        this.userIdle.ping$.subscribe(() => {
            // this._snackBar.open("Session OUT", "", {
            //     duration: 2000,
            // });
            // window.localStorage.clear();
            // window.sessionStorage.clear();
            // this.router.navigate(['/login']);
        }
        );

    }
    //---------------AUTO LOGOUT FUNCTIONS-------------------------------------------------
    // stop() {
    //     this.userIdle.stopTimer();
    // }

    // stopWatching() {
    //     this.userIdle.stopWatching();
    // }

    // startWatching() {
    //     this.userIdle.startWatching();
    // }

    // restart() {
    //     this.userIdle.resetTimer();
    // }

    //-----------------------------------------------------------------

    LoginSubmit() {
        let Uname = this.loginform.value.username;
        let Pass = this.loginform.value.password;
        this.loginservice.LoginSubmit(Uname, Pass).subscribe(
            (data) => {

                this.datavalue = data;

                if (this.datavalue.result == 'success') {

                    var now = new Date();
                    let timestamp: any;

                    timestamp = now.getFullYear();
                    timestamp += now.getMonth(); // JS 
                    timestamp += now.getDate(); // pad 
                    timestamp += now.getHours(); // pad 
                    timestamp += now.getMinutes(); // pad 
                    timestamp += now.getSeconds();
                    timestamp += now.getMilliseconds();
                    sessionStorage.setItem("Session_ID", timestamp);
                    // console.log(isNaN(timestamp));

                    let groups = this.datavalue.groups;
                    this.reportservice.UserGroupList = [];

                    for (let i = 0; i < groups.length; i++) {
                        this.reportservice.UserGroupList.push(groups[i].cn);
                        // groups[i].cn = 'NRB_reportwriter';
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
                else if (this.datavalue.result == 'failure' && this.datavalue.reason == 'invaliduser') {
                    this._snackBar.open("Invalid User", "", {
                        duration: 2000,
                    });
                }
                else if (this.datavalue.result == 'failure') {
                    this._snackBar.open("Group Not Defined", "", {
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
