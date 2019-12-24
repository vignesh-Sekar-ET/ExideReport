/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { NDataModelService } from 'neutrinos-seed-services';
import { ModelMethods } from 'app/lib/model.methods';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class reportconfigserviceService {
    dm: ModelMethods
    sysProps;
    systemProperties: any;
    dropdownlist: any;
constructor(private bdms: NDataModelService, private http: HttpClient) {

        this.dm = new ModelMethods(bdms);
        this.sysProps = this.bdms;
        this.systemProperties = this.sysProps.systemService.properties;
        let url = this.systemProperties.modularUrl;


    }
    getReportConfigList() {
        let url = this.systemProperties.modularUrl;
        url += "reportconfig"
        console.log(url);
        return this.http.get(url);
    }
    onSubmit(rname: any, scheduledtype: any, scheduleddate: any, time: any, networklocation: any, starttime: any, endtime: any, email: any, downloable: any, selectedstatuss: any): Observable<any> {

        let url = this.systemProperties.modularUrl;
        let reportName = "'" + rname + "'";
        let schedtype = "'" + scheduledtype + "'";
        let schedddate = "'" + scheduleddate + "'";
        let timee = "'" + time + "'";
        let networklocationn = "'" + networklocation + "'";
        let starttimee = "'" + starttime + "'";
        let endtimee = "'" + endtime + "'";
        let downloablee= "'" + downloable + "'";
        let selectedstatus = "'" + selectedstatuss + "'";
        // let data = { 'gname': reportName, 'gcode': reportCode,'status':reportStatus,'id':reportId};
        url += "groupupdate "
        let body = { 'gname': reportName, 'gcode': schedtype, 'status': schedddate, 'id': timee, 'network': networklocationn, 'starttime': starttimee, 'endtime': endtimee, 'downloable': downloablee, 'statuss': selectedstatus };
        // console.log(body);
        return this.http.post(url, body);
    }




    







}
