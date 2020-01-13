/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { NDataModelService } from 'neutrinos-seed-services';
import { ModelMethods } from 'app/lib/model.methods';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class mappingserviceService {
    dm: ModelMethods
    sysProps;
    systemProperties: any;
    constructor(private bDataModelService: NDataModelService,
        private http: HttpClient) {
        this.dm = new ModelMethods(bDataModelService);
        this.sysProps = this.bDataModelService;
        this.systemProperties = this.sysProps.systemService.properties;
    }
    getUserGroup() {
        let URL = this.systemProperties.modularUrl;
        URL += "usergroup";
        // console.log(URL);
        return this.http.get(URL)
    }
    getReportGroup() {
        let URL = this.systemProperties.modularUrl;
        URL += "grouplist";
        console.log(URL);
        return this.http.get(URL)
    }
    postUserGroupmapping(usergroupmapping) {
        let URL = this.systemProperties.modularUrl;
        let body = {
            "usermapping": usergroupmapping
        }
        URL += "usermappingcreate";
        console.log(URL)
        return this.http.post(URL, body);
    }
    updateUserGroupmapping(usergroup, reportgroup, id) {
        let URL = this.systemProperties.modularUrl;
        let body = {
            "usergroup": usergroup,
            "reportgroup":reportgroup,
            "id":id
        }
        URL += "usermappingupdate";
        console.log(body)
        return this.http.post(URL, body);
    }
    getuserGroupmapping() {
        let URL = this.systemProperties.modularUrl;
        URL += "usermappinglist";
        console.log(URL);
        return this.http.get(URL)
    }
}
