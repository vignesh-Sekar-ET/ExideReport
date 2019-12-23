/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { NDataModelService } from 'neutrinos-seed-services';
import { ModelMethods } from 'app/lib/model.methods';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable()
export class reportlistserviceService {
    dm: ModelMethods
    sysProps;
    systemProperties: any;
    updatename: any;
    deleteName: any;
    groupList: any; // groupList for table data in reportGroup page
    selectedGroupId: number; // id of the group that was selected for any action

    constructor(private bdms: NDataModelService, private http: HttpClient) {

        this.dm = new ModelMethods(bdms);
        this.sysProps = this.bdms;
        this.systemProperties = this.sysProps.systemService.properties;
        let url = this.systemProperties.modularUrl;


    }
    getJson(): Observable<any> {
        let url = this.systemProperties.modularUrl;
        url += "grouplist"
        console.log(url);
        return this.http.get(url);
    }
    onSubmit(rname: any, rcode: any, rstatus: any, rid: any): Observable<any> {

        let url = this.systemProperties.modularUrl;
        let reportName = "'" + rname + "'";
        let reportCode = "'" + rcode + "'";
        let reportStatus = "'" + rstatus + "'";
        let reportId = "'" + rid + "'";
        let data = { 'gname': reportName, 'gcode': reportCode, 'status': reportStatus, 'id': reportId };
        url += "groupupdate "
        let body = { 'gname': reportName, 'gcode': reportCode, 'status': reportStatus, 'id': reportId };
        console.log(body);
        return this.http.post(url, body);
    }
    onDeleteClick(dId: any): Observable<any> {
        let url = this.systemProperties.modularUrl;
        let deleteId = "'" + dId + "'";
        url += "groupdelete"
        let body = { 'id': deleteId };
        return this.http.post(url, body);
    }

    getReportGroupList() {
        this.http.get(`${this.systemProperties.modularUrl}groupList`).subscribe(groupList => {
            if (groupList instanceof Array) {
                this.groupList = groupList.map(item => {
                    if (item.Active == 1) { item.Active = 'Active' }
                    else { item.Active = 'Inactive' }
                    return item;
                });
            } else {
                this.groupList = []
            }
        }, error => {
            console.log(error);
        })
    }

    deleteReportGroup() {
        this.http.post(`${this.systemProperties.modularUrl}groupdelete`,
            { 'id': this.selectedGroupId }).subscribe(deletedGroup => {
                this.groupList = this.groupList.filter(v => v.id !== this.selectedGroupId)
            }, error => {
                console.log(error);
            })
    }
}
