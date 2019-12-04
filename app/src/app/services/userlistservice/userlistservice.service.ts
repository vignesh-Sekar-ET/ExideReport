/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NDataModelService } from 'neutrinos-seed-services';
import { ModelMethods } from 'app/lib/model.methods';

@Injectable()
export class userlistserviceService {
    sysProps;
    systemProperties: any;     
    dm: ModelMethods
    userupdatename:any;
    userdeleteName:any;


    constructor(private bdms: NDataModelService, private http: HttpClient) {

        this.dm = new ModelMethods(bdms);
        this.sysProps = this.bdms;
        this.systemProperties = this.sysProps.systemService.properties;
        let url = this.systemProperties.modularUrl;


    }
     getJson(): Observable<any> {
       let url = this.systemProperties.modularUrl;
         url += "usergrouplist"
        //  console.log(url);
    return this.http.get(url);
  }
  onSubmit(rname: any, rcode: any, rstatus :any): Observable<any> {

        let url = this.systemProperties.modularUrl;
        let reportName = "'" + rname + "'";
        let reportCode = "'" + rcode + "'";
        let reportStatus="'" + rstatus +"'";
        let data = { 'gname': reportName, 'gcode': reportCode,'status':reportStatus};
        url += "usergroupcreate"
        let body = {'gname' : reportName , 'gcode' : reportCode,'status' :reportStatus };
        // console.log(body);
        return this.http.post(url,body);
    }

    onUpdateSubmit(uname: any, ucode: any, ustatus :any,uid :any): Observable<any> {

        let url = this.systemProperties.modularUrl;
        let userName = "'" + uname + "'";
        let userCode = "'" + ucode + "'";
        let userStatus="'" + ustatus +"'";
        let userId ="'" + uid +"'";
        let data = { 'gname': userName, 'gcode': userCode,'status':userStatus,'id':userId};
        url += "usergroupupdate "
        let body = {'gname' : userName , 'gcode' : userCode,'status' :userStatus,'id':userId };
        // console.log(body);
        return this.http.post(url,body);
    }

    onDeleteClick(dId:any): Observable<any>{
    let url = this.systemProperties.modularUrl;
    let deleteId ="'" + dId +"'";
    url += "usergroupdelete"
    let body = {'id' :deleteId};
    return this.http.post(url,body);
 }




}
