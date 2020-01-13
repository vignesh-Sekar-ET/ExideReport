/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { NDataModelService } from 'neutrinos-seed-services';
import { ModelMethods } from 'app/lib/model.methods';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'



@Injectable()
export class reportcreateserviceService {
    dm: ModelMethods
    sysProps;
    systemProperties: any;
    updatename: any;
    UserGroupList: any

    constructor(private bdms: NDataModelService, private http: HttpClient) {

        this.dm = new ModelMethods(bdms);
        this.sysProps = this.bdms;
        this.systemProperties = this.sysProps.systemService.properties;

    }

    onSubmit(rname: any, rcode: any, rstatus: any): Observable<any> {

        let url = this.systemProperties.modularUrl;
        let reportName = "'" + rname + "'";
        let reportCode = "'" + rcode + "'";
        let reportStatus = "'" + rstatus + "'";
        let data = { 'gname': reportName, 'gcode': reportCode, 'status': reportStatus };
        url += "groupcreate"
        let body = { 'gname': reportName, 'gcode': reportCode, 'status': reportStatus };

        return this.http.post(url, body);
    }

    reportgrouplist() {
        let URL = this.systemProperties.modularUrl;
        URL += "reportgrouplst";
        return this.http.get(URL)
    }

    JNDIlist() {
        let URL = this.systemProperties.modularUrl;
        URL += "reportjndilist";
        return this.http.get(URL)
    }

    reportcreat(rptvalue: any): Observable<any> {

        let url = this.systemProperties.modularUrl;

        let reportName = "'" + rptvalue.rname + "'";
        let typr = "'" + rptvalue.typeq + "'";
        let ptname = "'" + rptvalue.ptname + "'";
        let source = rptvalue.source;
        let query = "'" + rptvalue.query + "'";
        let rgpname = rptvalue.rgpname;


        url += "reportcreate"
        let body = { 'rname': reportName, 'typer': typr, 'source': source, 'ptname': ptname, 'query': query, 'rgpname': rgpname };
      
        return this.http.post(url, body);

    }
    reportupdate(rptvalue: any): Observable<any> {
        let url = this.systemProperties.modularUrl;

        let reportName = "'" + rptvalue.rname + "'";
        let typr = "'" + rptvalue.typeq + "'";
        let ptname = "'" + rptvalue.ptname + "'";
        let source = rptvalue.source;
        let query = "'" + rptvalue.query + "'";
        let rgpname = rptvalue.rgpname;
        let reports_id = rptvalue.reports_id;


        url += "reportupdate"
        let body = { 'reports_id': reports_id, 'rname': reportName, 'typer': typr, 'source': source, 'ptname': ptname, 'query': query, 'rgpname': rgpname };
        return this.http.post(url, body);

    }

    reportgenerate(rptvalue: any): Observable<any> {
       
        var now = new Date();
        let timestamp: any;

        timestamp = now.getFullYear();
        timestamp += now.getMonth();
        timestamp += now.getDate();
        timestamp += now.getHours();
        timestamp += now.getMinutes();
        timestamp += now.getSeconds();
        timestamp += now.getMilliseconds();
        sessionStorage.setItem("Session_ID", timestamp);

        let url = this.systemProperties.modularUrl;
        let sessionid = sessionStorage.getItem('Session_ID')
        let setvalue = parseInt(sessionid)

        url += "reportgenerate"
        let body = { 'rname': rptvalue.rname[0].reports_id, 'upload': rptvalue.upload, 'sessionid': setvalue };

        return this.http.post(url, body);

    }

    reportlist() {
        let url = this.systemProperties.modularUrl;
        url += "reportlist";

        return this.http.get(url)
    }
    genreportlist() {
        let url = this.systemProperties.modularUrl;
        url += "genreportlist";

        return this.http.post(url, this.UserGroupList)
    }


}
