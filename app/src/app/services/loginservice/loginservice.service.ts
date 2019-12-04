/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { NDataModelService } from 'neutrinos-seed-services';
import { ModelMethods } from 'app/lib/model.methods';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class loginserviceService {
    dm: ModelMethods
    sysProps;
    systemProperties: any;
    constructor(private bDataModelService: NDataModelService,
        private http: HttpClient) {
        this.dm = new ModelMethods(bDataModelService);
        this.sysProps = this.bDataModelService;
        this.systemProperties = this.sysProps.systemService.properties;
      

    }
    //Login Form Submit
    LoginSubmit(uname: any, pass1: any): Observable<any> {

        let url = this.systemProperties.modularUrl;
        // let username = "'" + uname + "'";
        // let password = "'" + pass1 + "'";
        // let data = { 'name': uname, 'pass': pass1 };
        /* let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('token', this.sessions.getValue('accessToken')); */
        /* let headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*'); */
        url += "getlogin"
        let body = { 'name': uname, 'pass': pass1 };

        return this.http.post(url, body);
    }




}
