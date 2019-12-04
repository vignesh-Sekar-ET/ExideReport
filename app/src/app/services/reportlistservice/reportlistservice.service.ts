/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { NDataModelService } from 'neutrinos-seed-services';
import { ModelMethods } from 'app/lib/model.methods';
import { Observable } from 'rxjs';
import{HttpClient,HttpHeaders}from '@angular/common/http';
import { map } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';




@Injectable()
export class reportlistserviceService {
     dm: ModelMethods
    sysProps;
    systemProperties: any;
    updatename:any;
    deleteName:any;


    
    constructor(private bdms: NDataModelService,private http: HttpClient) {
        
         this.dm = new ModelMethods(bdms);
        this.sysProps = this.bdms;
        this.systemProperties = this.sysProps.systemService.properties;
        let url = this.systemProperties.modularUrl;

        
  }
  getJson(): Observable<any> {
       let url = this.systemProperties.modularUrl;
         url += "grouplist"
        //  console.log(url);
    return this.http.get(url);
  }
  onSubmit(rname: any, rcode: any, rstatus :any,rid :any): Observable<any> {

        let url = this.systemProperties.modularUrl;
        let reportName = "'" + rname + "'";
        let reportCode = "'" + rcode + "'";
        let reportStatus="'" + rstatus +"'";
        let reportId ="'" + rid +"'";
        let data = { 'gname': reportName, 'gcode': reportCode,'status':reportStatus,'id':reportId};
        url += "groupupdate "
        let body = {'gname' : reportName , 'gcode' : reportCode,'status' :reportStatus,'id':reportId };
        // console.log(body);
        return this.http.post(url,body);
    }
    onDeleteClick(dId:any): Observable<any>{
    let url = this.systemProperties.modularUrl;
    let deleteId ="'" + dId +"'";
    url += "groupdelete"
    let body = {'id' :deleteId};
    return this.http.post(url,body);
 }
 

  
  
        


}
