/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class authService {
    setvariable: any
    unknownpath = true;

    constructor(private router: Router) { }
    isUserAuthenticated(pathvalue: any) {
        let currentpath = pathvalue.routeConfig.path;
        console.log(currentpath);
        if (this.setvariable == 'admin') {
            let activatedpaths = ['createuserlist'];
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

        }
        else if (this.setvariable == 'enduser') {

        }
        else {
            this.router.navigate(['/login']);
            return false;
        }

    }

}
