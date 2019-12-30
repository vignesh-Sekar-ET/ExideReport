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
    updateVal: boolean = false;
    UpdateLabel: string = "Update";
    constructor(private bDataModelService: NDataModelService,
        private http: HttpClient) {
        this.dm = new ModelMethods(bDataModelService);
        this.sysProps = this.bDataModelService;
        this.systemProperties = this.sysProps.systemService.properties;
    }
    getConfigListGet() {
        let URL = this.systemProperties.modularUrl;
        URL += "dbconfiglist";
        return this.http.get(URL)
    }
    //dbconfigCreate 

    getConfigListPost(jndi,active) {
        let URL = this.systemProperties.modularUrl;
        let jndiname = "'" + jndi + "'";
        let activestatus = "'" + active + "'";
        let body = {
            "jndi": jndiname, "active": activestatus
        }
        URL += "dbconfigcreate";
        return this.http.post(URL, body);
    }
    getconfigUpdate(jndi: any, ip: any, port: any, name: any, type: any, pool: any, username: any, pass: any, active: any, id: any) {
        let URL = this.systemProperties.modularUrl;
        let jndiname = "'" + jndi + "'";
        let serverip = "'" + ip + "'";
        let portnumber = "'" + port + "'";
        let dbname = "'" + name + "'";
        let drivertype = "'" + type + "'";
        let connectionpoolsize = "'" + pool + "'";
        let dbusername = "'" + username + "'";
        let password = "'" + pass + "'";
        let activestatus = "'" + active + "'";
        let updateId = "'" + id + "'";
        // console.log(updateId)
        let body = {
            "jndi": jndiname, "ip": serverip, "port": portnumber, "name": dbname, "type": drivertype,
            "pool": connectionpoolsize, "username": dbusername, "pass": password, "active": activestatus, "id": updateId
        }
        URL += "dbconfigupdate";
        // console.log( body, URL);
        return this.http.post(URL, body);
    }
    menuArray = [{
        "admin": [{ name: "Dashboard", maticon: "dashboard", router: 'admindash' },
        { name: "Create Report group", maticon: "assignment_ind", router: 'reportgrouplist' },
        { name: "Create Report", maticon: "description", router: 'createreportlist' },
        { name: "Report Configuration", maticon: "description", router: 'reportConfigList' },
        { name: "System Config", maticon: "language", router: 'SystemConfig' },
        { name: "User Group Mapping", maticon: "face", router: 'userGroupmappingCreate' },
        { name: "Generate Report", maticon: "attachment", router: 'generatereport' },
        { name: "Logout", maticon: "home", router: "/login" }],

        "reportwriter": [{ name: "Create Report group", maticon: "assignment_ind", router: 'reportgrouplist' },
        { name: "Create Report", maticon: "description", router: 'createreportlist' },
        { name: "logout", maticon: "home", router: '/login' }],

        "enduser": [{ name: "Generate Report", maticon: "attachment", router: 'generatereport' },

        { name: "Logout ", maticon: "home", router: '/login' }]

    }]


}
