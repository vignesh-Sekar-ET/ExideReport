/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { NDataModelService } from 'neutrinos-seed-services';
import { ModelMethods } from 'app/lib/model.methods';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NSnackbarService } from 'neutrinos-seed-services';

@Injectable()
export class reportconfigserviceService {
    dm: ModelMethods
    sysProps;
    systemProperties: any;
    dropdownlist: any;
    reportid: number;
    reportconfiglist: any;
    changecomp: any;
    updatename: any;
    sttr: any;
    constructor(private bdms: NDataModelService, private http: HttpClient) {

        this.dm = new ModelMethods(bdms);
        this.sysProps = this.bdms;
        this.systemProperties = this.sysProps.systemService.properties;
        let url = this.systemProperties.modularUrl;
    }
    configcreatelist() {
        let url = this.systemProperties.modularUrl;
        url += "configcreatelist"
        return this.http.get(url);
    }
    onSubmit(rname: any, networklocation: any, starttime: any, endtime: any, email: any, downloable: any, selectedstatuss: any): Observable<any> {
        let url = this.systemProperties.modularUrl;
        let reportName = "'" + rname + "'";
        let networklocationn = "'" + networklocation + "'";
        let starttimee = "'" + starttime + "'";
        let endtimee = "'" + endtime + "'";
        let downloablee = "'" + downloable + "'";
        let selectedstatus = "'" + selectedstatuss + "'";
        let emailsubscription = "'" + email + "'";
        url += "createreportconfig "
        let body = { 'reports_id': reportName, 'network': networklocationn, 'starttime': starttimee, 'endtime': endtimee, 'isdownloadable': downloablee, 'status': selectedstatus, 'issubscribe': emailsubscription };

        return this.http.post(url, body);
    }
    getReportConfigList() {
        this.http.get(`${this.systemProperties.modularUrl}reportconfiglist`).subscribe(reportconfiglist => {
            console.log("url" + JSON.stringify(reportconfiglist))

            if (reportconfiglist instanceof Array) {
                this.reportconfiglist = reportconfiglist.map(item => {
                    if (item.isdownloadable == 1) { item.isdownloadable = 'Yes' }
                    else { item.isdownloadable = 'No' }
                    if (item.issubscribe == 1) { item.issubscribe = 'Yes' }
                    else { item.issubscribe = 'No' }
                    if (item.status == 1) { item.status = 'Active' }
                    else { item.status = 'InActive' }
                    
                    let timestart = new Date(item.starttime);
                    let setStartTime = timestart.getUTCHours() + ':' + timestart.getUTCMinutes();
                    let AmOrPm = timestart.getUTCHours() >= 12 ? 'PM' : 'AM';
                    if (AmOrPm == 'PM') {
                        let sam = timestart.getUTCHours();
                        sam -= 12;
                        item.starttime = sam + ':' + timestart.getUTCMinutes() + AmOrPm;
                    }
                    else {
                        this.sttr = timestart.getUTCHours() + ':' + timestart.getUTCMinutes() + AmOrPm;
                        item.starttime = this.sttr;
                    }


                    let timeend = new Date(item.endtime);
                    let setEndtime = timeend.getUTCHours() + ':' + timeend.getUTCMinutes();
                    let PMOrAM = timeend.getUTCHours() >= 12 ? 'PM' : 'AM';
                    if (PMOrAM == 'PM') {
                        let timeEnd = timeend.getUTCHours();
                        timeEnd -= 12;
                        item.endtime = timeEnd + ':' + timeend.getUTCMinutes() + PMOrAM;
                    }
                    else {
                        let endtr = timeend.getUTCHours() + ':' + timeend.getUTCMinutes() + PMOrAM
                        item.endtime = endtr;
                    }


                    return item;
                });
            } else {
                this.reportconfiglist = []
            }
        }, error => {
            console.log(error);
        })
    }

}
