/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
// import { BDataModelService } from '../service/bDataModel.service';
import { NDataModelService } from 'neutrinos-seed-services';
import { NBaseComponent } from '../../../../../app/baseClasses/nBase.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { loginserviceService } from '../../services/loginservice/loginservice.service'
import 'rxjs';

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
    loginform = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)])
    });
    datavalue: any;
    constructor(private loginservice: loginserviceService) {

    }

    ngOnInit() {

    }
    LoginSubmit() {
        let Uname = this.loginform.value.username;
        let Pass = this.loginform.value.password;
        this.loginservice.LoginSubmit(Uname, Pass).subscribe(
            (data) => {
                console.log(data);
                this.datavalue = data;
                if (this.datavalue.length >0) {
                    console.log("success");
                }
                else {
                    console.log("fail");

                };
            },
            (err) => console.log(err));


    }





}
