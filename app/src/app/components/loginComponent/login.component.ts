/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { loginserviceService } from '../../services/loginservice/loginservice.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dashboardService } from '../../services/dashboard/dashboard.service';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs';
import { authService } from '../../services/auth/auth.service';
import { UserIdleService } from 'angular-user-idle';
import { reportcreateserviceService } from 'app/services/reportcreateservice/reportcreateservice.service';


@Component({
    selector: 'bh-login',
    templateUrl: './login.template.html'
})

export class loginComponent implements OnInit {
    usergroup: any;
    remember_me: boolean = false;

    loginform = new FormGroup({
        username: new FormControl(this.remember_me_service.get('username'), [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        password: new FormControl(this.remember_me_service.get('password'), [Validators.required, Validators.minLength(3), Validators.maxLength(15)])
    });
    datavalue: any;
    constructor(private loginservice: loginserviceService,
        private router: Router, private _snackBar: MatSnackBar,
        private dashserve: dashboardService,
        private auth: authService, private userIdle: UserIdleService,
        private reportservice: reportcreateserviceService,
        private remember_me_service: CookieService) {

    }

    ngOnInit() {
        this.auth.setvariable = '';
    }
    // ---------------AUTO LOGOUT FUNCTIONS-------------------------------------------------
    stop() {
        this.userIdle.stopTimer();
    }

    stopWatching() {
        this.userIdle.stopWatching();
    }

    startWatching() {
        this.userIdle.startWatching();
    }

    restart() {
        this.userIdle.resetTimer();
    }

    //-----------------------------------------------------------------

    LoginSubmit() {
        let Uname = this.loginform.value.username;
        let Pass = this.loginform.value.password;
        this.loginservice.LoginSubmit(Uname, Pass).subscribe(
            (data) => {

                this.datavalue = data;
                if (this.datavalue.result == 'success') {

                    this.userIdle.startWatching();
                    this.userIdle.onTimerStart().subscribe(count => console.log(count));
                    this.userIdle.onTimeout().subscribe(() => {
                        this._snackBar.open("Idle Time out", "", {
                            duration: 4000,
                        });

                        this.router.navigate(['/login']);
                    });

                    if (this.remember_me) {
                        this.remember_me_service.set('username', this.loginform.value.username);
                        this.remember_me_service.set('password', this.loginform.value.password);
                    }

                    let groups = this.datavalue.groups;
                    this.reportservice.UserGroupList = [];

                    for (let i = 0; i < groups.length; i++) {
                        this.reportservice.UserGroupList.push(groups[i].cn);
                        // groups[i].cn = 'NRB_reportwriter';
                        if (groups[i].cn == "NRB_admins") {
                            // this.remember_me_service.set('log_username', this.loginform.value.username);
                            // this.remember_me_service.set('log_password', this.loginform.value.password);
                            // this.remember_me_service.set('log_access', 'admin');
                            this.usergroup = "admin";
                            this.dashserve.grouptype = this.usergroup;
                            this.dashserve.username = this.loginform.value.username;
                            this.auth.setvariable = this.usergroup;
                            this.router.navigate(['/dashboard/admindashboard']);
                            break;
                        }
                        else if (groups[i].cn == "NRB_reportwriter") {
                            // this.remember_me_service.set('log_username', this.loginform.value.username);
                            // this.remember_me_service.set('log_password', this.loginform.value.password);
                            // this.remember_me_service.set('log_access', 'reportwriter');

                            this.usergroup = "reportwriter"
                            this.dashserve.grouptype = this.usergroup;
                            this.dashserve.username = this.loginform.value.username;
                            this.auth.setvariable = this.usergroup;
                            this.router.navigate(['/dashboard/reportgrouplist']);
                        }
                        else {
                            this.usergroup = "enduser"
                            // this.remember_me_service.set('log_username', this.loginform.value.username);
                            // this.remember_me_service.set('log_password', this.loginform.value.password);
                            // this.remember_me_service.set('log_access', 'enduser');
                            this.dashserve.grouptype = this.usergroup;
                            this.auth.setvariable = this.usergroup;
                            this.dashserve.username = this.loginform.value.username;
                            this.router.navigate(['/dashboard/generatereport']);
                        }

                    }



                }
                else if (this.datavalue.result == 'failure' && this.datavalue.reason == 'invaliduser') {
                    this._snackBar.open("Username Or Password Incorrect", "", {
                        duration: 2000,
                    });
                }
                else {
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

    rememberme(value: any) {
        if (value.checked == true) {
            this.remember_me = true;
        }
        else {
            this.remember_me = false;
        }

    }
}
