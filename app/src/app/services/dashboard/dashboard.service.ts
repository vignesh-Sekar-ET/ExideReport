/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { NDataModelService } from 'neutrinos-seed-services';
import { ModelMethods } from 'app/lib/model.methods';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class dashboardService {
    grouptype: any;
    dm: ModelMethods
    sysProps;
    systemProperties: any;
    dbconfigupdate: any;
    dbConfigLabelCreateUpdate:string;
    constructor(private bDataModelService: NDataModelService,
        private http: HttpClient) {
        this.dm = new ModelMethods(bDataModelService);
        this.sysProps = this.bDataModelService;
        this.systemProperties = this.sysProps.systemService.properties;
    }
    getConfigListGet() {
        let URL = this.systemProperties.modularUrl;
        URL += "jndilist";
        return this.http.get(URL)
    }
    //dbconfigCreate 

    getConfigListPost(jndi,active, dbname) {
        let URL = this.systemProperties.modularUrl;
        let jndiname = "'" + jndi + "'";
        let activestatus = active ;
        let datanasename = "'" + dbname + "'";
        let body = {
            "jndiname": jndiname, "active": activestatus, "dbname":datanasename
        }
        URL += "jndicreate";
        console.log(URL)
        return this.http.post(URL, body);
    }
    getconfigUpdate(jndi: any,  dbname: any, active: any, id: any) {
        let URL = this.systemProperties.modularUrl;
        let jndiname = "'" + jndi + "'";
        let datanasename = "'" + dbname + "'";
        let activestatus =  active ;
        let updateId = id ;
        // console.log(updateId)
        let body = {
            "jndiname": jndiname, "dbname": datanasename, "active": activestatus, "id": updateId
        }
        URL += "jndiupdate";
        console.log( body, URL);
        return this.http.post(URL, body);
    }
    menuArray = [{
        "admin": [{ name: "Dashboard", maticon: "dashboard", router: 'admindash' },
        { name: "Create Report group", maticon: "assignment_ind", router: 'reportgrouplist' },
        { name: "Create Report", maticon: "description", router: 'createreportlist' },
        // { name: "Report Configuration", maticon: "description", router: 'DbGrouplist' },
        { name: "System Config", maticon: "language", router: 'SystemConfig' },
        { name: "User Group Mapping", maticon: "face", router: 'usergroupmap' },
        { name: "Generate Report", maticon: "attachment", router: 'generatereport' },
        { name: "Logout", maticon: "home", router: "/login" }],

        "reportwriter": [{ name: "Create Report group", maticon: "assignment_ind", router: 'reportgrouplist' },
        { name: "Create Report", maticon: "description", router: 'createreportlist' },
        { name: "logout", maticon: "home", router: '/login' }],

        "enduser": [{ name: "Generate Report", maticon: "attachment", router: 'generatereport' },

        { name: "Logout ", maticon: "home", router: '/login' }]

    }]


}
