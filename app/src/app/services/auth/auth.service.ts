/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class authService {
    setvariable: any
    unknownpath = true;

    constructor(private router: Router, private remember_me_service: CookieService) { }
    isUserAuthenticated(pathvalue: any) {
        let currentpath = pathvalue.routeConfig.path;
        // let log_username = this.remember_me_service.get('log_username');
        // let log_password = this.remember_me_service.get('log_password');
        // let log_access = this.remember_me_service.get('log_access');
        //  console.log(currentpath);
        //  console.log(this.setvariable);
        // console.log(log_username);
        // console.log(log_password);
        // console.log(log_access);
        if (this.setvariable == 'admin') {
            let activatedpaths = ['dashboard', 'admindashboard', 'reportgrouplist', 'reportgroupcreate', 'reportgroupdelete',
                'createreportlist', 'createreport', 'reportConfigList', 'reportConfigCreate',
                'dbconfiglist', 'dbconfigCreate', 'systemconfig', 'groupmaplist', 'userGroupmappingCreate', 'generatereport'];
            for (let i = 0; i < activatedpaths.length; i++) {
                if (currentpath == activatedpaths[i]) {
                    this.unknownpath = false;
                    return true;
                }
            }

            if (this.unknownpath) {
                this.router.navigate(['/login']);
                return false;
            }

        }
        else if (this.setvariable == 'reportwriter') {
            let activatedpaths = ['dashboard', 'reportgrouplist', 'reportgroupcreate', 'reportgroupdelete',
                'createreportlist', 'createreport',];

            for (let i = 0; i < activatedpaths.length; i++) {
                if (currentpath == activatedpaths[i]) {
                    this.unknownpath = false;
                    return true;
                }
            }

            if (this.unknownpath) {
                this.router.navigate(['/login']);
                return false;
            }

        }
        else if (this.setvariable == 'enduser') {
            let activatedpaths = ['dashboard', 'generatereport'];
            for (let i = 0; i < activatedpaths.length; i++) {
                if (currentpath == activatedpaths[i]) {
                    this.unknownpath = false;
                    return true;
                }
            }

            if (this.unknownpath) {
                this.router.navigate(['/login']);
                return false;
            }

        }
        else {
            this.router.navigate(['/login']);
            return false;
        }

    }

}
