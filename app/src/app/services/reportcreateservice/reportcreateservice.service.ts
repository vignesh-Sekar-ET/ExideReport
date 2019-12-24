/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { NDataModelService } from 'neutrinos-seed-services';
import { ModelMethods } from 'app/lib/model.methods';
import { Observable } from 'rxjs';
import{HttpClient,HttpHeaders}from '@angular/common/http'



@Injectable()
export class reportcreateserviceService {
     dm: ModelMethods
    sysProps;
    systemProperties: any;
    updatename:any;
    changecomp:string;

    constructor(private bdms: NDataModelService,private http: HttpClient) {
        
         this.dm = new ModelMethods(bdms);
        this.sysProps = this.bdms;
        this.systemProperties = this.sysProps.systemService.properties;
       // console.log(this.systemProperties);
}

onSubmit(rname: any, rcode: any, rstatus :any): Observable<any> {

        let url = this.systemProperties.modularUrl;
        let reportName = "'" + rname + "'";
        let reportCode = "'" + rcode + "'";
        let reportStatus="'" + rstatus +"'";
        let data = { 'gname': reportName, 'gcode': reportCode,'status':reportStatus};
        url += "groupcreate"
        let body = {'gname' : reportName , 'gcode' : reportCode,'status' :reportStatus };
        console.log(body);
        return this.http.post(url,body);
    }


}
